/**
 * Kelappa email gate — every .dmg download asks for an email first.
 *
 * Drop `<script defer src="/email-gate.js"></script>` on any landing page.
 * The script intercepts clicks on `a[href$=".dmg"]` (capture phase, so it also
 * covers React-rendered anchors), collects the address, ships it to the Google
 * Apps Script endpoint below, then starts the download itself.
 *
 * Failure never blocks the download: if the endpoint is unreachable the lead is
 * parked in localStorage and retried on the next page load.
 */
(function () {
  'use strict';

  // ── Config ────────────────────────────────────────────────────────────────
  // Apps Script web app that appends every lead to the "Kelappa leads" sheet.
  // Source and redeploy instructions: apps-script/ next to this file.
  // Swapping this back to a REPLACE_ME placeholder disarms the gate — downloads
  // then behave exactly as they did before it existed.
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbyEEk8BqF0Ep-HLXEUJWZ8vfteTao3bOUQB3dhMrcLflGEXlLl0TTn9kdP80c9FUBzp/exec';

  var COUNTER_NS = 'kelappa-2026';
  var STORAGE_EMAIL = 'kelappa_email';
  var STORAGE_PENDING = 'kelappa_gate_pending';
  var PENDING_MAX = 20;
  var SEND_TIMEOUT_MS = 5000;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Filename → { app label, abacus counter key }
  var APPS = {
    'ccv.dmg': { name: 'CCV', key: 'dl-ccv' },
    'vtext.dmg': { name: 'VText', key: 'dl-vtext' },
    'clipdeck.dmg': { name: 'Clipdeck', key: 'dl-clipdeck' },
    'en-ru-switcher.dmg': { name: 'EN-RU Switcher', key: 'dl-switcher' },
    'telesufler.dmg': { name: 'Telesufler', key: 'dl-telesufler' }
  };

  var STRINGS = {
    en: {
      title: 'Download {app}', sub: 'Leave your email — the download starts right after.',
      ph: 'you@example.com', cta: 'Download', sending: 'Sending…',
      invalid: 'That email looks off. Mind checking it?',
      note: 'Only update notices. No spam, no sharing.', close: 'Close'
    },
    ru: {
      title: 'Скачать {app}', sub: 'Оставьте email — скачивание начнётся сразу после.',
      ph: 'you@example.com', cta: 'Скачать', sending: 'Отправляем…',
      invalid: 'Кажется, в email опечатка.',
      note: 'Пишем только про обновления. Без спама.', close: 'Закрыть'
    },
    es: {
      title: 'Descargar {app}', sub: 'Deja tu email: la descarga empieza justo después.',
      ph: 'tu@ejemplo.com', cta: 'Descargar', sending: 'Enviando…',
      invalid: 'Ese email no parece válido.',
      note: 'Solo avisos de novedades. Sin spam.', close: 'Cerrar'
    },
    fr: {
      title: 'Télécharger {app}', sub: 'Laissez votre email — le téléchargement démarre juste après.',
      ph: 'vous@exemple.com', cta: 'Télécharger', sending: 'Envoi…',
      invalid: 'Cet email semble incorrect.',
      note: 'Uniquement les mises à jour. Pas de spam.', close: 'Fermer'
    },
    de: {
      title: '{app} laden', sub: 'E-Mail eintragen — der Download startet direkt danach.',
      ph: 'du@beispiel.com', cta: 'Laden', sending: 'Senden…',
      invalid: 'Diese E-Mail sieht nicht richtig aus.',
      note: 'Nur Update-Infos. Kein Spam.', close: 'Schließen'
    },
    pt: {
      title: 'Baixar {app}', sub: 'Deixe seu email — o download começa logo em seguida.',
      ph: 'voce@exemplo.com', cta: 'Baixar', sending: 'Enviando…',
      invalid: 'Esse email parece inválido.',
      note: 'Só avisos de atualização. Sem spam.', close: 'Fechar'
    },
    zh: {
      title: '下载 {app}', sub: '留下邮箱，随后立即开始下载。',
      ph: 'you@example.com', cta: '下载', sending: '发送中…',
      invalid: '邮箱格式好像不对。',
      note: '仅用于更新通知，绝不发垃圾邮件。', close: '关闭'
    },
    ja: {
      title: '{app} をダウンロード', sub: 'メールを入力すると、すぐにダウンロードが始まります。',
      ph: 'you@example.com', cta: 'ダウンロード', sending: '送信中…',
      invalid: 'メールアドレスに誤りがあるようです。',
      note: 'アップデートのお知らせのみ。スパムは送りません。', close: '閉じる'
    },
    ar: {
      title: 'تنزيل {app}', sub: 'اترك بريدك الإلكتروني — يبدأ التنزيل بعده مباشرة.',
      ph: 'you@example.com', cta: 'تنزيل', sending: 'جارٍ الإرسال…',
      invalid: 'يبدو أن البريد الإلكتروني غير صحيح.',
      note: 'إشعارات التحديثات فقط. بدون رسائل مزعجة.', close: 'إغلاق'
    }
  };

  var isArmed = ENDPOINT.indexOf('REPLACE_ME') === -1;

  // ── Small helpers ─────────────────────────────────────────────────────────
  function readStore(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function writeStore(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  function strings() {
    var code = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
    return STRINGS[code] || STRINGS.en;
  }

  function appFromHref(href) {
    var file = href.split('?')[0].split('#')[0].split('/').pop().toLowerCase();
    if (file.slice(-4) !== '.dmg') return null;
    return APPS[file] || { name: file.replace(/\.dmg$/i, ''), key: null };
  }

  function countDownload(app) {
    if (!app.key) return;
    try {
      new Image().src = 'https://abacus.jasoncameron.dev/hit/' + COUNTER_NS + '/' + app.key + '?t=' + Date.now();
    } catch (e) { /* counting is best-effort */ }
  }

  function startDownload(href) {
    var a = document.createElement('a');
    a.href = href;
    a.setAttribute('download', '');
    // Marks the synthetic click as ours — without it the capture listener below
    // would intercept it and call startDownload again, forever.
    a.setAttribute('data-kg-bypass', '1');
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // ── Lead delivery ─────────────────────────────────────────────────────────
  function buildPayload(email, app) {
    var params = new URLSearchParams(location.search);
    return {
      email: email,
      app: app.name,
      page: location.pathname,
      lang: document.documentElement.lang || '',
      referrer: document.referrer || '',
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      userAgent: navigator.userAgent,
      ts: new Date().toISOString()
    };
  }

  function beacon(body) {
    if (!navigator.sendBeacon) return false;
    try {
      return navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain;charset=UTF-8' }));
    } catch (e) {
      return false;
    }
  }

  function post(body) {
    // text/plain keeps it a "simple" request — Apps Script has no CORS preflight.
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, SEND_TIMEOUT_MS) : null;
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: body,
      keepalive: true,
      signal: controller ? controller.signal : undefined
    }).then(function (res) {
      if (timer) clearTimeout(timer);
      if (res.ok) return true;
      console.warn('[kelappa-gate] endpoint returned', res.status);
      return false;
    }).catch(function (err) {
      if (timer) clearTimeout(timer);
      console.warn('[kelappa-gate] POST failed:', err && err.message);
      return false;
    });
  }

  function park(body) {
    var queue = [];
    try { queue = JSON.parse(readStore(STORAGE_PENDING) || '[]'); } catch (e) { queue = []; }
    if (!Array.isArray(queue)) queue = [];
    queue.push(body);
    writeStore(STORAGE_PENDING, JSON.stringify(queue.slice(-PENDING_MAX)));
  }

  function sendLead(payload) {
    var body = JSON.stringify(payload);
    return post(body).then(function (ok) {
      if (ok) return true;
      if (beacon(body)) return true;
      park(body);
      return false;
    });
  }

  function flushPending() {
    var raw = readStore(STORAGE_PENDING);
    if (!raw) return;
    var queue;
    try { queue = JSON.parse(raw); } catch (e) { queue = null; }
    if (!Array.isArray(queue) || !queue.length) {
      writeStore(STORAGE_PENDING, '[]');
      return;
    }
    writeStore(STORAGE_PENDING, '[]');
    queue.forEach(function (body) {
      post(body).then(function (ok) { if (!ok) park(body); });
    });
  }

  // ── Modal ─────────────────────────────────────────────────────────────────
  var STYLE_ID = 'kelappa-gate-style';
  var CSS = [
    '.kg-back{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;',
    'padding:20px;background:rgba(20,16,12,0.5);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);',
    'opacity:0;transition:opacity .18s ease;font-family:inherit;}',
    '.kg-back.kg-in{opacity:1;}',
    '.kg-wrap{position:relative;width:100%;max-width:392px;}',
    '.kg-card{width:100%;background:#fff;color:#16130f;border-radius:20px;padding:28px;',
    'box-shadow:0 30px 80px -20px rgba(0,0,0,.45);transform:translateY(10px) scale(.98);transition:transform .18s ease;}',
    '.kg-back.kg-in .kg-card{transform:none;}',
    '.kg-title{margin:0 0 6px;font-size:21px;font-weight:700;letter-spacing:-0.01em;line-height:1.25;}',
    '.kg-sub{margin:0 0 18px;font-size:14.5px;line-height:1.5;color:rgba(22,19,15,.62);}',
    '.kg-input{width:100%;height:48px;padding:0 15px;border-radius:12px;border:1.5px solid rgba(22,19,15,.16);',
    'font-size:16px;font-family:inherit;color:inherit;background:#fff;outline:none;transition:border-color .15s ease;}',
    '.kg-input:focus{border-color:var(--kg-accent,#1d1d1f);}',
    '.kg-input.kg-bad{border-color:#d64545;}',
    '.kg-err{min-height:18px;margin:7px 2px 0;font-size:12.5px;color:#d64545;}',
    '.kg-btn{width:100%;height:50px;margin-top:8px;border:none;border-radius:12px;cursor:pointer;',
    'background:var(--kg-accent,#1d1d1f);color:var(--kg-accent-fg,#fff);font-size:16px;font-weight:600;',
    'font-family:inherit;transition:opacity .15s ease;}',
    '.kg-btn:hover{opacity:.88;}',
    '.kg-btn[disabled]{opacity:.55;cursor:default;}',
    '.kg-note{margin:14px 0 0;font-size:12px;line-height:1.5;text-align:center;color:rgba(22,19,15,.45);}',
    '.kg-x{position:absolute;top:12px;right:12px;width:30px;height:30px;border:none;border-radius:50%;',
    'background:rgba(22,19,15,.06);color:rgba(22,19,15,.6);font-size:15px;line-height:1;cursor:pointer;',
    'font-family:inherit;display:flex;align-items:center;justify-content:center;}',
    '@media (prefers-color-scheme:dark){.kg-card{background:#1b1917;color:#f4f1ec;}',
    '.kg-sub{color:rgba(244,241,236,.6);}.kg-note{color:rgba(244,241,236,.42);}',
    '.kg-input{background:#242220;border-color:rgba(244,241,236,.18);}',
    '.kg-input:focus{border-color:var(--kg-accent,#f4f1ec);}',
    '.kg-btn{background:var(--kg-accent,#f4f1ec);color:var(--kg-accent-fg,#1b1917);}',
    '.kg-x{background:rgba(244,241,236,.1);color:rgba(244,241,236,.65);}}'
  ].join('');

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }

  var openState = null;

  function closeModal() {
    if (!openState) return;
    var state = openState;
    openState = null;
    document.removeEventListener('keydown', state.onKey, true);
    state.back.classList.remove('kg-in');
    setTimeout(function () { state.back.remove(); }, 180);
    if (state.restoreFocus && state.restoreFocus.focus) state.restoreFocus.focus();
  }

  function buildCard(s, app) {
    var card = document.createElement('div');
    card.className = 'kg-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');
    card.setAttribute('aria-label', s.title.replace('{app}', app.name));

    var title = document.createElement('h2');
    title.className = 'kg-title';
    title.textContent = s.title.replace('{app}', app.name);

    var sub = document.createElement('p');
    sub.className = 'kg-sub';
    sub.textContent = s.sub;

    var form = document.createElement('form');
    form.noValidate = true;

    var input = document.createElement('input');
    input.className = 'kg-input';
    input.type = 'email';
    input.name = 'email';
    input.placeholder = s.ph;
    input.autocomplete = 'email';
    input.spellcheck = false;
    input.value = readStore(STORAGE_EMAIL) || '';

    var err = document.createElement('div');
    err.className = 'kg-err';

    var btn = document.createElement('button');
    btn.className = 'kg-btn';
    btn.type = 'submit';
    btn.textContent = s.cta;

    var note = document.createElement('p');
    note.className = 'kg-note';
    note.textContent = s.note;

    form.append(input, err, btn);
    card.append(title, sub, form, note);
    return { card: card, form: form, input: input, err: err, btn: btn };
  }

  function openModal(app, href) {
    if (openState) return;
    injectStyle();
    var s = strings();
    var parts = buildCard(s, app);

    var back = document.createElement('div');
    back.className = 'kg-back';
    back.dir = document.documentElement.dir || 'ltr';

    var wrap = document.createElement('div');
    wrap.className = 'kg-wrap';

    var x = document.createElement('button');
    x.className = 'kg-x';
    x.type = 'button';
    x.setAttribute('aria-label', s.close);
    x.textContent = '✕';

    wrap.append(parts.card, x);
    back.append(wrap);
    document.body.appendChild(back);
    requestAnimationFrame(function () { back.classList.add('kg-in'); });

    function onKey(e) {
      if (e.key === 'Escape') { e.stopPropagation(); closeModal(); }
    }

    openState = { back: back, onKey: onKey, restoreFocus: document.activeElement };
    document.addEventListener('keydown', onKey, true);
    x.addEventListener('click', closeModal);
    back.addEventListener('mousedown', function (e) { if (e.target === back) closeModal(); });
    setTimeout(function () { parts.input.focus(); parts.input.select(); }, 60);

    parts.input.addEventListener('input', function () {
      parts.input.classList.remove('kg-bad');
      parts.err.textContent = '';
    });

    parts.form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = parts.input.value.trim();
      if (!EMAIL_RE.test(email)) {
        parts.input.classList.add('kg-bad');
        parts.err.textContent = s.invalid;
        parts.input.focus();
        return;
      }
      parts.err.textContent = '';
      parts.btn.disabled = true;
      parts.btn.textContent = s.sending;
      writeStore(STORAGE_EMAIL, email);
      sendLead(buildPayload(email, app)).then(function () {
        closeModal();
        countDownload(app);
        startDownload(href);
      });
    });
  }

  // ── Interception ──────────────────────────────────────────────────────────
  function onClick(e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!link || link.hasAttribute('data-kg-bypass')) return;

    var app = appFromHref(link.getAttribute('href') || '');
    if (!app) return;

    // Stop here so the pages' own abacus listeners don't double-count: the gate
    // fires the counter itself once the download actually starts.
    e.preventDefault();
    e.stopPropagation();

    var known = readStore(STORAGE_EMAIL);
    if (known && EMAIL_RE.test(known)) {
      sendLead(buildPayload(known, app));
      countDownload(app);
      startDownload(link.href);
      return;
    }
    openModal(app, link.href);
  }

  if (!isArmed) {
    console.warn('[kelappa-gate] ENDPOINT not configured — downloads left ungated.');
    return;
  }

  document.addEventListener('click', onClick, true);
  flushPending();
})();
