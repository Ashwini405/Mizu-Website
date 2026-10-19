import bg from '../assets/facade.jpg'
import s1 from '../assets/s1.jpg'; import s2 from '../assets/s2.jpg'; import s3 from '../assets/s3.jpg'; import s4 from '../assets/s4.jpg'
import { SLink, Ic, I } from '../ui.jsx'
const S = [
  ['01', 'Visit the site', 'Walk the location, see the plans and the lake-facing site.', s1, '/location', 'Location'],
  ['02', 'Choose your ticket', 'From ₹30 lakh up to a full floor of 24,634 sq.ft.', s2, '/returns', 'See returns'],
  ['03', 'Book your share', 'Pay the booking amount to hold your share at the pre-launch price.', s3, '/enquire', 'Enquire'],
  ['04', 'Sign and earn', 'Agreement signed; assured rent of ₹65 per sq.ft a month begins.', s4, '/protection', 'Protection']
]
/* A quiet four-step timeline: hairline track, numbered nodes, dark glass cards with a photo on top */
export default function Process() {
  return (
    <div className="pr4" style={{ '--bg': `url(${bg})` }}>
      <div className="pr4-bg" aria-hidden="true" /><div className="pr4-shade" aria-hidden="true" />
      <header className="pr4-head">
        <p className="pr4-eye">The process</p>
        <h1>From first visit <em>to first rent</em></h1>
        <p className="pr4-lead">Four simple steps to own an income-generating asset at MIZU.</p>
      </header>
      <ol className="pr4-track">
        {S.map(([n, a, b, im, to, cta], i) => (
          <li className="pr4-step" key={n} style={{ '--i': i }}>
            <span className="pr4-node" aria-hidden="true">{n}</span>
            <article className="pr4-card">
              <div className="pr4-photo"><img src={im} alt="" loading="lazy" /></div>
              <div className="pr4-body">
                <p className="pr4-num">Step {n}</p>
                <h2>{a}</h2>
                <p>{b}</p>
                <SLink className="pr4-go" to={to}>{cta} <Ic d={I.arrow} size={16} /></SLink>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  )
}
