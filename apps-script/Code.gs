/**
 * Kelappa collector — Google Apps Script web app.
 *
 * Two things land here, both as POST with a JSON body:
 *
 *   type: "lead"  (default)  — /email-gate.js, one row per .dmg download
 *   type: "usage"            — /telemetry clients inside the apps themselves,
 *                              one row per install / launch / active day
 *
 * and one thing comes out of it:
 *
 *   GET ?report=usage        — aggregated usage per app, for /stats/
 *
 * This is a standalone script (not bound to the sheet), so it opens the target
 * by id. Deployed as: Web app → Execute as "Me" → Who has access "Anyone".
 * See README.md next to this file.
 */

var SHEET_ID = '1keWRNoi1SiiNVG7CLP_UB1OeQWyxF1qmdfONbqG4HZ4';
var SHEET_NAME = 'Leads';
var HEADERS = [
  'ts', 'email', 'app', 'page', 'lang',
  'referrer', 'utm_source', 'utm_medium', 'utm_campaign', 'userAgent'
];

var USAGE_SHEET_NAME = 'Usage';
var USAGE_HEADERS = [
  'ts', 'clientTs', 'app', 'event', 'installId',
  'version', 'platform', 'locale', 'userAgent'
];
var USAGE_EVENTS = ['install', 'launch', 'active'];

var LOCK_WAIT_MS = 10000;
var MAX_FIELD_LEN = 300;

// The report walks the sheet from the bottom up; a year of a few hundred users
// fits well inside this, and the cap keeps a runaway sheet from timing out.
var REPORT_MAX_ROWS = 50000;
var REPORT_CACHE_KEY = 'kelappa-usage-report-v1';
var REPORT_CACHE_SEC = 300;
var DAY_MS = 24 * 60 * 60 * 1000;

function doPost(e) {
  try {
    var payload = parsePayload(e);
    if (!payload) return jsonOut({ ok: false, error: 'empty body' });

    if (payload.type === 'usage') return handleUsage(payload);

    if (!isValidEmail(payload.email)) return jsonOut({ ok: false, error: 'invalid email' });
    appendLead(payload);
    return jsonOut({ ok: true });
  } catch (err) {
    console.error('post failed: ' + err);
    return jsonOut({ ok: false, error: String(err) });
  }
}

/**
 * Health check (no params) and the usage report the /stats/ page reads.
 */
function doGet(e) {
  var params = (e && e.parameter) || {};
  if (params.report === 'usage') {
    try {
      return jsonOut(usageReport(params.nocache === '1'));
    } catch (err) {
      console.error('usage report failed: ' + err);
      return jsonOut({ ok: false, error: String(err) });
    }
  }
  return jsonOut({ ok: true, service: 'kelappa-leads' });
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) return null;
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    console.warn('unparseable body: ' + e.postData.contents);
    return null;
  }
}

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function appendLead(payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(LOCK_WAIT_MS);
  try {
    var sheet = getSheet(SHEET_NAME, HEADERS);
    sheet.appendRow(HEADERS.map(function (key) {
      if (key === 'email') return String(payload.email).trim().toLowerCase();
      return payload[key] || '';
    }));
  } finally {
    lock.releaseLock();
  }
}

// ── Usage ───────────────────────────────────────────────────────────────────

/**
 * One row per event. The client decides how often it speaks (install once ever,
 * launch once per run, active once per day) — the sheet is a log, not a state.
 */
function handleUsage(payload) {
  var app = trim(payload.app);
  var event = trim(payload.event);
  var installId = trim(payload.installId);

  if (!app || !installId) return jsonOut({ ok: false, error: 'app and installId are required' });
  if (USAGE_EVENTS.indexOf(event) === -1) return jsonOut({ ok: false, error: 'unknown event' });

  var lock = LockService.getScriptLock();
  lock.waitLock(LOCK_WAIT_MS);
  try {
    var sheet = getSheet(USAGE_SHEET_NAME, USAGE_HEADERS);
    sheet.appendRow([
      new Date().toISOString(),
      trim(payload.ts),
      app,
      event,
      installId,
      trim(payload.version),
      trim(payload.platform),
      trim(payload.locale),
      trim(payload.userAgent)
    ]);
  } finally {
    lock.releaseLock();
  }
  return jsonOut({ ok: true });
}

/**
 * Per-app rollup: how many installs are known, how many of them showed up
 * today / this week / this month, and which versions they run.
 */
