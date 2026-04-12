import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const S = `
  :root {
    --bg: #FAF8F4;
    --surface: #FFFFFF;
    --surface2: #F0EDE8;
    --border: #E2DDD6;
    --sage: #7C9E8B;
    --sage-light: #EAF0EC;
    --sage-dark: #4A6B58;
    --clay: #C4714A;
    --clay-light: #F5EDE8;
    --cream: #FAF8F4;
    --amber: #C47D10;
    --ink: #1C2320;
    --ink-muted: #5A6660;
    --ink-dim: #8A9490;
    --white: #FFFFFF;
  }

  .landing {
    background: var(--bg);
    color: var(--ink);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    padding: 18px 48px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid transparent;
    transition: all 0.3s;
  }
  .nav.scrolled {
    background: rgba(250,248,244,0.95);
    backdrop-filter: blur(12px);
    border-bottom-color: var(--border);
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-size: 20px; font-weight: 700;
    color: var(--ink); letter-spacing: -0.5px;
  }
  .nav-links { display: flex; align-items: center; gap: 28px; }
  .nav-link {
    font-size: 14px; color: var(--ink-muted);
    text-decoration: none; transition: color 0.15s;
    background: none; border: none; cursor: pointer;
    font-family: 'Epilogue', sans-serif;
  }
  .nav-link:hover { color: var(--ink); }
  .nav-cta {
    background: var(--sage-dark); color: white;
    padding: 8px 20px; border-radius: 8px;
    font-size: 13px; font-weight: 500;
    border: none; cursor: pointer;
    font-family: 'Epilogue', sans-serif;
    transition: background 0.15s;
  }
  .nav-cta:hover { background: var(--sage); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 120px 24px 80px;
    position: relative;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,158,139,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 80% 70%, rgba(196,113,74,0.08) 0%, transparent 50%);
  }

  .hero-grid {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.04;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(124,158,139,0.12);
    border: 1px solid rgba(124,158,139,0.3);
    border-radius: 20px; padding: 6px 16px;
    font-size: 12px; color: var(--sage);
    font-weight: 500; letter-spacing: 0.3px;
    margin-bottom: 28px;
    animation: fadeUp 0.6s ease both;
  }
  .badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--sage);
    animation: pulse 2s infinite;
  }

  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(42px, 7vw, 80px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -2px;
    color: var(--ink);
    max-width: 800px;
    margin-bottom: 24px;
    animation: fadeUp 0.6s ease 0.1s both;
  }
  .hero-title .accent { color: var(--sage-dark); }
  .hero-title .accent-clay { color: var(--clay); }

  .hero-sub {
    font-size: 18px; color: var(--ink-muted);
    max-width: 520px; line-height: 1.7;
    margin-bottom: 52px;
    animation: fadeUp 0.6s ease 0.2s both;
    font-weight: 300;
  }

  .hero-ctas {
    display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
    animation: fadeUp 0.6s ease 0.3s both;
  }

  .cta-card {
    display: flex; flex-direction: column; align-items: flex-start;
    gap: 4px; padding: 18px 28px; border-radius: 12px;
    cursor: pointer; border: none; font-family: 'Epilogue', sans-serif;
    transition: all 0.2s; min-width: 220px;
    text-align: left;
  }
  .cta-tenant {
    background: var(--sage-dark); color: white;
    box-shadow: 0 8px 32px rgba(74,107,88,0.35);
  }
  .cta-tenant:hover {
    background: var(--sage);
    box-shadow: 0 12px 40px rgba(74,107,88,0.45);
    transform: translateY(-2px);
  }
  .cta-landlord {
    background: var(--surface2); color: var(--ink);
    border: 1px solid var(--border);
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  }
  .cta-landlord:hover {
    border-color: var(--amber);
    box-shadow: 0 12px 40px rgba(245,166,35,0.15);
    transform: translateY(-2px);
  }
  .cta-label {
    font-size: 11px; font-weight: 500; letter-spacing: 1.5px;
    text-transform: uppercase; opacity: 0.7;
  }
  .cta-main { font-size: 17px; font-weight: 600; font-family: 'Syne', sans-serif; }
  .cta-desc { font-size: 12px; opacity: 0.65; margin-top: 2px; }

  .hero-trust {
    margin-top: 56px;
    display: flex; align-items: center; gap: 24px; flex-wrap: wrap; justify-content: center;
    animation: fadeUp 0.6s ease 0.4s both;
  }
  .trust-item {
    display: flex; align-items: center; gap: 7px;
    font-size: 12px; color: var(--ink-dim);
  }
  .trust-dot { color: var(--sage); font-size: 14px; }
  .trust-divider { width: 1px; height: 16px; background: var(--border); }

  /* SPLIT SECTION */
  .split {
    padding: 100px 48px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
    max-width: 1200px; margin: 0 auto; align-items: center;
  }
  .split-reverse { direction: rtl; }
  .split-reverse > * { direction: ltr; }

  .split-label {
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    font-weight: 600; margin-bottom: 14px;
  }
  .label-sage { color: var(--sage); }
  .label-amber { color: var(--amber); }

  .split-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 3.5vw, 42px);
    font-weight: 700; line-height: 1.15;
    letter-spacing: -1px; color: var(--ink);
    margin-bottom: 16px;
  }
  .split-body {
    font-size: 16px; color: var(--ink-muted);
    line-height: 1.75; margin-bottom: 28px;
    font-weight: 300;
  }
  .split-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
  .split-feature {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 14px; color: var(--ink-muted);
  }
  .feature-check { color: var(--sage); font-size: 14px; margin-top: 1px; flex-shrink: 0; }
  .feature-check-amber { color: var(--amber); }

  .split-cta {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px; border-radius: 8px;
    font-size: 14px; font-weight: 500;
    cursor: pointer; border: none;
    font-family: 'Epilogue', sans-serif;
    transition: all 0.15s;
  }
  .split-cta-sage { background: var(--sage-dark); color: white; }
  .split-cta-sage:hover { background: var(--sage); }
  .split-cta-amber { background: var(--sage-dark); color: white; font-weight: 600; }
  .split-cta-amber:hover { background: var(--sage); }

  /* MOCK PREVIEW */
  .preview-wrap {
    position: relative;
    border-radius: 14px; overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: 0 24px 80px rgba(28,35,32,0.12);
  }
  .preview-bar {
    background: var(--surface); padding: 12px 16px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 8px;
  }
  .preview-dot { width: 10px; height: 10px; border-radius: 50%; }
  .preview-body { background: var(--surface2); padding: 20px; }
  .preview-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 10px; padding: 16px; margin-bottom: 12px;
  }
  .preview-title { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
  .preview-sub { font-size: 11px; color: var(--ink-dim); }
  .preview-stat { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; color: var(--sage-dark); margin: 6px 0 2px; }
  .preview-stat-amber { color: var(--amber); }
  .preview-row { display: flex; gap: 10px; }
  .preview-card-half { flex: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px; }
  .preview-badge { display: inline-flex; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 500; background: var(--sage-light); color: var(--sage-dark); }
  .preview-badge-amber { background: rgba(196,125,16,0.1); color: var(--amber); }
  .preview-progress { height: 5px; background: var(--border); border-radius: 3px; margin-top: 8px; overflow: hidden; }
  .preview-fill { height: 100%; background: var(--sage); border-radius: 3px; }
  .preview-fill-amber { background: var(--amber); }

  /* TENANT PREVIEW — warm */
  .preview-wrap-warm { border-color: rgba(124,158,139,0.3); }
  .preview-bar-warm { background: #1C2320; border-bottom-color: rgba(255,255,255,0.07); }
  .preview-body-warm { background: #FAF8F4; }
  .preview-card-warm { background: white; border-color: #E2DDD6; }
  .preview-title-warm { color: #1C2320; }
  .preview-sub-warm { color: #8A9490; }
  .preview-stat-sage { color: #4A6B58; }
  .preview-badge-warm { background: #EAF0EC; color: #4A6B58; }

  /* INSIGHT SECTION */
  .insight {
    padding: 80px 48px;
    max-width: 900px; margin: 0 auto;
    text-align: center;
  }
  .insight-quote {
    font-family: 'Syne', sans-serif;
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 600; line-height: 1.4;
    color: var(--ink); margin-bottom: 16px;
    letter-spacing: -0.5px;
  }
  .insight-quote em { color: var(--sage-dark); font-style: normal; }
  .insight-source { font-size: 13px; color: var(--ink-dim); }

  /* FEATURES GRID */
  .features-section {
    padding: 80px 48px;
    max-width: 1100px; margin: 0 auto;
  }
  .features-header { text-align: center; margin-bottom: 48px; }
  .features-eyebrow {
    font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--sage); font-weight: 600; margin-bottom: 14px;
  }
  .features-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700; letter-spacing: -1px;
    color: var(--ink); line-height: 1.1;
  }

  .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .feature-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 24px;
    transition: all 0.2s;
  }
  .feature-card:hover { border-color: var(--sage); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(28,35,32,0.08); }
  .feature-icon {
    width: 42px; height: 42px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 14px;
  }
  .fi-sage { background: var(--sage-light); }
  .fi-amber { background: rgba(196,125,16,0.08); }
  .fi-clay { background: var(--clay-light); }
  .feature-name {
    font-family: 'Syne', sans-serif; font-size: 15px;
    font-weight: 600; color: var(--ink); margin-bottom: 6px;
  }
  .feature-desc { font-size: 13px; color: var(--ink-muted); line-height: 1.6; }
  .feature-for {
    margin-top: 12px; font-size: 11px; font-weight: 500;
    letter-spacing: 0.3px;
  }
  .for-both { color: var(--sage); }
  .for-tenant { color: var(--sage); }
  .for-landlord { color: var(--amber); }

  /* FINAL CTA */
  .final-cta {
    padding: 100px 48px;
    text-align: center;
    position: relative; overflow: hidden;
  }
  .final-cta-bg {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124,158,139,0.1) 0%, transparent 70%);
  }
  .final-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 800; letter-spacing: -1.5px;
    color: var(--ink); margin-bottom: 16px;
    line-height: 1.05;
  }
  .final-sub {
    font-size: 17px; color: var(--ink-muted);
    margin-bottom: 44px; font-weight: 300;
  }

  /* FOOTER */
  .footer {
    border-top: 1px solid var(--border);
    padding: 28px 48px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .footer-logo { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink); }
  .footer-text { font-size: 12px; color: var(--ink-dim); }

  /* DIVIDER */
  .section-divider {
    height: 1px; background: var(--border);
    max-width: 1100px; margin: 0 auto;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  @media (max-width: 768px) {
    .nav { padding: 16px 20px; }
    .nav-links { display: none; }
    .hero { padding: 100px 20px 60px; }
    .split { grid-template-columns: 1fr; padding: 60px 20px; gap: 32px; }
    .split-reverse { direction: ltr; }
    .features-grid { grid-template-columns: 1fr; padding: 0; }
    .features-section { padding: 60px 20px; }
    .insight { padding: 60px 20px; }
    .final-cta { padding: 60px 20px; }
    .footer { flex-direction: column; gap: 8px; text-align: center; padding: 24px 20px; }
  }
`

