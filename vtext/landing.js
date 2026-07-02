// VText landing — hero demo animation + scroll reveals
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // ── Scroll reveal ──────────────────────────────────────────────
  function initReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
  }

  // ── Waveform bars ──────────────────────────────────────────────
  const WAVE_BARS = 34;
  let waveEl, waveTimer, waveLevel = 0;

  function buildWave() {
    waveEl = document.getElementById("demo-wave");
    if (!waveEl) return;
    for (let i = 0; i < WAVE_BARS; i++) {
      const b = document.createElement("span");
      b.className = "wbar";
      b.style.height = "8%";
      waveEl.appendChild(b);
    }
  }
  function startWave() {
    if (!waveEl) return;
    const bars = waveEl.children;
    waveLevel = 0.4;
    stopWave();
    waveTimer = setInterval(() => {
      for (let i = 0; i < bars.length; i++) {
        const center = 1 - Math.abs(i - bars.length / 2) / (bars.length / 2);
        const base = 12 + center * 30;
        const h = base + Math.random() * 70 * waveLevel * (0.4 + center);
        bars[i].style.height = Math.max(8, Math.min(100, h)) + "%";
      }
      // gentle level breathing
      waveLevel += (Math.random() - 0.45) * 0.25;
      waveLevel = Math.max(0.25, Math.min(1, waveLevel));
    }, 85);
  }
  function stopWave() {
    if (waveTimer) clearInterval(waveTimer);
    waveTimer = null;
  }
  function flattenWave() {
    stopWave();
    if (!waveEl) return;
    Array.from(waveEl.children).forEach((b) => (b.style.height = "8%"));
  }

  // ── Typewriter ─────────────────────────────────────────────────
  async function typeInto(el, text, speed) {
    el.textContent = "";
    el.classList.add("typing");
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      const ch = text[i];
      let d = speed;
      if (ch === "," || ch === "—") d = speed * 6;
      if (ch === "." || ch === "?" || ch === "!") d = speed * 9;
      await sleep(d);
    }
    el.classList.remove("typing");
  }

  async function buildWords(el, text, wordDelay) {
    el.textContent = "";
    const words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      el.textContent += (i ? " " : "") + words[i];
      await sleep(wordDelay + Math.random() * 60);
    }
  }

  // ── Hero demo loop ─────────────────────────────────────────────
  const RAW_FALLBACK =
    "um so hey, I was thinking like maybe we could, uh, move the meeting to Thursday afternoon if that works, you know, 'cause mornings are kind of crazy for me right now";
  const CLEAN_FALLBACK =
    "Can we move the meeting to Thursday afternoon? Mornings are packed for me right now.";

  function demoStr() {
    const d = window.__VT_DEMO || {};
    return {
      placeholder: d.placeholder || "Message",
      badge: d.badge || "Shorten",
      listening: d.listening || "Listening",
      cleaning: d.cleaning || "Cleaning up",
      rawText: d.rawText || RAW_FALLBACK,
      cleanText: d.cleanText || CLEAN_FALLBACK,
    };
  }

  let running = false;

  function setPhase(p) {
    const root = document.getElementById("demo");
    if (root) root.setAttribute("data-phase", p);
  }

  async function runDemo() {
    if (running) return;
    running = true;

    const input = document.getElementById("demo-input");
    const raw = document.getElementById("demo-raw");
    const rawWrap = document.getElementById("demo-raw-wrap");
    const pillLabel = document.getElementById("demo-pill-label");
    const messages = document.getElementById("demo-messages");
    const modeBadge = document.getElementById("demo-mode");

    if (reduce) {
      // Static end-state
      const s = demoStr();
      setPhase("done");
      if (rawWrap) rawWrap.style.opacity = "1";
      if (raw) raw.textContent = s.rawText;
      if (input) {
        input.textContent = s.cleanText;
        input.classList.remove("placeholder");
      }
      running = false;
      return;
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const s = demoStr();
      // 1. idle
      setPhase("idle");
      input.textContent = s.placeholder;
      input.classList.add("placeholder");
      raw.textContent = "";
      rawWrap.style.opacity = "0";
      flattenWave();
      await sleep(900);

      // 2. recording
      setPhase("recording");
      pillLabel.textContent = s.listening;
      startWave();
      rawWrap.style.opacity = "1";
      await sleep(300);
      await buildWords(raw, s.rawText, 105);
      await sleep(500);

      // 3. processing
      setPhase("processing");
      pillLabel.textContent = s.cleaning;
      waveLevel = 0.5;
      await sleep(900);
      flattenWave();

      // 4. writing clean text into input
      setPhase("writing");
      input.classList.remove("placeholder");
      if (modeBadge) modeBadge.textContent = s.badge;
      await typeInto(input, s.cleanText, 26);
      await sleep(700);

      // 5. send
      setPhase("sent");
      const bubble = document.createElement("div");
      bubble.className = "msg out fresh";
      bubble.textContent = s.cleanText;
      messages.appendChild(bubble);
      input.textContent = s.placeholder;
      input.classList.add("placeholder");
      // keep chat from growing unbounded
      while (messages.querySelectorAll(".msg.out").length > 1) {
        messages.querySelector(".msg.out").remove();
      }
      await sleep(1500);
      rawWrap.style.opacity = "0";
      await sleep(600);
    }
  }

  // ── Nav shadow on scroll ───────────────────────────────────────
  function initNav() {
    const nav = document.getElementById("nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function init() {
    initNav();
    initReveal();
    buildWave();
    runDemo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
