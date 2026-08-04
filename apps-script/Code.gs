/**
 * Kelappa lead collector — Google Apps Script web app.
 *
 * Receives the JSON payload from /email-gate.js and appends one row per
 * download to the bound spreadsheet. Deploy as: Web app → Execute as "Me" →
 * Who has access "Anyone". See README.md next to this file.
 */

var SHEET_NAME = 'Leads';
var HEADERS = [
  'ts', 'email', 'app', 'page', 'lang',
  'referrer', 'utm_source', 'utm_medium', 'utm_campaign', 'userAgent'
];
var LOCK_WAIT_MS = 10000;

function doPost(e) {
  try {
    var payload = parsePayload(e);
    if (!payload) return jsonOut({ ok: false, error: 'empty body' });
    if (!isValidEmail(payload.email)) return jsonOut({ ok: false, error: 'invalid email' });

    appendLead(payload);
    return jsonOut({ ok: true });
  } catch (err) {
    console.error('lead append failed: ' + err);
    return jsonOut({ ok: false, error: String(err) });
  }
}

/** Health check: opening the /exec URL in a browser should print ok. */
function doGet() {
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
    var sheet = getSheet();
    sheet.appendRow(HEADERS.map(function (key) {
      if (key === 'email') return String(payload.email).trim().toLowerCase();
      return payload[key] || '';
    }));
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
