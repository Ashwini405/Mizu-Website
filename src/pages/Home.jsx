import homeBg from '../assets/home-bg.jpg'
import { fmt, money, short, calc } from '../data.js'
import { SLink, Ic, I, useLenis, useTween } from '../ui.jsx'
import BookShowcase from '../components/BookShowcase.jsx'
import Building from './Building.jsx'
import Returns from './Returns.jsx'
import Protection from './Protection.jsx'
import Process from './Process.jsx'
import Enquire from './Enquire.jsx'

export default function Home({ lakh, setLakh, ticket, setTicket, active }) {
  const c0 = calc(lakh)
  const c = { m: useTween(c0.m), y: useTween(c0.y), sq: useTween(c0.sq) }
  useLenis(null)
  return (
    <main className="view pgin" key={active}>
      {active === '/' && <section id="home" className="home2" aria-label="Investment potential" style={{ '--home-bg': `url(${homeBg})` }}>
        <div className="h2-bg" aria-hidden="true" /><div className="h2-shade" aria-hidden="true" />
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
              {[30, 65, 130, 260].map(v => <button key={v} type="button" className="h2-chip" aria-pressed={v === lakh} onClick={() => setLakh(v)}>{v === 130 ? '₹1.3 Cr' : v === 260 ? '₹2.6 Cr' : '₹' + v + ' L'}</button>)}
            </div>
          </div>
          <div className="h2-bottom">
            <p className="h2-ref">Reference price ₹13,000 per sq.ft. Assured rent ₹65 per sq.ft a month, paid from day one through construction. Excludes GST, registration and other charges.</p>
            <SLink className="h2-cta" to="/enquire">Reserve this ticket <Ic d={I.arrow} size={20} /></SLink>
          </div>
        </div>
        <div className="h2-right">
          <div className="h2-rlabel">MONTHLY ASSURED RENT</div>
          <div className="h2-glass h2-rent"><strong>{fmt(c.m)}</strong><span>from day one</span></div>
          <div className="h2-facts">
            <div className="h2-glass"><Ic d={I.coins} size={30} sw={1.5} /><strong>{short(c.y)}</strong><small>Annual Income</small></div>
            <div className="h2-glass"><Ic d={I.chart} size={30} sw={1.5} /><strong>6%</strong><small>Assured Yield</small></div>
            <div className="h2-glass"><Ic d={I.house} size={30} sw={1.5} /><strong>{(lakh === 30 ? '~' : '') + Math.round(c.sq).toLocaleString('en-IN')}</strong><small>Sq.Ft You Own</small></div>
          </div>
        </div>
      </section>}
      {active === '/location' && <BookShowcase />}
      {active === '/building' && <section id="building" className="hsec"><Building /></section>}
      {active === '/returns' && <section id="returns" className="hsec"><Returns lakh={lakh} setLakh={setLakh} ticket={ticket} setTicket={setTicket} /></section>}
      {active === '/protection' && <section id="protection" className="hsec"><Protection /></section>}
      {active === '/process' && <section id="process" className="hsec"><Process /></section>}
      {active === '/enquire' && <section id="enquire" className="hsec"><Enquire lakh={lakh} ticket={ticket} /></section>}
    </main>
  )
}
