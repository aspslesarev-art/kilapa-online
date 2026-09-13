// Kelappa Landing — mock app screenshots for the real product lineup:
// CCV, VText, FloFi, Switcher.

// Colors are oklch() strings, so a hex alpha suffix (`${c}f5`) is invalid CSS
// and the whole declaration gets dropped. Append the alpha inside oklch().
function withAlpha(color, hexAlpha) {
  const a = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
  return color.replace(/\)\s*$/, ` / ${a})`);
}

function ScreenFrame({ device = 'iphone', children, width, height }) {
  if (device === 'iphone') {
    const W = width ?? 240, H = height ?? 500;
    return (
      <div style={{ width: W, height: H, borderRadius: W * 0.18, background: 'linear-gradient(180deg, #2a2a2a, #0e0e0e)', padding: W * 0.025, boxShadow: '0 30px 60px -20px rgba(60,30,10,0.35)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: W * 0.155, overflow: 'hidden', position: 'relative', background: '#fff' }}>
          <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: W * 0.32, height: 18, background: '#0a0a0a', borderRadius: 12, zIndex: 5 }} />
          {children}
        </div>
      </div>
    );
  }
  if (device === 'mac') {
    const W = width ?? 460, H = height ?? 290;
    return (
      <div style={{ width: W, height: H, borderRadius: 10, background: '#1d1d1d', boxShadow: '0 30px 60px -20px rgba(60,30,10,0.35)', overflow: 'hidden' }}>
        <div style={{ height: 22, background: '#e8e3d8', display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 10, borderBottom: '1px solid #cfc6b3' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{ width: '100%', height: H - 22, background: '#fff', position: 'relative' }}>{children}</div>
      </div>
    );
  }
}

// ── CCV · notch portal (macOS) ─────────────────────────────
function CCVMock({ t, m }) {
  return (
    <div style={{ position: 'relative', width: 480, paddingTop: 0 }}>
      {/* Simulated MacBook top edge with notch */}
      <div style={{
        position: 'relative',
        background: '#0a0a0a',
        borderRadius: '14px 14px 4px 4px',
        height: 26,
        boxShadow: '0 30px 60px -20px rgba(60,30,10,0.35)',
      }}>
        {/* widened notch acting as a file portal */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 230, height: 56,
          background: '#0a0a0a',
          borderRadius: '0 0 22px 22px',
          padding: '6px 18px',
          display: 'flex', alignItems: 'center', gap: 12,
          zIndex: 3,
        }}>
          {/* camera dot */}
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1d1d1d', border: '1px solid #2a2a2a', flexShrink: 0 }} />
          {/* file inside the portal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f6efe2', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <svg width="22" height="26" viewBox="0 0 22 26">
              <path d="M2 2 H14 L20 8 V24 H2 Z" fill={t.coral} stroke="none" />
              <path d="M14 2 V8 H20" stroke="#0a0a0a" strokeWidth="1.2" fill="none" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontSize: 10, fontWeight: 600 }}>{m.file}</span>
              <span style={{ fontSize: 9, opacity: 0.6 }}>{m.parked}</span>
            </div>
          </div>
          {/* coral pulse around portal */}
          <div style={{ position: 'absolute', inset: -3, borderRadius: '0 0 24px 24px', boxShadow: `0 0 0 2px ${t.coral}`, pointerEvents: 'none', opacity: 0.6 }} />
        </div>
      </div>

      {/* Desktop wallpaper showing under the notch */}
      <div style={{
        background: `linear-gradient(180deg, ${t.coral} 0%, ${t.saffron} 100%)`,
        height: 230,
        borderRadius: '0 0 14px 14px',
        padding: '50px 28px 18px',
        position: 'relative',
        color: t.cream,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxShadow: '0 30px 60px -20px rgba(60,30,10,0.35)',
      }}>
        {/* a file being dragged toward the notch */}
        <svg width="18" height="22" viewBox="0 0 22 26" style={{ position: 'absolute', top: 100, left: 110, transform: 'rotate(-12deg)', opacity: 0.92 }}>
          <path d="M2 2 H14 L20 8 V24 H2 Z" fill={t.cream} />
          <path d="M14 2 V8 H20" stroke={t.coral} strokeWidth="1.2" fill="none" />
        </svg>
        {/* dashed arrow up */}
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ position: 'absolute', top: 4, left: 90 }}>
          <path d="M30 90 Q 40 30 60 8" stroke={t.cream} strokeWidth="1.5" fill="none" strokeDasharray="3 4" opacity="0.8" />
          <path d="M55 14 L62 8 L60 16" stroke={t.cream} strokeWidth="1.5" fill="none" opacity="0.8" />
        </svg>

        <div style={{ position: 'absolute', bottom: 18, left: 28, right: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.75 }}>{m.eyebrow}</div>
            <div style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600, fontSize: 18, letterSpacing: '-0.02em', marginTop: 2 }}>{m.h}</div>
          </div>
          <div style={{ fontSize: 9.5, opacity: 0.7, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 12 }}>{m.count}</div>
        </div>
      </div>
    </div>
  );
}

