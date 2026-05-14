// ─────────────────────────────────────────────────────────────
// Kelappa — final canonical logo
// Husk-brown coconut disc + 3 cream dots + "kelappa" in Hanken Grotesk
// with coral smile-curve under "app".
// ─────────────────────────────────────────────────────────────

const KELAPPA_BROWN  = 'oklch(0.460 0.060 55)';
const KELAPPA_CREAM  = 'oklch(0.965 0.014 82)';
const KELAPPA_INK    = 'oklch(0.225 0.020 60)';

// The smile — clears descenders, anchored to the "app" span.
function KelappaSmile({ color, height = 40 }) {
  return (
    <svg viewBox="0 0 160 40" preserveAspectRatio="none"
      style={{ position: 'absolute', left: -8, right: -8,
               bottom: -(height * 0.9),
               width: 'calc(100% + 16px)', height, overflow: 'visible' }}>
      <path d="M2 8 Q 80 38 158 8" stroke={color}
        strokeWidth={Math.max(3, height * 0.18)} fill="none" strokeLinecap="round" />
    </svg>
  );
}

// The full lockup. `size` = wordmark fontSize in px.
// variant: 'horizontal' | 'mark-only' | 'word-only' | 'stacked'
function KelappaLogo({
  size = 96,
  fg = KELAPPA_INK,
  mark = KELAPPA_BROWN,
  dots = KELAPPA_CREAM,
  accent,                        // coral, required
  variant = 'horizontal',
  gap,
  capital = true,                // K vs k
}) {
  const markSize = size * 1.18;
  const realGap = gap ?? size * 0.28;
  const smileH = Math.max(28, size * 0.45);

  const word = (
    <span style={{
      position: 'relative', display: 'inline-block',
      fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600,
      fontSize: size, letterSpacing: '-0.025em', color: fg, lineHeight: 0.9,
    }}>
      <span>{capital ? 'Kel' : 'kel'}</span>
      <span style={{ position: 'relative', display: 'inline-block' }}>
        app
        {accent && <KelappaSmile color={accent} height={smileH} />}
      </span>
      <span>a</span>
    </span>
  );

  const markEl = (
    <MarkDots size={markSize} ring={mark} fill={mark} dots={dots}
      ringWidth={0.01} dotR={Math.max(3, markSize * 0.05)} />
  );

  if (variant === 'mark-only') return markEl;
  if (variant === 'word-only') return word;

  return (
    <span style={{
      display: 'inline-flex',
      flexDirection: variant === 'stacked' ? 'column' : 'row',
      alignItems: 'center',
      gap: variant === 'stacked' ? size * 0.35 : realGap,
    }}>
      {markEl}
      {word}
    </span>
  );
}

Object.assign(window, {
  KELAPPA_BROWN, KELAPPA_CREAM, KELAPPA_INK,
  KelappaLogo, KelappaSmile,
});
