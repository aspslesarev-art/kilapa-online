/**
 * Kelappa usage telemetry — web build.
 *
 * The browser twin of telemetry/KelappaTelemetry.swift: the same three events
 * (`install`, `launch`, `active`), the same payload, the same endpoint, so a
 * web app and a Mac app show up side by side in the stats.
 *
 * Add it to any page of a Kelappa web app:
 *
 *   <script defer src="https://kelappa.com/telemetry/kelappa-usage.js"
 *           data-app="FloFi" data-version="1.4"></script>
 *
 * Without `data-app` the app name falls back to the hostname, which is fine for
 * a one-app domain and wrong for anything else — so set it.
 *
 * Identity is a random UUID in localStorage: per browser, not per person. A
 * user who clears site data counts as a new install; that is the price of not
 * fingerprinting anyone. `localStorage.kelappa_telemetry_off = '1'` opts out.
 */
(function () {
  'use strict';

  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbyEEk8BqF0Ep-HLXEUJWZ8vfteTao3bOUQB3dhMrcLflGEXlLl0TTn9kdP80c9FUBzp/exec';

  var KEY_ID = 'kelappa_install_id';
  var KEY_LAUNCH = 'kelappa_last_launch';
  var KEY_DAY = 'kelappa_active_day';
  var KEY_QUEUE = 'kelappa_usage_pending';
  var KEY_OFF = 'kelappa_telemetry_off';

  var LAUNCH_THROTTLE_MS = 10 * 60 * 1000;
  var DAY_CHECK_MS = 30 * 60 * 1000;
  var QUEUE_MAX = 20;

  var script = document.currentScript;

  function attr(name, fallback) {
    var value = script && script.getAttribute(name);
    return value || fallback;
  }

  var APP = attr('data-app', location.hostname.replace(/^www\./, ''));
  var VERSION = attr('data-version', '');

  // ── Storage (a private window can throw on every access) ──────────────────
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* not worth breaking the page */ }
  }

  function isOff() {
    return read(KEY_OFF) === '1';
  }

  function uuid() {
    try {
      if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    } catch (e) { /* fall through */ }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
  }

  function dayStamp(date) {
    var m = String(date.getMonth() + 1);
    var d = String(date.getDate());
    return date.getFullYear() + '-' + (m.length < 2 ? '0' + m : m) + '-' + (d.length < 2 ? '0' + d : d);
  }

  // ── Transport — never blocks the page, never retries in a loop ────────────
  function post(body) {
    // text/plain keeps it a "simple" request — Apps Script has no CORS preflight.
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: body,
      keepalive: true,
      mode: 'cors'
    }).then(function (res) {
      if (!res.ok) return false;
      // 200 with {"ok":false} means the collector refused the row (an endpoint
      // that has not been redeployed yet, say) — park it and retry later.
      return res.json().then(function (data) {
        return !data || data.ok !== false;
      }).catch(function () { return true; });
    }).catch(function () { return false; });
  }

  function beacon(body) {
    try {
      if (!navigator.sendBeacon) return false;
      return navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain;charset=UTF-8' }));
    } catch (e) {
      return false;
    }
  }

  function park(body) {
    var queue = [];
    try { queue = JSON.parse(read(KEY_QUEUE) || '[]'); } catch (e) { queue = []; }
    if (!Array.isArray(queue)) queue = [];
    queue.push(body);
    if (queue.length > QUEUE_MAX) queue = queue.slice(-QUEUE_MAX);
    write(KEY_QUEUE, JSON.stringify(queue));
  }

  function flush() {
    var queue = [];
    try { queue = JSON.parse(read(KEY_QUEUE) || '[]'); } catch (e) { queue = []; }
    if (!Array.isArray(queue) || !queue.length) return;
    write(KEY_QUEUE, '[]');
    queue.forEach(function (body) { send(body); });
  }

  function send(body) {
    post(body).then(function (ok) {
      if (!ok && !beacon(body)) park(body);
    });
  }

  function emit(event) {
    if (isOff()) return;
    send(JSON.stringify({
      type: 'usage',
      event: event,
      app: APP,
      version: VERSION,
      platform: 'web',
      locale: navigator.language || '',
      installId: installId(),
      ts: new Date().toISOString(),
      userAgent: navigator.userAgent || ''
    }));
  }

  function installId() {
    var id = read(KEY_ID);
    if (id) return id;
    id = uuid();
    write(KEY_ID, id);
    return id;
  }

  function activeIfNewDay() {
    if (isOff()) return;
    var today = dayStamp(new Date());
    if (read(KEY_DAY) === today) return;
    write(KEY_DAY, today);
    emit('active');
  }

  function startUp() {
    if (isOff()) return;
    flush();

    if (!read(KEY_ID)) {
      installId();
      emit('install');
    }

    var last = parseInt(read(KEY_LAUNCH) || '0', 10) || 0;
    var now = Date.now();
    if (now - last >= LAUNCH_THROTTLE_MS) {
      write(KEY_LAUNCH, String(now));
      emit('launch');
    }

    activeIfNewDay();
    // A tab left open overnight still reports the new day.
    setInterval(activeIfNewDay, DAY_CHECK_MS);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) activeIfNewDay();
    });
  }

  startUp();
})();