// ── VText · dictation overlay (macOS) ──────────────────────
function VTextMock({ t, m }) {
  return (
    <ScreenFrame device="mac" width={460} height={290}>
      {/* fake document underneath */}
      <div style={{ position: 'absolute', inset: 0, background: t.cream, padding: '24px 32px', fontFamily: "'Plus Jakarta Sans', sans-serif", color: t.husk, fontSize: 11, lineHeight: 1.6 }}>
        <div style={{ opacity: 0.6 }}>
          {m.doc_title}<br/>
          ────────────────────────<br/>
          {m.doc_l1}<br/>
          {m.doc_l2} <span style={{ background: t.shell, padding: '1px 4px', borderRadius: 2, color: t.ink }}>|</span>
        </div>
      </div>

      {/* dictation modal */}
      <div style={{
        position: 'absolute', left: '50%', top: '54%', transform: 'translate(-50%, -50%)',
        width: 320, background: `${withAlpha(KELAPPA_BROWN, 'f5')}`, color: t.cream,
        borderRadius: 18, padding: '18px 18px 14px',
        boxShadow: '0 20px 50px -10px rgba(0,0,0,0.45)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* mic */}
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: t.coral, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="14" viewBox="0 0 12 14">
              <rect x="4" y="1" width="4" height="8" rx="2" fill={t.cream} />
              <path d="M2 7 Q 2 11 6 11 Q 10 11 10 7" stroke={t.cream} strokeWidth="1.2" fill="none" />
              <line x1="6" y1="11" x2="6" y2="13" stroke={t.cream} strokeWidth="1.2" />
            </svg>
          </div>
          <div style={{ flex: 1, fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7 }}>{m.listening}</div>
          {/* waveform */}
          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {[3, 7, 12, 9, 5, 11, 6].map((h, i) => <span key={i} style={{ width: 2, height: h, background: t.coral, borderRadius: 1 }} />)}
          </div>
        </div>
        <div style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 500, fontSize: 14, lineHeight: 1.35, color: t.cream }}>
          {m.said}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {m.actions.map((b, i) => (
            <span key={b} style={{ fontSize: 10, padding: '5px 9px', borderRadius: 999,
              background: i === 0 ? t.coral : `${withAlpha(t.cream, '1f')}`,
              color: t.cream, fontWeight: 500 }}>{b}</span>
          ))}
        </div>
      </div>
    </ScreenFrame>
  );
}