const FEATURES = [
  { icon:"📸", cls:"fi-sage", name:"Timestamped Maintenance", desc:"Every request creates a legal paper trail. Tenants document habitability issues; landlords track work orders and vendor costs.", tag:"for-both", tagLabel:"Both sides" },
  { icon:"⚖️", cls:"fi-sage", name:"Know Your Rights", desc:"State-specific tenant rights, entry notice requirements, deposit rules, and retaliation protections — built into the app.", tag:"for-tenant", tagLabel:"Tenants" },
  { icon:"💳", cls:"fi-amber", name:"Rent Collection & History", desc:"Online ACH and card payments, automatic reminders, late fees, and a full payment record that reports to credit bureaus.", tag:"for-both", tagLabel:"Both sides" },
  { icon:"🔍", cls:"fi-amber", name:"Tenant Screening Pipeline", desc:"Applicant kanban with credit, criminal, and eviction reports powered by TransUnion. Tenant pays the screening fee.", tag:"for-landlord", tagLabel:"Landlords" },
  { icon:"📊", cls:"fi-sage", name:"Rent-to-Income Tracker", desc:"Tenants monitor their affordability ratio in real time. If cost-burdened, the app surfaces local rent assistance programs.", tag:"for-tenant", tagLabel:"Tenants" },
  { icon:"🔒", cls:"fi-clay", name:"Security Deposit Protection", desc:"Move-in inspection tied to move-out deductions. Tenants document pre-existing damage; landlords get a defensible record.", tag:"for-both", tagLabel:"Both sides" },
  { icon:"🛡️", cls:"fi-clay", name:"Renters Insurance Marketplace", desc:"Compare policies from top providers and upload proof of insurance — all from the tenant dashboard.", tag:"for-tenant", tagLabel:"Tenants" },
  { icon:"📈", cls:"fi-amber", name:"Portfolio P&L & ROI", desc:"Per-unit income, expenses, cap rate, and NOI. Plus lease expiry timelines and rent vs. market comparisons.", tag:"for-landlord", tagLabel:"Landlords" },
  { icon:"💬", cls:"fi-sage", name:"Is This Normal?", desc:"Plain-language answers to common renting questions with state-specific legal context. No lawyer required.", tag:"for-tenant", tagLabel:"Tenants" },
]

