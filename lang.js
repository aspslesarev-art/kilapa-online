// Kelappa — shared site language (EN / RU).
//
// First visit: the browser's preferred language decides (ru* → RU, else EN).
// After the visitor picks a language with the switcher, that choice is
// remembered for the whole site (every page reads the same storage key).
// <html lang> always mirrors the current language — /email-gate.js reads it.
(function () {
  'use strict';

  var SUPPORTED = ['en', 'ru'];
  var STORAGE_KEY = 'kelappa_lang';
  var EVENT = 'kelappa:lang';

  function isSupported(code) {
    return SUPPORTED.indexOf(code) !== -1;
  }

  function readSaved() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return isSupported(saved) ? saved : null;
    } catch (_) {
      return null; // private mode / blocked storage — fall back to the browser
    }
  }

  function fromBrowser() {
    var prefs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || 'en'];
    for (var i = 0; i < prefs.length; i++) {
      var code = String(prefs[i] || '').slice(0, 2).toLowerCase();
      if (isSupported(code)) return code;
    }
    return 'en';
  }

  var current = readSaved() || fromBrowser();
  document.documentElement.lang = current;

  function set(code) {
    if (!isSupported(code) || code === current) return;
    current = code;
    document.documentElement.lang = code;
    try { localStorage.setItem(STORAGE_KEY, code); } catch (_) { /* choice just won't persist */ }
    document.dispatchEvent(new CustomEvent(EVENT, { detail: code }));
  }

  function onChange(fn) {
    var handler = function (e) { fn(e.detail); };
    document.addEventListener(EVENT, handler);
    return function () { document.removeEventListener(EVENT, handler); };
  }

  window.KelappaLang = {
    SUPPORTED: SUPPORTED,
    get: function () { return current; },
    set: set,
    onChange: onChange,
  };
})();