// ── FloFi · finance (iOS) ─────────────────────────────────
function FloFiMock({ t, m }) {
  return (
    <ScreenFrame device="iphone" width={220} height={460}>
      <div style={{ width: '100%', height: '100%', background: t.cream, padding: '46px 20px 22px', display: 'flex', flexDirection: 'column', gap: 16, fontFamily: "'Plus Jakarta Sans', sans-serif", color: t.ink }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk }}>{m.eyebrow}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
            <span style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600, fontSize: 36, letterSpacing: '-0.03em' }}>$1,247</span>
            <span style={{ fontSize: 11, color: t.husk }}>{m.left}</span>
          </div>
          <div style={{ fontSize: 11, color: t.palm, marginTop: 2, fontWeight: 600 }}>{m.track}</div>
        </div>

        {/* gentle bar chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 56, padding: '0 2px' }}>
          {[28, 36, 22, 44, 30, 38, 18].map((h, i) => (
            <div key={i} style={{ flex: 1, height: h, background: i === 3 ? t.coral : t.lagoon, borderRadius: 4, opacity: i === 3 ? 1 : 0.6 }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8.5, color: t.husk, marginTop: -10 }}>
          {m.days.map((d, i) => <span key={i}>{d}</span>)}
        </div>

        {/* categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { name: m.cats[0], c: t.coral,   v: 184 },
            { name: m.cats[1], c: t.husk,    v: 720 },
            { name: m.cats[2], c: t.saffron, v: 96 },
          ].map((cat) => (
            <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: cat.c, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12, color: t.ink }}>{cat.name}</span>
              <span style={{ fontSize: 12, color: t.husk, fontVariantNumeric: 'tabular-nums' }}>${cat.v}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', background: t.shell, borderRadius: 12, padding: '10px 14px', fontSize: 11, color: t.ink, lineHeight: 1.4 }}>
          <span style={{ color: t.husk }}>{m.today_pre}</span> <strong style={{ fontWeight: 600 }}>$47</strong> <span style={{ color: t.husk }}>{m.today_post}</span>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ── Switcher · auto layout fix (macOS) ─────────────────────
function SwitcherMock({ t, m }) {
  return (
    <ScreenFrame device="mac" width={460} height={290}>
      {/* document with text */}
      <div style={{ position: 'absolute', inset: 0, background: t.cream, padding: '32px 36px', fontFamily: "'Plus Jakarta Sans', sans-serif", color: t.ink }}>
        <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk, marginBottom: 12 }}>{m.eyebrow}</div>
        <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 14, lineHeight: 1.7, color: t.ink }}>
          <div>{m.greeting}</div>
          <div style={{ marginTop: 6 }}>
            <span style={{ textDecoration: 'line-through', color: t.husk, opacity: 0.55 }}>{m.wrong}</span>
            {' '}
            <span style={{ background: `${withAlpha(t.palm, '33')}`, color: t.ink, padding: '1px 4px', borderRadius: 3 }}>{m.right}</span>
            {' '}{m.l1}
          </div>
          <div style={{ marginTop: 6 }}>
            {m.l2}<span style={{ background: t.coral, color: t.cream, borderRadius: 1, marginLeft: 2 }}>&nbsp;|&nbsp;</span>
          </div>
        </div>
      </div>

      {/* small toast in corner */}
      <div style={{
        position: 'absolute', right: 18, bottom: 18,
        background: `${withAlpha(KELAPPA_BROWN, 'f5')}`, color: t.cream,
        borderRadius: 12, padding: '10px 14px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 11, display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 14px 30px -8px rgba(0,0,0,0.3)',
      }}>
        <span style={{ minWidth: 22, height: 22, padding: '0 6px', whiteSpace: 'nowrap', borderRadius: 6, background: t.saffron, color: KELAPPA_BROWN, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{m.badge}</span>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25 }}>
          <span style={{ fontWeight: 600 }}>{m.toast}</span>
          <span style={{ opacity: 0.7, fontSize: 10 }}>{m.pair}</span>
        </div>
      </div>
    </ScreenFrame>
  );
}

