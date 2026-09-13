import Foundation

/// Anonymous usage telemetry, shared by every Kelappa app.
///
/// Three events, nothing personal:
///
///   `install` — once, the first time this copy of the app ever runs
///   `launch`  — once per run (repeat launches inside 10 minutes count as one)
///   `active`  — once per calendar day the app is open
///
/// The only identifier is a random UUID made on this machine the first time the
/// app runs. No account, no email, no file names, no window contents, no
/// keystrokes — the payload is the app name, its version, the macOS version and
/// the system language. The user can turn it off (`Telemetry.isEnabled`), and
/// then nothing leaves the app at all.
///
/// ── Adding it to an app ─────────────────────────────────────────────────────
///  1. Drop this file into the target's sources.
///  2. If the bundle name is not the label you want in the stats, set
///     `Telemetry.appName = "EN-RU Switcher"` before starting.
///  3. Call `Telemetry.start()` once, from `applicationDidFinishLaunching`.
///  4. Sandboxed app? It needs `com.apple.security.network.client` in its
///     entitlements, otherwise every request is refused locally.
///
/// Throttling, retries after an offline stretch and the opt-out all live in
/// here; the host app only calls `start()`.
enum Telemetry {

    // MARK: Configuration

    /// Apps Script web app that appends each event to the "Usage" sheet of the
    /// Kelappa spreadsheet — the same endpoint the download gate posts to.
    /// Source: apps-script/Code.gs in the kilapa-online repository.
    static var endpoint = URL(string: "https://script.google.com/macros/s/AKfycbyEEk8BqF0Ep-HLXEUJWZ8vfteTao3bOUQB3dhMrcLflGEXlLl0TTn9kdP80c9FUBzp/exec")!

    /// Label this app appears under in the stats. Defaults to the bundle name.
    static var appName: String = Telemetry.bundleName

    /// Two launches closer together than this count as one.
    static var launchThrottle: TimeInterval = 10 * 60

    /// How often the "is it a new day yet" check runs while the app stays open.
    static var dayCheckInterval: TimeInterval = 30 * 60

    // MARK: Opt-out

    /// Off means nothing is sent and nothing is queued.
    static var isEnabled: Bool {
        get { !defaults.bool(forKey: Key.optedOut) }
        set {
            defaults.set(!newValue, forKey: Key.optedOut)
            if !newValue { defaults.removeObject(forKey: Key.queue) }
        }
    }

    // MARK: Lifecycle

    /// Call once at launch. Safe to call when the user has opted out, offline,
    /// or with no network permission — it never blocks and never throws.
    static func start(now: Date = Date()) {
        guard isEnabled else { return }

        flushQueue()

        if defaults.string(forKey: Key.installId) == nil {
            _ = installId                       // mints the id
            defaults.set(TelemetrySchedule.iso(now), forKey: Key.firstSeen)
            send("install", now: now)
        }

        let lastLaunch = defaults.object(forKey: Key.lastLaunch) as? Date
        if TelemetrySchedule.shouldSendLaunch(last: lastLaunch, now: now, throttle: launchThrottle) {
            defaults.set(now, forKey: Key.lastLaunch)
            send("launch", now: now)
        }

        sendActiveIfNeeded(now: now)
        startDayTimer()
    }

    /// Marks today as used, at most once per calendar day.
    static func sendActiveIfNeeded(now: Date = Date()) {
        guard isEnabled else { return }
        let today = TelemetrySchedule.dayStamp(now)
        guard defaults.string(forKey: Key.lastActiveDay) != today else { return }
        defaults.set(today, forKey: Key.lastActiveDay)
        send("active", now: now)
    }

    private static var dayTimer: Timer?

    private static func startDayTimer() {
        guard dayTimer == nil else { return }
        let timer = Timer(timeInterval: dayCheckInterval, repeats: true) { _ in
            sendActiveIfNeeded()
        }
        RunLoop.main.add(timer, forMode: .common)
        dayTimer = timer
    }

    // MARK: Payload

    private static func send(_ event: String, now: Date) {
        guard let body = payload(event: event, now: now) else { return }
        post(body)
    }

