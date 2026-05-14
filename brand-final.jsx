// ─────────────────────────────────────────────────────────────
// Kelappa — final brand applications
// All built on the canonical KelappaLogo (brown disc + 3 cream dots
// + Hanken Grotesk "kelappa" + coral smile under "app").
// ─────────────────────────────────────────────────────────────

// ── Cover ───────────────────────────────────────────────────
function FinalCover({ t }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: t.cream, color: t.ink,
      padding: '72px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      position: 'relative', overflow: 'hidden', fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{ position: 'absolute', right: -160, top: -160, width: 480, height: 480, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${t.saffron}, ${t.coral} 60%, transparent 78%)`, opacity: 0.65 }} />
      <div style={{ position: 'absolute', left: -100, bottom: -160, width: 360, height: 360, borderRadius: '50%', background: `radial-gradient(circle at 40% 40%, ${t.lagoon}, transparent 70%)`, opacity: 0.50 }} />

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk }}>
          Brand identity · final
        </div>
        <div style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk, textAlign: 'right' }}>
          Ubud · Denpasar<br/>est. 2026
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <KelappaLogo size={150} fg={t.ink} mark={KELAPPA_BROWN} dots={t.cream} accent={t.coral} />
        <div style={{ marginTop: 40, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 30, lineHeight: 1.2, color: t.husk, maxWidth: 720, letterSpacing: '-0.015em' }}>
          A small studio crafting calm, careful apps for&nbsp;Mac,&nbsp;iPhone and&nbsp;Apple&nbsp;Watch — from a&nbsp;warm corner of the&nbsp;tropics.
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.husk }}>
        <span>kelappa.studio</span>
        <span>—— Identity v1.0</span>
      </div>
    </div>
  );
}