// ── Telesufler · floating overlay (macOS) ──────────────────
function TelesuflerMock({ t, m }) {
  return (
    <ScreenFrame device="mac" width={460} height={290}>
      {/* fake screen-share view behind the overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#f3eedf',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {/* simulated slide / shared screen */}
        <div style={{
          position: 'absolute', inset: '10px 10px 10px 10px',
          background: t.cream,
          borderRadius: 8,
          padding: '14px 18px',
          color: t.ink,
        }}>
          <div style={{ fontSize: 8.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk, opacity: 0.8 }}>{m.eyebrow}</div>
          <div style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600, fontSize: 22, letterSpacing: '-0.025em', marginTop: 10, color: t.ink }}>
            {m.h}
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
            {[t.coral, t.lagoon, t.palm].map((c) => (
              <div key={c} style={{ flex: 1, height: 46, borderRadius: 6, background: c, opacity: 0.85 }} />
            ))}
          </div>
          <div style={{ fontSize: 9, color: t.husk, marginTop: 10, lineHeight: 1.5 }}>
            {m.bullets.map((b) => <div key={b}>• {b}</div>)}
          </div>
        </div>

        {/* tiny self-view tile, top-right corner — the user's camera */}
        <div style={{
          position: 'absolute', right: 14, top: 14,
          width: 96, height: 56,
          background: `linear-gradient(135deg, ${t.lagoon}, ${t.husk})`,
          borderRadius: 6,
          display: 'flex', alignItems: 'flex-end', padding: 6,
          boxShadow: '0 4px 10px -2px rgba(0,0,0,0.25)',
        }}>
          <span style={{ fontSize: 8.5, color: t.cream, opacity: 0.9 }}>{m.you}</span>
          {/* camera lens dot */}
          <span style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, borderRadius: '50%', background: '#1d1d1d', border: '1px solid #2a2a2a' }} />
        </div>
      </div>

      {/* floating telesufler window — sits right under the camera tile */}
      <div style={{
        position: 'absolute', right: 14, top: 78, width: 200,
        background: `${withAlpha(KELAPPA_BROWN, 'f2')}`,
        backdropFilter: 'blur(8px)',
        color: t.cream,
        borderRadius: 10,
        padding: '9px 11px',
        boxShadow: '0 14px 30px -8px rgba(0,0,0,0.5)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        border: `1px solid ${withAlpha(t.cream, '1a')}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.75, marginBottom: 6 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.coral }} />
            {m.on_top}
          </span>
          <span>0:42</span>
        </div>
        <div style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 500, fontSize: 9.5, lineHeight: 1.3, opacity: 0.35 }}>
          {m.prev}
        </div>
        <div style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600, fontSize: 12.5, lineHeight: 1.25, letterSpacing: '-0.01em', color: t.cream, marginTop: 3 }}>
          {m.line}
        </div>
        <div style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 500, fontSize: 9.5, lineHeight: 1.3, opacity: 0.55, marginTop: 3 }}>
          {m.next}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <span style={{ width: 13, height: 13, borderRadius: '50%', background: t.coral, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 0, height: 0, borderTop: '3px solid transparent', borderBottom: '3px solid transparent', borderLeft: `4px solid ${t.cream}`, marginLeft: 1 }} />
          </span>
          <span style={{ flex: 1, height: 2, background: `${withAlpha(t.cream, '33')}`, borderRadius: 2, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '38%', background: t.coral, borderRadius: 2 }} />
          </span>
          <span style={{ fontSize: 8, opacity: 0.65 }}>⌥⇧</span>
        </div>
      </div>

      {/* "invisible to viewers" badge */}
      <div style={{
        position: 'absolute', left: 14, bottom: 14,
        display: 'flex', alignItems: 'center', gap: 6,
        background: `${withAlpha(t.palm, 'd9')}`,
        color: KELAPPA_BROWN,
        padding: '6px 10px',
        borderRadius: 999,
        fontSize: 9.5,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        letterSpacing: '0.04em',
        boxShadow: '0 8px 18px -6px rgba(0,0,0,0.3)',
      }}>
        {/* eye-off icon */}
        <svg width="12" height="12" viewBox="0 0 16 16">
          <path d="M2 8 Q 8 2 14 8 Q 8 14 2 8 Z" stroke={KELAPPA_BROWN} strokeWidth="1.3" fill="none" />
          <circle cx="8" cy="8" r="2" fill={KELAPPA_BROWN} />
          <line x1="2.5" y1="2.5" x2="13.5" y2="13.5" stroke={KELAPPA_BROWN} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {m.hidden}
      </div>
    </ScreenFrame>
  );
}

