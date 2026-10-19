import bg from '../assets/facade.jpg'
import s1 from '../assets/s1.jpg'; import s2 from '../assets/s2.jpg'; import s3 from '../assets/s3.jpg'; import s4 from '../assets/s4.jpg'
import { SLink, Ic, I } from '../ui.jsx'
const S = [
  ['01', 'Visit the site', 'Walk the location and see the plans.', 'site', s1, '/location', 'cream'],
  ['02', 'Choose your ticket', 'From ₹30 lakh, up to a full floor.', 'ticket', s2, '/returns', 'mint'],
  ['03', 'Book', 'Pay the booking amount to hold your share.', 'doc', s3, '/enquire', 'rose'],
  ['04', 'Sign and earn', 'Agreement signed, rent begins.', 'chart', s4, '/protection', 'blue']
]
/* Four frosted glass cards: number badge on the top edge, icon, text, wave-cut photo and a gold arrow */
export default function Process() {
  return (
    <div className="pr3" style={{ '--bg': `url(${bg})` }}>
      <div className="pr3-bg" aria-hidden="true" /><div className="pr3-shade" aria-hidden="true" />
      <header className="pr3-head">
        <p className="rt2-eye"><i />THE PROCESS<i /></p>
        <h1>From first visit <span>to first rent</span></h1>
        <p className="rt2-lead">A simple, transparent process to help you own an income-generating asset at MIZU.</p>
      </header>
      <ol className="pr3-track">
        {S.map(([n, a, b, ic, im, to, col], i) => (
          <li className="pr3-stop" key={n} style={{ '--i': i }}>
            <span className={'pr3-node ' + col} aria-hidden="true">{n}</span>
            <article className="pr3-card">
              <span className={'ic ' + col}><Ic d={I[ic]} size={30} /></span>
              <h2>{a}</h2>
              <p>{b}</p>
              <i className="pr3-photo" style={{ backgroundImage: `url(${im})` }} aria-hidden="true" />
              <SLink className="rt2-go" to={to} aria-label={a}><Ic d={I.arrow} size={22} /></SLink>
            </article>
          </li>
        ))}
      </ol>
    </div>
  )
}