// ── Logo system board ───────────────────────────────────────
function FinalLogoSystem({ t }) {
  const tiles = [
    { bg: t.cream,        fg: t.ink,    mark: KELAPPA_BROWN, dots: t.cream, accent: t.coral, name: 'Primary',     note: 'On cream' },
    { bg: t.shell,        fg: t.ink,    mark: KELAPPA_BROWN, dots: t.cream, accent: t.coral, name: 'On shell',    note: 'Surfaces' },
    { bg: KELAPPA_BROWN,  fg: t.cream,  mark: t.cream,       dots: KELAPPA_BROWN, accent: t.coral, name: 'On husk', note: 'Cards · packaging' },
    { bg: t.coral,        fg: t.cream,  mark: t.cream,       dots: t.coral, accent: t.cream, name: 'On coral',    note: 'Stamp · accent' },
    { bg: t.ink,          fg: t.cream,  mark: t.cream,       dots: t.ink,   accent: t.coral, name: 'Dark',        note: 'Inverted' },
    { bg: t.lagoon,       fg: t.ink,    mark: KELAPPA_BROWN, dots: t.cream, accent: t.coral, name: 'On lagoon',   note: 'Editorial' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: t.cream, color: t.ink, padding: '36px 40px', fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk }}>01 — Logo</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 6 }}>One mark. Six surfaces.</div>
        </div>
        <div style={{ fontSize: 12, color: t.husk, textAlign: 'right', maxWidth: 320, lineHeight: 1.5 }}>
          Husk-brown disc, three cream dots, coral smile under <em>app</em>. That's the system.
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 14 }}>
        {tiles.map((tile) => (
          <div key={tile.name} style={{
            background: tile.bg, color: tile.fg, borderRadius: 18, padding: 20,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            border: tile.bg === t.cream ? `1px solid ${t.sand}` : 'none',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.6 }}>
              <span>{tile.name}</span>
              <span>{tile.note}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 18 }}>
              <KelappaLogo size={52} fg={tile.fg} mark={tile.mark} dots={tile.dots} accent={tile.accent} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── App icons — all built around the disc + dots ────────────
function FinalIcon({ size = 200, bg, mark, dots, radius, smile = false, accent }) {
  const r = radius ?? size * 0.225;
  return (
    <div style={{
      width: size, height: size, borderRadius: r, background: bg,
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 28px -12px rgba(80,40,10,0.25)',
    }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MarkDots size={size * 0.62} ring={mark} fill={mark} dots={dots} ringWidth={0.01} dotR={size * 0.62 * 0.054} />
      </div>
      {smile && (
        <svg viewBox="0 0 100 30" style={{ position: 'absolute', left: '20%', right: '20%', bottom: '12%', width: '60%', height: '14%' }}>
          <path d="M4 6 Q 50 30 96 6" stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

function FinalAppIcons({ t }) {
  return (
    <div style={{ width: '100%', height: '100%', background: t.cream, color: t.ink, padding: '36px 40px', fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk }}>02 — App icons</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 6 }}>One DNA. Three shapes.</div>
        </div>
        <div style={{ fontSize: 12, color: t.husk, textAlign: 'right', maxWidth: 320, lineHeight: 1.5 }}>
          macOS squircle. iOS squircle. watchOS circle.<br/>The disc-and-dots reads from 1024px to 16px.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, flex: 1 }}>

        {/* macOS */}
        <div style={{ background: t.shell, borderRadius: 22, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <div style={{ alignSelf: 'flex-start', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk }}>macOS · 1024</div>
          <FinalIcon size={220} bg={t.cream} mark={KELAPPA_BROWN} dots={t.cream} smile accent={t.coral} />
          <div style={{ display: 'flex', gap: 12 }}>
            <FinalIcon size={64} bg={t.cream}  mark={KELAPPA_BROWN} dots={t.cream} />
            <FinalIcon size={48} bg={t.cream}  mark={KELAPPA_BROWN} dots={t.cream} />
            <FinalIcon size={32} bg={t.cream}  mark={KELAPPA_BROWN} dots={t.cream} />
          </div>
          <div style={{ marginTop: 'auto', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 18, color: t.ink }}>The Studio</div>
            <div style={{ fontSize: 11, color: t.husk }}>Primary brand icon</div>
          </div>
        </div>

        {/* iOS */}
        <div style={{ background: t.shell, borderRadius: 22, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <div style={{ alignSelf: 'flex-start', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk }}>iOS · 1024</div>
          <FinalIcon size={220} bg={t.coral} mark={t.cream} dots={t.coral} />
          <div style={{ display: 'flex', gap: 12 }}>
            <FinalIcon size={64} bg={t.coral}   mark={t.cream}      dots={t.coral} />
            <FinalIcon size={64} bg={KELAPPA_BROWN} mark={t.cream}  dots={KELAPPA_BROWN} />
            <FinalIcon size={64} bg={t.saffron}  mark={t.cream}     dots={t.saffron} />
          </div>
          <div style={{ marginTop: 'auto', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 18, color: t.ink }}>Color variants</div>
            <div style={{ fontSize: 11, color: t.husk }}>Each app picks one tone</div>
          </div>
        </div>

        {/* watchOS */}
        <div style={{ background: t.shell, borderRadius: 22, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <div style={{ alignSelf: 'flex-start', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk }}>watchOS · circle</div>
          <FinalIcon size={220} radius={110} bg={t.cream} mark={KELAPPA_BROWN} dots={t.cream} />
          <div style={{ display: 'flex', gap: 12 }}>
            <FinalIcon size={64} radius={32} bg={t.cream}  mark={KELAPPA_BROWN} dots={t.cream} />
            <FinalIcon size={64} radius={32} bg={t.coral}  mark={t.cream}       dots={t.coral} />
            <FinalIcon size={64} radius={32} bg={t.lagoon} mark={KELAPPA_BROWN} dots={t.cream} />
          </div>
          <div style={{ marginTop: 'auto', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 18, color: t.ink }}>On the wrist</div>
            <div style={{ fontSize: 11, color: t.husk }}>Same DNA, circular crop</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Web hero ────────────────────────────────────────────────
function FinalWebHero({ t }) {
  return (
    <div style={{ width: '100%', height: '100%', background: t.cream, color: t.ink, fontFamily: "'Plus Jakarta Sans', sans-serif", position: 'relative', overflow: 'hidden' }}>
      {/* nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 36px', position: 'relative', zIndex: 2 }}>
        <KelappaLogo size={22} fg={t.ink} mark={KELAPPA_BROWN} dots={t.cream} accent={t.coral} gap={10} />
        <div style={{ display: 'flex', gap: 28, fontSize: 13, color: t.ink }}>
          <span>Apps</span><span>Studio</span><span>Journal</span><span>Contact</span>
        </div>
        <div style={{ background: KELAPPA_BROWN, color: t.cream, fontSize: 12, padding: '10px 18px', borderRadius: 999 }}>Hire us</div>
      </div>

      <div style={{ position: 'absolute', right: -200, top: -140, width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, ${t.saffron}, ${t.coral} 55%, transparent 75%)`, opacity: 0.75 }} />
      <div style={{ position: 'absolute', left: -100, bottom: -160, width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle at 40% 40%, ${t.lagoon}, transparent 70%)`, opacity: 0.45 }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '36px 56px 0', maxWidth: 760 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk }}>A studio of three · Bali</div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 76, lineHeight: 1.02, marginTop: 14, letterSpacing: '-0.035em', color: t.ink }}>
          Calm apps for the&nbsp;<span style={{ position: 'relative', display: 'inline-block' }}>
            ones you already&nbsp;own
            <svg viewBox="0 0 200 14" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: -10, width: '100%', height: 14, overflow: 'visible' }}>
              <path d="M2 4 Q 100 16 198 4" stroke={t.coral} strokeWidth="6" fill="none" strokeLinecap="round" />
            </svg>
          </span>.
        </div>
        <div style={{ fontSize: 17, lineHeight: 1.5, color: t.husk, marginTop: 32, maxWidth: 540 }}>
          Mac. iPhone. Apple Watch. Small, considered software shipped from a slow corner of the tropics — for people who would rather have one good tool than ten loud ones.
        </div>
        <div style={{ marginTop: 30, display: 'flex', gap: 12 }}>
          <div style={{ background: KELAPPA_BROWN, color: t.cream, fontSize: 14, padding: '14px 22px', borderRadius: 999 }}>See our apps →</div>
          <div style={{ border: `1px solid ${t.husk}40`, color: t.ink, fontSize: 14, padding: '14px 22px', borderRadius: 999 }}>Read the journal</div>
        </div>
      </div>

      {/* product strip */}
      <div style={{ position: 'absolute', left: 56, right: 56, bottom: 36, display: 'flex', gap: 14, zIndex: 2 }}>
        {[
          { bg: t.cream,        mark: KELAPPA_BROWN, dots: t.cream,       name: 'Coconut',  meta: 'Notes · macOS' },
          { bg: t.coral,        mark: t.cream,       dots: t.coral,       name: 'Matahari', meta: 'Daylight · iOS' },
          { bg: t.saffron,      mark: t.cream,       dots: t.saffron,     name: 'Pohon',    meta: 'Habits · watchOS' },
          { bg: KELAPPA_BROWN,  mark: t.cream,       dots: KELAPPA_BROWN, name: 'Kawan',    meta: 'Messaging · iOS' },
        ].map((p) => (
          <div key={p.name} style={{ flex: 1, background: `${t.cream}cc`, backdropFilter: 'blur(6px)', borderRadius: 14, padding: 12, display: 'flex', gap: 12, alignItems: 'center', border: `1px solid ${t.sand}` }}>
            <FinalIcon size={56} bg={p.bg} mark={p.mark} dots={p.dots} />
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 17, color: t.ink, letterSpacing: '-0.02em' }}>{p.name}</div>
              <div style={{ fontSize: 11, color: t.husk, letterSpacing: '0.04em' }}>{p.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Business cards ──────────────────────────────────────────
function FinalCardFront({ t }) {
  return (
    <div style={{ width: '100%', height: '100%', background: KELAPPA_BROWN, color: t.cream, position: 'relative', overflow: 'hidden', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ position: 'absolute', right: -50, bottom: -50, width: 240, height: 240, borderRadius: '50%', background: `radial-gradient(circle, ${t.saffron}aa 0%, transparent 70%)`, opacity: 0.45 }} />
      <div style={{ position: 'relative', padding: 28, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <MarkDots size={58} ring={t.cream} fill={t.cream} dots={KELAPPA_BROWN} ringWidth={0.01} dotR={3.5} />
        <div>
          <KelappaLogo size={40} fg={t.cream} mark={t.cream} dots={KELAPPA_BROWN} accent={t.coral} variant="word-only" />
          <div style={{ fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.7, marginTop: 8 }}>App studio · Bali</div>
        </div>
      </div>
    </div>
  );
}
function FinalCardBack({ t }) {
  return (
    <div style={{ width: '100%', height: '100%', background: t.cream, color: t.ink, position: 'relative', overflow: 'hidden', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ padding: 28, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em' }}>Nyoman Putri</div>
          <div style={{ fontSize: 12, color: t.husk, marginTop: 2 }}>Founder · Designer</div>
        </div>
        <div style={{ fontSize: 11.5, lineHeight: 1.7, color: t.ink }}>
          nyoman@kelappa.studio<br/>
          +62 361 555 0124<br/>
          Jl. Raya Ubud · Bali<br/>
          kelappa.studio
        </div>
      </div>
    </div>
  );
}

// ── Watch face ──────────────────────────────────────────────
function FinalWatchFace({ t }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ width: 230, height: 280, borderRadius: 56, background: 'linear-gradient(180deg, #2a2a2a, #0e0e0e)', padding: 14, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 42, background: '#000', overflow: 'hidden', position: 'relative', color: t.cream }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 80% 15%, ${t.coral}55, transparent 55%), radial-gradient(circle at 20% 90%, ${t.lagoon}40, transparent 60%)` }} />
          <div style={{ position: 'relative', padding: '20px 18px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600 }}>
              <span style={{ color: t.coral }}>Thu 14</span>
              <span>9:41</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MarkDots size={64} ring={t.cream} fill={t.cream} dots={'#0a0a0a'} ringWidth={0.01} dotR={3.5} />
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 26, marginTop: 8, letterSpacing: '-0.02em' }}>Pagi.</div>
              <div style={{ fontSize: 10, color: '#bbb', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 2 }}>Sunrise 06:12</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: t.coral, opacity: 0.7 }} />
              <div style={{ color: '#888' }}>27° · sunny</div>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: t.palm, opacity: 0.7 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stationery / In the wild board ─────────────────────────
function FinalStationery({ t }) {
  return (
    <div style={{ width: '100%', height: '100%', background: t.cream, color: t.ink, padding: '36px 40px', fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk }}>03 — In the wild</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 6 }}>How the brand lives.</div>
        </div>
        <div style={{ fontSize: 12, color: t.husk, textAlign: 'right', maxWidth: 320, lineHeight: 1.5 }}>
          A coconut, a smile, a calm sans.<br/>That is the entire system.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gridTemplateRows: '1fr 1fr', gap: 18, flex: 1 }}>
        <div style={{ gridRow: '1 / span 2', borderRadius: 22, overflow: 'hidden', border: `1px solid ${t.sand}`, position: 'relative' }}>
          <FinalWebHero t={t} />
          <div style={{ position: 'absolute', left: 16, bottom: 16, fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk, background: `${t.cream}cc`, padding: '4px 10px', borderRadius: 999 }}>kelappa.studio</div>
        </div>

        <div style={{ borderRadius: 22, background: t.shell, padding: 22, display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 14, left: 18, fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk }}>Cards</div>
          <div style={{ width: 170, height: 102, borderRadius: 8, overflow: 'hidden', boxShadow: '0 14px 28px -10px rgba(80,40,10,0.30)', transform: 'rotate(-3deg)' }}>
            <FinalCardFront t={t} />
          </div>
          <div style={{ width: 170, height: 102, borderRadius: 8, overflow: 'hidden', boxShadow: '0 14px 28px -10px rgba(80,40,10,0.30)', transform: 'rotate(2deg)' }}>
            <FinalCardBack t={t} />
          </div>
        </div>

        <div style={{ borderRadius: 22, background: t.sand, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 14, left: 18, fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: t.husk, zIndex: 2 }}>watchOS face</div>
          <FinalWatchFace t={t} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  FinalCover, FinalLogoSystem, FinalAppIcons, FinalWebHero,
  FinalCardFront, FinalCardBack, FinalWatchFace, FinalStationery,
  FinalIcon,
});