    private static func payload(event: String, now: Date) -> Data? {
        let fields: [String: String] = [
            "type": "usage",
            "event": event,
            "app": appName,
            "version": version,
            "platform": platform,
            "locale": Locale.current.identifier,
            "installId": installId,
            "ts": TelemetrySchedule.iso(now)
        ]
        return try? JSONSerialization.data(withJSONObject: fields)
    }

    /// A random id for this copy of the app — not for the person using it.
    static var installId: String {
        if let stored = defaults.string(forKey: Key.installId) { return stored }
        let fresh = UUID().uuidString
        defaults.set(fresh, forKey: Key.installId)
        return fresh
    }

    private static var bundleName: String {
        let info = Bundle.main.infoDictionary
        let name = info?["CFBundleName"] as? String
            ?? info?["CFBundleExecutable"] as? String
        return name ?? "Unknown"
    }

    private static var version: String {
        let info = Bundle.main.infoDictionary
        let short = info?["CFBundleShortVersionString"] as? String ?? "0"
        let build = info?["CFBundleVersion"] as? String ?? "0"
        return "\(short) (\(build))"
    }

    private static var platform: String {
        let v = ProcessInfo.processInfo.operatingSystemVersion
        return "macOS \(v.majorVersion).\(v.minorVersion).\(v.patchVersion)"
    }

    // MARK: Transport

    /// Fire and forget. A failed send is parked and retried on the next launch;
    /// nothing in the app ever waits on the network.
    private static func post(_ body: Data) {
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.timeoutInterval = 15
        // text/plain keeps it a "simple" request — Apps Script has no preflight.
        request.setValue("text/plain;charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.httpBody = body

        URLSession.shared.dataTask(with: request) { data, response, error in
            let status = (response as? HTTPURLResponse)?.statusCode ?? 0
            let reached = error == nil && (200..<400).contains(status)
            // The collector answers 200 with {"ok":false} when it refuses the
            // row — an endpoint that has not been redeployed yet, say. Park it
            // and let the next launch try again, rather than losing the event.
            if reached && accepted(data) { return }
            park(body)
        }.resume()
    }

    /// A body we cannot parse counts as accepted: better one lost event than a
    /// queue that never drains.
    private static func accepted(_ data: Data?) -> Bool {
        guard let data,
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let ok = json["ok"] as? Bool
        else { return true }
        return ok
    }

    private static let queueLimit = 20

    private static func park(_ body: Data) {
        guard isEnabled, let text = String(data: body, encoding: .utf8) else { return }
        var queue = defaults.stringArray(forKey: Key.queue) ?? []
        queue.append(text)
        if queue.count > queueLimit { queue.removeFirst(queue.count - queueLimit) }
        defaults.set(queue, forKey: Key.queue)
    }

    private static func flushQueue() {
        let queue = defaults.stringArray(forKey: Key.queue) ?? []
        guard !queue.isEmpty else { return }
        defaults.removeObject(forKey: Key.queue)
        for text in queue {
            if let body = text.data(using: .utf8) { post(body) }
        }
    }

    // MARK: Storage

    private static var defaults: UserDefaults { .standard }

    private enum Key {
        static let installId = "telemetry.installId"
        static let firstSeen = "telemetry.firstSeen"
        static let lastLaunch = "telemetry.lastLaunch"
        static let lastActiveDay = "telemetry.lastActiveDay"
        static let optedOut = "telemetry.optedOut"
        static let queue = "telemetry.queue"
    }
}

/// The "how often may this be sent" arithmetic, kept pure so it can be tested
/// without a network, a clock or a bundle.
enum TelemetrySchedule {

    /// Local calendar day, `yyyy-MM-dd` — the unit "used it today" is counted in.
    static func dayStamp(_ date: Date, calendar: Calendar = .current) -> String {
        let parts = calendar.dateComponents([.year, .month, .day], from: date)
        return String(format: "%04d-%02d-%02d",
                      parts.year ?? 0, parts.month ?? 0, parts.day ?? 0)
    }

    /// A restart right after a crash is the same launch, not a new one.
    static func shouldSendLaunch(last: Date?, now: Date, throttle: TimeInterval) -> Bool {
        guard let last else { return true }
        return now.timeIntervalSince(last) >= throttle
    }

    /// UTC timestamp, so rows from every timezone sort together.
    static func iso(_ date: Date) -> String {
        let formatter = ISO8601DateFormatter()
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        return formatter.string(from: date)
    }
}
