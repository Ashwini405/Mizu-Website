import homeBg from '../assets/facade.jpg'
import { fmt, money, short, calc, sqft } from '../data.js'
import { SLink, Ic, I, useLenis, useTween } from '../ui.jsx'
import BookShowcase from '../components/BookShowcase.jsx'
import Building, { BuildingDesign, BuildingSection, BuildingPlan } from './Building.jsx'
import Returns, { EarningsTable } from './Returns.jsx'
import Protection, { RefundCalc } from './Protection.jsx'
import Process from './Process.jsx'
import Enquire, { Contacts } from './Enquire.jsx'

export default function Home({ lakh, setLakh, ticket, setTicket, active }) {
  const c0 = calc(lakh)
  const c = { m: useTween(c0.m), y: useTween(c0.y), sq: useTween(c0.sq) }
  useLenis(null)
  return (
    <main className="view pgin" key={active}>
      {active === '/' && <section id="home" className="home2" aria-label="Investment potential" style={{ '--home-bg': `url(${homeBg})` }}>
        <div className="h2-bg" aria-hidden="true" /><div className="h2-bld" aria-hidden="true" /><div className="h2-shade" aria-hidden="true" />
        <div className="h2-left">
          <p className="h2-eyebrow">INVESTMENT POTENTIAL</p>
          <h1 className="h2-q">Earn from a <span>Prime Location</span></h1>
          <p className="h2-who">Assured rental income from day one, in the heart of Hyderabad’s Financial District — beside Knowledge Capital and facing the lake at Nanakramguda.</p>
          <div className="h2-glass h2-invest" aria-labelledby="calc-title">
            <label id="calc-title" htmlFor="amt">YOUR INVESTMENT</label>
            <div className="h2-amount" aria-live="polite">{money(lakh)}</div>
            <input id="amt" type="range" min="30" max="500" step="5" value={lakh} onChange={e => setLakh(+e.target.value)} style={{ '--p': ((lakh - 30) / 470) * 100 + '%' }} />
            <div className="h2-ticks"><span>₹30 L</span><span>₹5 Cr</span></div>
            <div className="h2-chips" role="group" aria-label="Quick picks">
              {[30, 50, 75, 100].map(v => <button key={v} type="button" className="h2-chip" aria-pressed={v === lakh} onClick={() => setLakh(v)}>{money(v)}</button>)}
            </div>
          </div>
          <div className="h2-bottom">
            
            <div className="h2-acts"><SLink className="h2-cta" to="/enquire">Reserve this ticket <Ic d={I.arrow} size={20} /></SLink><SLink className="h2-link" to="/returns">How returns work</SLink></div>
          </div>
        </div>
        <div className="h2-right">
          <div className="h2-rlabel">MONTHLY ASSURED RENT</div>
          <div className="h2-glass h2-panel">
            <div className="h2-rent"><strong>{fmt(c.m)}</strong><span>a month, from day one</span></div>
            <dl className="h2-facts">
              <div><dt>Annual income</dt><dd>{short(c.y)}</dd></div>
              <div><dt>Assured yield</dt><dd>6%</dd></div>
              <div><dt>Sq.ft you own</dt><dd>{(sqft(lakh)[0] === '~' ? '~' : '') + Math.round(c.sq).toLocaleString('en-IN')}</dd></div>
            </dl>
          </div>
          <div className="h2-glass h2-offer">
            <p className="h2-olabel">PRE-LAUNCH OFFER</p>
            <dl>
              <div><dt>Price</dt><dd>₹13,000 <small>/ sq.ft</small></dd></div>
              <div><dt>Minimum</dt><dd>₹30 L</dd></div>
              <div><dt>Available</dt><dd>One floor <small>~25,000 sq.ft</small></dd></div>
              <div><dt>Delay protection</dt><dd>12% p.a. <small>refund</small></dd></div>
            </dl>
            <p className="h2-ofine">Rent paid from day one through construction. Excludes GST, registration and other charges.</p>
          </div>
        </div>
      </section>}
      {active === '/location' && <BookShowcase />}
      {active === '/building' && <>
        <section id="building" className="hsec"><Building /></section>
        <section className="xsec" aria-label="The design"><BuildingDesign /></section>
        <section className="xsec" aria-label="Section and specifications"><BuildingSection /></section>
        <section className="xsec" aria-label="Site plan and typical floor"><BuildingPlan /></section>
      </>}
      {active === '/returns' && <>
        <section id="returns" className="hsec"><Returns lakh={lakh} ticket={ticket} /></section>
        <section className="xsec" aria-label="What your investment earns"><EarningsTable lakh={lakh} setLakh={setLakh} ticket={ticket} setTicket={setTicket} /></section>
      </>}
      {active === '/protection' && <>
        <section id="protection" className="hsec"><Protection /></section>
        <section className="xsec" aria-label="Refund example"><RefundCalc lakh={lakh} ticket={ticket} /></section>
      </>}
      {active === '/process' && <section id="process" className="hsec"><Process /></section>}
      {active === '/enquire' && <>
        <section id="enquire" className="hsec"><Enquire lakh={lakh} ticket={ticket} /></section>
        <section className="xsec" aria-label="Contacts"><Contacts /></section>
      </>}
    </main>
  )
}
