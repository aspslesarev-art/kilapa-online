// Kelappa — Logo v3: keep the circle-with-three-dots concept,
// fix the pairing. Vary mark color, type, weight, layout.

// ── Mark, refined ──────────────────────────────────────────
// Cleaner geometry, configurable color triplet, no extra inner ring.
function MarkDots({
  size = 120,
  ring = '#3a2618',
  fill = '#f6efe2',
  dots = '#3a2618',
  ringWidth = 8,            // in viewBox units (out of 120)
  dotR = 5,
  // dot layout: 'top' (top trio, like a face / actual coconut eyes)
  //             'tri' (equilateral triangle, more graphic)
  layout = 'top',
  // optional inner halo
  noRing = false,
}) {
  const r = 60 - ringWidth / 2;
  const positions = layout === 'top'
    ? [[48, 46], [72, 46], [60, 62]]
    : [[60, 42], [46, 70], [74, 70]];
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ display: 'block' }}>
      {!noRing && <circle cx="60" cy="60" r={r} fill={fill} stroke={ring} strokeWidth={ringWidth} />}
      {noRing && <circle cx="60" cy="60" r="56" fill={fill} />}
      {positions.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={dotR} fill={dots} />
      ))}
    </svg>
  );
}

// ── Pairing card ──────────────────────────────────────────
// Shows a single mark + wordmark pairing, with small-size variants below.
function Pairing({
  letter,                    // "A", "B", ...
  bg, fg, accent,
  mark,                      // <MarkDots ... /> props object
  wordFont,                  // CSS font-family
  wordWeight = 600,
  wordTracking = '-0.025em',
  wordItalic = false,
  wordTransform = 'lowercase',  // 'lowercase' | 'uppercase' | 'none'
  wordSize = 72,
  gap,
  stacked = false,
  markScale = 1,             // multiplier vs wordSize for mark size
  asPeriod = false,          // mark sits AFTER the word as a period
  note,
  fontName,
}) {
  const markSize = wordSize * 1.15 * markScale;
  const realGap = gap ?? (asPeriod ? wordSize * 0.08 : wordSize * 0.22);
  const wordStyle = {
    fontFamily: wordFont,
    fontWeight: wordWeight,
    fontStyle: wordItalic ? 'italic' : 'normal',
    fontSize: wordSize,
    letterSpacing: wordTracking,
    color: fg,
    textTransform: wordTransform,
    lineHeight: 0.9,
    display: 'inline-block',
  };

  return (
    <div style={{ width: '100%', height: '100%', background: bg, color: fg, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 22px', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.55 }}>
        <span>{letter}</span>
        <span>{fontName}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 28px' }}>
        <div style={{ display: 'inline-flex', alignItems: stacked ? 'center' : 'center', flexDirection: stacked ? 'column' : 'row', gap: realGap }}>
          {!asPeriod && <MarkDots size={markSize} {...mark} />}
          <span style={wordStyle}>kelappa{asPeriod && <MarkDots size={wordSize * 0.32} {...mark} />}</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 22px 18px', gap: 12 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <MarkDots size={26} {...mark} />
          <MarkDots size={18} {...mark} />
          <div style={{ height: 22, width: 1, background: fg, opacity: 0.18 }} />
          <span style={{ ...wordStyle, fontSize: 18 }}>kelappa</span>
        </div>
        <div style={{ fontSize: 10.5, opacity: 0.6, textAlign: 'right', maxWidth: 200, lineHeight: 1.4 }}>{note}</div>
      </div>
    </div>
  );
}

Object.assign(window, { MarkDots, Pairing });