function usageReport(skipCache) {
  var cache = CacheService.getScriptCache();
  if (!skipCache) {
    var cached = cache.get(REPORT_CACHE_KEY);
    if (cached) return JSON.parse(cached);
  }

  var report = buildUsageReport();
  try {
    cache.put(REPORT_CACHE_KEY, JSON.stringify(report), REPORT_CACHE_SEC);
  } catch (err) {
    console.warn('report too big to cache: ' + err);
  }
  return report;
}

function buildUsageReport() {
  var book = SpreadsheetApp.openById(SHEET_ID);
  var sheet = book.getSheetByName(USAGE_SHEET_NAME);
  var now = new Date();
  var empty = { ok: true, generatedAt: now.toISOString(), apps: [], totals: emptyTotals() };
  if (!sheet || sheet.getLastRow() < 2) return empty;

  var lastRow = sheet.getLastRow();
  var firstRow = Math.max(2, lastRow - REPORT_MAX_ROWS + 1);
  var values = sheet.getRange(firstRow, 1, lastRow - firstRow + 1, USAGE_HEADERS.length).getValues();

  var apps = {};
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var stamp = toTime(row[0]);
    var app = String(row[2] || '').trim();
    var event = String(row[3] || '').trim();
    var installId = String(row[4] || '').trim();
    var version = String(row[5] || '').trim();
    if (!app || !installId || !stamp) continue;

    var bucket = apps[app] || (apps[app] = newBucket());
    var ageDays = (now.getTime() - stamp) / DAY_MS;

    bucket.ids[installId] = true;
    if (ageDays <= 1) bucket.today[installId] = true;
    if (ageDays <= 7) bucket.week[installId] = true;
    if (ageDays <= 30) {
      bucket.month[installId] = true;
      // Version of the newest event from this copy — one vote per install,
      // not one per row, so a chatty user does not outweigh a quiet one.
      if (version && stamp >= (bucket.versionAt[installId] || 0)) {
        bucket.versionAt[installId] = stamp;
        bucket.versionOf[installId] = version;
      }
    }
    if (event === 'launch' && ageDays <= 30) bucket.launches30 += 1;
    if (event === 'install') {
      bucket.installEvents[installId] = true;
      if (ageDays <= 7) bucket.new7[installId] = true;
      if (ageDays <= 30) bucket.new30[installId] = true;
    }
    if (stamp > bucket.lastSeen) bucket.lastSeen = stamp;
  }

  var names = Object.keys(apps).sort();
  var out = [];
  var totals = emptyTotals();
  for (var n = 0; n < names.length; n++) {
    var b = apps[names[n]];
    var entry = {
      app: names[n],
      installs: count(b.ids),
      installEvents: count(b.installEvents),
      newLast7: count(b.new7),
      newLast30: count(b.new30),
      activeToday: count(b.today),
      active7: count(b.week),
      active30: count(b.month),
      launches30: b.launches30,
      versions: tally(b.versionOf),
      lastSeen: b.lastSeen ? new Date(b.lastSeen).toISOString() : ''
    };
    out.push(entry);
    totals.installs += entry.installs;
    totals.activeToday += entry.activeToday;
    totals.active7 += entry.active7;
    totals.active30 += entry.active30;
    totals.launches30 += entry.launches30;
  }

  return {
    ok: true,
    generatedAt: now.toISOString(),
    scannedRows: values.length,
    truncated: firstRow > 2,
    apps: out,
    totals: totals
  };
}

function newBucket() {
  return {
    ids: {}, today: {}, week: {}, month: {},
    installEvents: {}, new7: {}, new30: {},
    versionOf: {}, versionAt: {}, launches30: 0, lastSeen: 0
  };
}

function emptyTotals() {
  return { installs: 0, activeToday: 0, active7: 0, active30: 0, launches30: 0 };
}

function count(map) {
  return Object.keys(map).length;
}

/** { installId: version } → { version: how many copies run it } */
function tally(map) {
  var out = {};
  var keys = Object.keys(map);
  for (var i = 0; i < keys.length; i++) {
    var value = map[keys[i]];
    out[value] = (out[value] || 0) + 1;
  }
  return out;
}

/** Sheet cells come back as Date or as the ISO string we wrote. */
function toTime(value) {
  if (value instanceof Date) return value.getTime();
  var parsed = Date.parse(String(value));
  return isNaN(parsed) ? 0 : parsed;
}

function trim(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim().slice(0, MAX_FIELD_LEN);
}

// ── Sheets ──────────────────────────────────────────────────────────────────

function getSheet(name, headers) {
  var book = SpreadsheetApp.openById(SHEET_ID);
  var sheet = book.getSheetByName(name);
  if (!sheet) {
    sheet = book.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