// ── Onit · current-task plate + success diary (macOS) ──────
function OnitMock({ t, m }) {
  const diary = m.rows;

  const plate = {
    position: 'absolute', right: 12, width: 218,
    borderRadius: 13, padding: '8px 10px',
    display: 'flex', alignItems: 'center', gap: 9,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxShadow: '0 14px 30px -8px rgba(0,0,0,0.42)',
  };

  return (
    <ScreenFrame device="mac" width={460} height={290}>
      {/* the work itself, underneath — the plate never steals focus from it */}
      <div style={{ position: 'absolute', inset: 0, background: '#f3eedf', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ position: 'absolute', inset: 10, background: t.cream, borderRadius: 8, padding: '14px 18px', color: t.ink }}>
          <div style={{ fontSize: 8.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk, opacity: 0.8 }}>{m.doc_eyebrow}</div>
          <div style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600, fontSize: 20, letterSpacing: '-0.025em', marginTop: 8 }}>{m.doc_h}</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, width: 170 }}>
            {[1, 0.85, 0.62, 0.9, 0.48].map((w, i) => (
              <span key={i} style={{ height: 6, width: `${w * 100}%`, background: t.shell, borderRadius: 3 }} />
            ))}
          </div>
        </div>
      </div>

      {/* the plate — one task, above every window, on every desktop */}
      <div style={{ ...plate, top: 12, background: KELAPPA_BROWN, color: t.cream, border: '1px solid rgba(255,255,255,0.12)' }}>
        <span style={{ position: 'relative', width: 11, height: 11, borderRadius: '50%', background: t.palm, flexShrink: 0 }}>
          <span style={{ position: 'absolute', inset: -4, borderRadius: '50%', boxShadow: `0 0 0 1.5px ${t.palm}`, opacity: 0.45 }} />
        </span>
        <div style={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.task}</span>
          <span style={{ fontSize: 8.5, opacity: 0.6, letterSpacing: '0.1em', fontVariantNumeric: 'tabular-nums' }}>{m.running}</span>
        </div>
        {['❙❙', '✓'].map((b, i) => (
          <span key={b} style={{
            width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
            background: i === 1 ? t.palm : 'rgba(255,255,255,0.16)',
            color: i === 1 ? KELAPPA_BROWN : t.cream,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: i === 1 ? 10 : 7, fontWeight: 700,
          }}>{b}</span>
        ))}
      </div>

      {/* same plate, after you have wandered off into a messenger */}
      <div style={{ ...plate, top: 62, background: t.coral, color: t.cream, border: '1px solid rgba(255,255,255,0.22)' }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: t.cream, flexShrink: 0, opacity: 0.9 }} />
        <div style={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '-0.01em' }}>Telegram · 1:12</span>
          <span style={{ fontSize: 8.5, opacity: 0.85, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.still_on}</span>
        </div>
      </div>
      <div style={{ position: 'absolute', right: 12, top: 106, width: 218, textAlign: 'right', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.husk, fontFamily: "'Plus Jakarta Sans', sans-serif", opacity: 0.9 }}>
        {m.after}
      </div>

      {/* end of the day — the success diary */}
      <div style={{
        position: 'absolute', left: 12, bottom: 12, width: 244,
        background: t.cream, border: `1px solid ${t.sand}`, borderRadius: 12,
        padding: '10px 12px', fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxShadow: '0 14px 30px -12px rgba(60,30,10,0.32)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: t.husk }}>{m.diary}</span>
          <span style={{ fontSize: 9.5, fontWeight: 600, color: t.ink, fontVariantNumeric: 'tabular-nums' }}>{m.total}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {diary.map((r) => (
            <div key={r.name} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: r.result ? t.palm : t.sand, marginTop: 4, flexShrink: 0 }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: t.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</span>
                  <span style={{ fontSize: 9, color: t.husk, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{r.time}</span>
                </div>
                <div style={{ fontSize: 9, lineHeight: 1.35, marginTop: 1, color: r.result ? t.husk : t.coral }}>
                  {r.result ?? m.ask}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScreenFrame>
  );
}

Object.assign(window, {
  withAlpha, ScreenFrame, CCVMock, VTextMock, FloFiMock, SwitcherMock, TelesuflerMock,
  OnitMock,
});