export default function Landing() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <style>{S}</style>
      <div className="landing">

        {/* NAV */}
        <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
          <div className="nav-logo">Threshold</div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior:'smooth' })}>Features</button>
            <button className="nav-link" onClick={() => navigate('/tenant')}>Tenant Demo</button>
            <button className="nav-link" onClick={() => navigate('/landlord')}>Landlord Demo</button>
          </div>
          <button className="nav-cta" data-tally-open="NpJRAG" data-tally-emoji-text="👋" data-tally-emoji-animation="wave">Get Early Access</button>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-grid" />

          <div className="hero-badge">
            <div className="badge-dot" />
            Now accepting early access
          </div>

          <h1 className="hero-title">
            Property management<br />
            <span className="accent">built for renters.</span><br />
            <span style={{color:'var(--ink-muted)', fontSize:'0.75em', fontWeight:500, letterSpacing:'-0.5px'}}>Used by landlords too.</span>
          </h1>

          <p className="hero-sub">
            The only platform where tenants have real tools — rights, resources, documentation, and protection — while landlords get everything they need to run their portfolio.
          </p>

          <div className="hero-ctas">
            <button className="cta-card cta-tenant" data-tally-open="NpJRAG" data-tally-emoji-text="👋" data-tally-emoji-animation="wave">
              <span className="cta-label">I'm a renter</span>
              <span className="cta-main">Join the waitlist →</span>
              <span className="cta-desc">Rights, resources & rent tools</span>
            </button>
            <button className="cta-card cta-landlord" data-tally-open="NpJRAG" data-tally-emoji-text="👋" data-tally-emoji-animation="wave">
              <span className="cta-label" style={{color:'var(--amber)'}}>I'm a landlord</span>
              <span className="cta-main" style={{color:'var(--ink)'}}>Join the waitlist →</span>
              <span className="cta-desc" style={{color:'var(--ink-muted)'}}>Portfolio, screening & rent collection</span>
            </button>
          </div>

          <div className="hero-trust">
            {['Free to start', 'No credit card', 'State-specific legal content', 'Tenant rights built in'].map((item, i, arr) => (
              <>
                <div key={item} className="trust-item">
                  <span className="trust-dot">✓</span>
                  {item}
                </div>
                {i < arr.length - 1 && <div key={`div-${i}`} className="trust-divider" />}
              </>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* INSIGHT QUOTE */}
        <section className="insight">
          <p className="insight-quote">
            The same maintenance log that protects a tenant from losing their deposit{' '}
            <em>protects a landlord from a lawsuit.</em>{' '}
            A shared record is better for everyone.
          </p>
        </section>

        <div className="section-divider" />

        {/* SPLIT — TENANT */}
        <section className="split">
          <div>
            <div className="split-label label-sage">For Renters</div>
            <h2 className="split-title">Finally, tools that are actually on your side</h2>
            <p className="split-body">
              Most property management software is built for landlords and handed to tenants. Threshold flips that. Renters get a full dashboard with legal resources, financial tools, and documentation — not just a payment portal.
            </p>
            <div className="split-features">
              {['Know Your Rights — state-specific law, plain language', 'Anonymous maintenance requests (retaliation protection)', 'Rent-to-income tracker with assistance programs', 'Security deposit tracker with move-in documentation', 'Renters insurance marketplace', '"Is This Normal?" — answers to common disputes'].map(f => (
                <div key={f} className="split-feature">
                  <span className="feature-check">✓</span>
                  {f}
                </div>
              ))}
            </div>
            <button className="split-cta split-cta-sage" onClick={() => navigate('/tenant')}>
              See the Tenant Portal →
            </button>
          </div>

          {/* Tenant preview mockup */}
          <div className="preview-wrap preview-wrap-warm">
            <div className="preview-bar preview-bar-warm">
              <div className="preview-dot" style={{background:'#FF5F57'}} />
              <div className="preview-dot" style={{background:'#FEBC2E'}} />
              <div className="preview-dot" style={{background:'#28C840'}} />
              <span style={{marginLeft:8,fontSize:11,color:'#6A7870',fontFamily:'Epilogue'}}>Threshold — Tenant Portal</span>
            </div>
            <div className="preview-body preview-body-warm" style={{padding:16}}>
              <div style={{background:'#FFF8E6',border:'1px solid #F0D080',borderRadius:8,padding:'10px 12px',marginBottom:12,fontSize:11,color:'#7A5210'}}>
                📅 Rent due in 8 days · $1,450 · Lease renews in 117 days
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
                {[['Monthly Rent','$1,450','#4A6B58'],['Credit Score','714','#4A8C6A'],['Open Requests','2','#C4714A'],['Rent-to-Income','27.9%','#4A8C6A']].map(([l,v,c])=>(
                  <div key={l} className="preview-card-warm" style={{background:'white',border:'1px solid #E2DDD6',borderRadius:8,padding:12}}>
                    <div style={{fontSize:10,color:'#8A9490',marginBottom:4}}>{l}</div>
                    <div style={{fontFamily:'Syne',fontSize:18,fontWeight:700,color:c}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'white',border:'1px solid #E2DDD6',borderRadius:8,padding:12}}>
                <div style={{fontSize:11,fontFamily:'Syne',fontWeight:600,color:'#1C2320',marginBottom:8}}>Know Your Rights</div>
                {['Right to Habitable Housing','Right to Privacy & Entry Notice','Protection Against Retaliation'].map((r,i)=>(
                  <div key={r} style={{fontSize:10,color:'#8A9490',padding:'5px 0',borderBottom:i<2?'1px solid #E2DDD6':'none',display:'flex',justifyContent:'space-between'}}>
                    {r}<span style={{color:'#4A6B58'}}>▼</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* SPLIT — LANDLORD */}
        <section className="split split-reverse">
          <div>
            <div className="split-label label-amber">For Landlords</div>
            <h2 className="split-title">A command center for your portfolio</h2>
            <p className="split-body">
              Everything a small landlord needs — rent collection, screening, leases, maintenance, P&L, and legal resources — without the enterprise price tag or unit caps that punish you for growing.
            </p>
            <div className="split-features">
              {['Rent roll with automated late fees', 'Applicant pipeline — Applied → Screened → Approved', 'Portfolio ROI, cap rate & vacancy cost tracking', 'Expense ledger with receipt tracking and CSV export', 'Lease renewal alerts with state-required notice rules', 'Vendor directory tied to work orders'].map(f => (
                <div key={f} className="split-feature">
                  <span className="feature-check feature-check-amber">✓</span>
                  {f}
                </div>
              ))}
            </div>
            <button className="split-cta split-cta-amber" onClick={() => navigate('/landlord')}>
              See the Landlord Portal →
            </button>
          </div>

          {/* Landlord preview mockup */}
          <div className="preview-wrap">
            <div className="preview-bar">
              <div className="preview-dot" style={{background:'#FF5F57'}} />
              <div className="preview-dot" style={{background:'#FEBC2E'}} />
              <div className="preview-dot" style={{background:'#28C840'}} />
              <span style={{marginLeft:8,fontSize:11,color:'var(--ink-dim)',fontFamily:'Epilogue'}}>Threshold — Landlord Portal</span>
            </div>
            <div className="preview-body" style={{padding:16}}>
              <div style={{background:'#FFF0F0',border:'1px solid #F0B0B0',borderRadius:8,padding:'10px 12px',marginBottom:12,fontSize:11,color:'#A03030'}}>
                ⚠️ Overdue rent — $1,300 · Unit 2A · Carlos Rivera · 5 days
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:12}}>
                {[['Collected','$4,250','#2A6B4A'],['Overdue','$1,300','#A03030'],['Open Reqs','3','#8A5800'],['Vacancy','14d','#5A6660']].map(([l,v,c])=>(
                  <div key={l} style={{background:'white',border:'1px solid #E2DDD6',borderRadius:7,padding:'10px 10px'}}>
                    <div style={{fontSize:9,color:'#8A9490',marginBottom:3}}>{l}</div>
                    <div style={{fontFamily:'Syne',fontSize:15,fontWeight:700,color:c}}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="preview-card">
                <div className="preview-title">Unit Status</div>
                {[['Unit 3B','Maya Chen','$1,450','Paid'],['Unit 2A','Carlos Rivera','$1,300','Overdue'],['Unit 1B','Sarah Okonkwo','$1,200','Paid']].map(([u,t,r,s])=>(
                  <div key={u} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid #E2DDD6',fontSize:11,alignItems:'center'}}>
                    <span style={{color:'#5A6660',width:60}}>{u}</span>
                    <span style={{color:'#8A9490',flex:1}}>{t}</span>
                    <span style={{color:'#2A6B4A',marginRight:10}}>{r}</span>
                    <span style={{background:s==='Paid'?'#EAF5EF':'#FFF0F0',color:s==='Paid'?'#2A6B4A':'#A03030',padding:'1px 7px',borderRadius:10,fontSize:10}}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* FEATURES GRID */}
        <section className="features-section" id="features">
          <div className="features-header">
            <div className="features-eyebrow">Everything included</div>
            <h2 className="features-title">One platform. Two perspectives.<br />Every feature you need.</h2>
          </div>
          <div className="features-grid">
            {FEATURES.map(f => (
              <div key={f.name} className="feature-card">
                <div className={`feature-icon ${f.cls}`}>{f.icon}</div>
                <div className="feature-name">{f.name}</div>
                <div className="feature-desc">{f.desc}</div>
                <div className={`feature-for ${f.tag}`}>
                  {f.tag === 'for-both' ? '⇄ ' : f.tag === 'for-tenant' ? '↑ ' : '↓ '}{f.tagLabel}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* FINAL CTA */}
        <section className="final-cta" id="get-started">
          <div className="final-cta-bg" />
          <div className="final-title">
            Start on the right side<br />of the rental relationship.
          </div>
          <p className="final-sub">Free to start. No credit card. No unit caps.</p>
          <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
            <button className="cta-card cta-tenant" data-tally-open="NpJRAG" data-tally-emoji-text="👋" data-tally-emoji-animation="wave">
              <span className="cta-label">I'm a renter</span>
              <span className="cta-main">Join the waitlist →</span>
              <span className="cta-desc">Rights, resources & rent tools</span>
            </button>
            <button className="cta-card cta-landlord" data-tally-open="NpJRAG" data-tally-emoji-text="👋" data-tally-emoji-animation="wave">
              <span className="cta-label" style={{color:'var(--amber)'}}>I'm a landlord</span>
              <span className="cta-main" style={{color:'var(--ink)'}}>Join the waitlist →</span>
              <span className="cta-desc" style={{color:'var(--ink-muted)'}}>Portfolio, screening & rent collection</span>
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-logo">Threshold</div>
          <div className="footer-text">Property management for the independent landlord & the protected renter</div>
          <div className="footer-text">Early access · 2026</div>
        </footer>

      </div>
    </>
  )
}
