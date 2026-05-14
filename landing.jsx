// Kelappa Landing — main page composition

const { useState: useStateL } = React;

// ── Reusable: smile underline under any inline span ────────
function SmileSpan({ children, color, height = 18 }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
      {children}
      <svg viewBox="0 0 160 24" preserveAspectRatio="none" style={{ position: 'absolute', left: -4, right: -4, bottom: -(height * 0.5), width: 'calc(100% + 8px)', height, overflow: 'visible' }}>
        <path d="M2 6 Q 80 26 158 6" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// ── Section shell ─────────────────────────────────────────
function Sec({ bg, color, children, pad = '120px 40px', id }) {
  return (
    <section id={id} style={{ background: bg, color, padding: pad, position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {children}
      </div>
    </section>
  );
}

function Eyebrow({ children, color }) {
  return (
    <div style={{ fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>{children}</div>
  );
}

function H({ children, size = 72, color, weight = 700, ls = '-0.035em', lh = 1.02, style = {} }) {
  return (
    <h2 style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: weight, fontSize: size, letterSpacing: ls, lineHeight: lh, color, margin: 0, ...style }}>{children}</h2>
  );
}

// ── NAV ────────────────────────────────────────────────────
function Nav({ t, copy, lang, setLang }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? `${t.cream}f2` : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? `1px solid ${t.sand}` : '1px solid transparent',
      transition: 'all 200ms ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <a href="#top" style={{ textDecoration: 'none' }}>
          <KelappaLogo size={22} fg={t.ink} mark={KELAPPA_BROWN} dots={t.cream} accent={t.coral} gap={10} />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginLeft: 'auto' }}>
          {/* Lang toggle */}
          <div style={{ display: 'flex', background: t.shell, borderRadius: 999, padding: 3, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11.5, fontWeight: 600 }}>
            {['en', 'ru'].map((L) => (
              <button key={L} onClick={() => setLang(L)} style={{
                border: 'none', cursor: 'pointer',
                padding: '5px 10px', borderRadius: 999,
                background: lang === L ? t.cream : 'transparent',
                color: lang === L ? t.ink : t.husk,
                boxShadow: lang === L ? '0 1px 2px rgba(80,40,10,0.12)' : 'none',
                fontFamily: 'inherit', fontWeight: 600, fontSize: 'inherit',
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>{L}</button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ── HERO ───────────────────────────────────────────────────
function Hero({ t, copy }) {
  const apps = [
    { bg: KELAPPA_BROWN,  mark: t.cream,       dots: KELAPPA_BROWN, name: 'CCV'             },
    { bg: t.coral,        mark: t.cream,       dots: t.coral,       name: 'VText'           },
    { bg: t.lagoon,       mark: KELAPPA_BROWN, dots: t.cream,       name: 'FloFi'           },
    { bg: t.saffron,      mark: KELAPPA_BROWN, dots: t.cream,       name: 'En-Ru Switcher'  },
  ];
  return (
    <Sec bg={t.cream} color={t.ink} pad="80px 40px 100px" id="top">
      {/* gradient blobs */}
      <div style={{ position: 'absolute', right: -200, top: -100, width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, ${t.saffron}, ${t.coral} 50%, transparent 72%)`, opacity: 0.55, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: -180, bottom: -240, width: 460, height: 460, borderRadius: '50%', background: `radial-gradient(circle at 40% 40%, ${t.lagoon}, transparent 70%)`, opacity: 0.4, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 920 }}>
        <h1 style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 700, fontSize: 'clamp(48px, 7vw, 96px)', letterSpacing: '-0.04em', lineHeight: 0.98, color: t.ink, margin: 0 }}>
          {copy.hero.h_pre}{' '}
          <span style={{ whiteSpace: 'nowrap' }}>
            <SmileSpan color={t.coral} height={22}>{copy.hero.h_hl}</SmileSpan>{copy.hero.h_post}
          </span>
        </h1>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 19, lineHeight: 1.55, color: t.husk, marginTop: 36, maxWidth: 640 }}>
          {copy.hero.sub}
        </p>
        <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#apps" style={{
            background: KELAPPA_BROWN, color: t.cream, fontSize: 15, padding: '15px 24px',
            borderRadius: 999, textDecoration: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500, whiteSpace: 'nowrap',
          }}>{copy.hero.cta_primary} →</a>
          <a href="#manifesto" style={{
            border: `1px solid ${t.husk}40`, color: t.ink, fontSize: 15, padding: '15px 24px',
            borderRadius: 999, textDecoration: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500, whiteSpace: 'nowrap',
          }}>{copy.hero.cta_secondary}</a>
        </div>
      </div>

      {/* app strip */}
      <div style={{ position: 'relative', marginTop: 96 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: t.husk, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, marginBottom: 18 }}>
          {copy.hero.strip_label}
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {apps.map((a) => (
            <div key={a.name} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: `${t.cream}`, border: `1px solid ${t.sand}`,
              borderRadius: 16, padding: 12, minWidth: 200, flex: '1 0 200px',
            }}>
              <FinalIcon size={56} bg={a.bg} mark={a.mark} dots={a.dots} />
              <div>
                <div style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600, fontSize: 17, color: t.ink, letterSpacing: '-0.02em' }}>{a.name}</div>
                <div style={{ fontSize: 11, color: t.husk, letterSpacing: '0.04em', marginTop: 2 }}>App Store</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sec>
  );
}

// ── MANIFESTO ─────────────────────────────────────────────
function Manifesto({ t, copy }) {
  return (
    <Sec bg={t.shell} color={t.ink} id="manifesto">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
        <div>
          <Eyebrow color={t.husk}>{copy.manifesto.eyebrow}</Eyebrow>
          <H color={t.ink} size={54} style={{ marginTop: 16 }}>{copy.manifesto.h}</H>
        </div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 19, lineHeight: 1.6, color: t.ink }}>
          <p style={{ margin: '0 0 22px' }}>{copy.manifesto.p1}</p>
          <p style={{ margin: 0 }}>{copy.manifesto.p2}</p>
        </div>
      </div>
    </Sec>
  );
}

// ── PRINCIPLES ────────────────────────────────────────────
function Principles({ t, copy }) {
  return (
    <Sec bg={t.cream} color={t.ink} id="principles">
      <div style={{ maxWidth: 800, marginBottom: 64 }}>
        <Eyebrow color={t.husk}>{copy.principles.eyebrow}</Eyebrow>
        <H color={t.ink} size={56} style={{ marginTop: 16 }}>{copy.principles.h}</H>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {copy.principles.items.map((p, i) => (
          <div key={p.n} style={{
            background: i === 0 ? KELAPPA_BROWN : t.shell,
            color: i === 0 ? t.cream : t.ink,
            borderRadius: 22, padding: '28px 28px 32px',
            display: 'flex', flexDirection: 'column', gap: 14, minHeight: 240,
          }}>
            <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, opacity: 0.6, letterSpacing: '0.04em' }}>{p.n}</div>
            <div style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600, fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{p.title}</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, lineHeight: 1.55, opacity: i === 0 ? 0.85 : 0.7, marginTop: 'auto' }}>{p.body}</div>
          </div>
        ))}
      </div>
    </Sec>
  );
}

// ── APPS ──────────────────────────────────────────────────
function AppsSection({ t, copy }) {
  const mocks = [CCVMock, VTextMock, FluffyMock, SwitcherMock];
  const bgs   = ['husk',  'coral', 'lagoon', 'saffron'];
  const marks = ['cream', 'cream', 'brown',  'brown'];
  const dots  = ['husk',  'coral', 'cream',  'cream'];

  const resolve = (key) => key === 'brown' ? KELAPPA_BROWN : t[key];

  return (
    <Sec bg={t.cream} color={t.ink} id="apps">
      <div style={{ maxWidth: 780, marginBottom: 64 }}>
        <Eyebrow color={t.husk}>{copy.apps.eyebrow}</Eyebrow>
        <H color={t.ink} size={56} style={{ marginTop: 16 }}>{copy.apps.h}</H>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, lineHeight: 1.55, color: t.husk, marginTop: 22 }}>{copy.apps.sub}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {copy.apps.items.map((a, i) => {
          const Mock = mocks[i];
          const reverse = i % 2 === 1;
          return (
            <div key={a.name} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60,
              background: t.shell, borderRadius: 28, padding: '48px 56px',
              alignItems: 'center',
            }}>
              <div style={{ order: reverse ? 2 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                  <FinalIcon size={72} bg={resolve(bgs[i])} mark={resolve(marks[i])} dots={resolve(dots[i])} />
                  <div>
                    <div style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600, fontSize: 28, color: t.ink, letterSpacing: '-0.025em' }}>{a.name}</div>
                    <div style={{ fontSize: 11.5, color: t.husk, letterSpacing: '0.04em', marginTop: 2 }}>{a.sub}</div>
                  </div>
                </div>
                <div style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 600, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.025em', color: t.ink }}>
                  {a.tagline}
                </div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, lineHeight: 1.6, color: t.husk, marginTop: 18, maxWidth: 480 }}>{a.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 26, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {a.platforms.map((p) => (
                      <span key={p} style={{ fontSize: 11, padding: '5px 11px', borderRadius: 999, background: t.cream, color: t.husk, border: `1px solid ${t.sand}`, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}>{p}</span>
                    ))}
                  </div>
                  <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: a.status === 'Available' || a.status === 'Доступно' ? t.palm : t.husk, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>{a.status}</span>
                </div>
                <a href="#" style={{
                  display: 'inline-block', marginTop: 22,
                  background: KELAPPA_BROWN, color: t.cream, fontSize: 14, padding: '12px 20px',
                  borderRadius: 999, textDecoration: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500, whiteSpace: 'nowrap',
                }}>{copy.apps.cta} →</a>
              </div>
              <div style={{ order: reverse ? 1 : 2, display: 'flex', justifyContent: 'center' }}>
                <Mock t={t} />
              </div>
            </div>
          );
        })}
      </div>
    </Sec>
  );
}

// ── STUDIO ────────────────────────────────────────────────
function Studio({ t, copy }) {
  return (
    <Sec bg={KELAPPA_BROWN} color={t.cream} id="studio">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'center' }}>
        {/* photo placeholder */}
        <div style={{ aspectRatio: '4/5', background: `linear-gradient(140deg, ${t.saffron}, ${t.coral} 60%, ${t.husk})`, borderRadius: 22, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, color: t.cream, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <MarkDots size={88} ring={t.cream} fill={t.cream} dots={KELAPPA_BROWN} ringWidth={0.01} dotR={5} />
            <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.85 }}>Studio photo · placeholder</div>
          </div>
        </div>
        <div>
          <Eyebrow color={t.saffron}>{copy.studio.eyebrow}</Eyebrow>
          <H color={t.cream} size={56} style={{ marginTop: 16 }}>{copy.studio.h}</H>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, lineHeight: 1.6, color: t.cream, opacity: 0.85, marginTop: 26 }}>{copy.studio.p}</p>
          <p style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 500, fontSize: 22, lineHeight: 1.4, letterSpacing: '-0.015em', color: t.coral, marginTop: 22 }}>{copy.studio.p2}</p>
        </div>
      </div>
    </Sec>
  );
}

// ── CTA ───────────────────────────────────────────────────
function CtaSection({ t, copy }) {
  return (
    <Sec bg={t.cream} color={t.ink} id="cta" pad="140px 40px 140px">
      <div style={{ position: 'absolute', right: -100, top: -80, width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle at 40% 40%, ${t.saffron}, ${t.coral} 55%, transparent 75%)`, opacity: 0.4, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 840, textAlign: 'center', margin: '0 auto' }}>
        <Eyebrow color={t.husk}>{copy.cta.eyebrow}</Eyebrow>
        <h2 style={{ fontFamily: "'Hanken Grotesque', sans-serif", fontWeight: 700, fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: '-0.04em', lineHeight: 1.02, color: t.ink, margin: '20px 0 0' }}>
          {copy.cta.h_pre}{' '}
          <span style={{ whiteSpace: 'nowrap' }}>
            <SmileSpan color={t.coral} height={20}>{copy.cta.h_hl}</SmileSpan>{copy.cta.h_post}
          </span>
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, lineHeight: 1.55, color: t.husk, marginTop: 28, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>{copy.cta.sub}</p>
        <a href="#" style={{
          display: 'inline-block', marginTop: 36,
          background: KELAPPA_BROWN, color: t.cream, fontSize: 16, padding: '17px 28px',
          borderRadius: 999, textDecoration: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 500, whiteSpace: 'nowrap',
        }}>{copy.cta.btn} →</a>
      </div>
    </Sec>
  );
}

// ── FOOTER ────────────────────────────────────────────────
function Footer({ t, copy }) {
  return (
    <footer style={{ background: t.ink, color: t.cream, padding: '80px 40px 40px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 40, paddingBottom: 60, borderBottom: `1px solid ${t.cream}20` }}>
          <div>
            <KelappaLogo size={28} fg={t.cream} mark={t.cream} dots={t.ink} accent={t.coral} gap={12} />
            <p style={{ fontSize: 14, lineHeight: 1.55, color: t.cream, opacity: 0.7, marginTop: 22, maxWidth: 320 }}>{copy.footer.tag}</p>
          </div>
          {copy.footer.cols.map((col) => (
            <div key={col.h}>
              <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 600 }}>{col.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.l.map((item) => (
                  <li key={item}><a href="#" style={{ color: t.cream, opacity: 0.85, textDecoration: 'none', fontSize: 14.5 }}>{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: t.cream, opacity: 0.55 }}>
          <span>{copy.footer.legal}</span>
          <span>v1.0</span>
        </div>
      </div>
    </footer>
  );
}

// ── PAGE ROOT ─────────────────────────────────────────────
function Landing({ t }) {
  const [lang, setLang] = React.useState('en');
  const copy = COPY[lang];
  return (
    <div style={{ background: t.cream, color: t.ink, minHeight: '100vh' }}>
      <Nav t={t} copy={copy} lang={lang} setLang={setLang} />
      <Hero t={t} copy={copy} />
      <Manifesto t={t} copy={copy} />
      <AppsSection t={t} copy={copy} />
      <CtaSection t={t} copy={copy} />
      <Footer t={t} copy={copy} />
    </div>
  );
}

Object.assign(window, { Landing, SmileSpan });
