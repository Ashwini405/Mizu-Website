import bg from '../assets/facade.jpg'
import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import { useState } from 'react'
import { SLink, Ic, I } from '../ui.jsx'
import { XS } from './Building.jsx'
import { short, principal, INTEREST } from '../data.js'
/* Same layout as the "What each ticket earns" design: three glass cards, art at the foot, gold arrow */
export default function Protection() {
  return (
    <div className="rt2 pt3" style={{ '--bg': `url(${bg})` }}>
      <div className="rt2-bg" aria-hidden="true" /><div className="rt2-shade" aria-hidden="true" />
      <header className="rt2-head">
        <p className="rt2-eye"><i />YOUR PROTECTION<i /></p>
        <h1>Your money comes back <span>with interest</span></h1>
        <p className="rt2-lead">If construction is delayed or work halts, you can cancel your booking.</p>
      </header>
      <div className="rt2-cards">
        <article className="rt2-card">
          <span className="ic c0"><Ic d={I.coins} size={30} /></span>
          <h2>Interest</h2><i className="rt2-rule" />
          <strong>12% a year</strong>
          <p>Simple interest on your principal for the time it was held.</p>
          <img className="rt2-art pa" src={p1} alt="" />
          <SLink className="rt2-go" to="/enquire" aria-label="Enquire"><Ic d={I.arrow} size={22} /></SLink>
        </article>
        <article className="rt2-card">
          <span className="ic sage"><Ic d={I.hand} size={30} /></span>
          <h2>Rent received</h2><i className="rt2-rule" />
          <strong>Adjusted</strong>
          <p>Rent you have already received is adjusted in the refund.</p>
          <img className="rt2-art pb" src={p2} alt="" />
          <SLink className="rt2-go" to="/enquire" aria-label="Enquire"><Ic d={I.arrow} size={22} /></SLink>
        </article>
        <article className="rt2-card">
          <span className="ic blue"><Ic d={I.cal} size={30} /></span>
          <h2>Refund</h2><i className="rt2-rule" />
          <strong>90 days</strong>
          <p>Refund paid within 90 days of cancellation.</p>
          <div className="rt2-cal" aria-hidden="true"><b>90</b><small>DAYS</small></div>
          <SLink className="rt2-go" to="/enquire" aria-label="Enquire"><Ic d={I.arrow} size={22} /></SLink>
        </article>
      </div>
    </div>
  )
}

/* Delay protection, worked out on the ticket chosen on Home / Returns.
   Refund = principal + 12% p.a. simple interest − rent already received (6% p.a.) */
export function RefundCalc({ lakh, ticket }) {
  const [t, setT] = useState(1)
  const P = principal(lakh, ticket), int = P * INTEREST * t, rent = P * 0.06 * t, refund = P + int - rent
  return (
    <XS eye="DELAY PROTECTION" title={<>What you get back <span>if you cancel</span></>} lead="If the project is delayed or work halts, you can cancel. You receive your principal with 12% p.a. simple interest, less rent already received, within 90 days of cancellation.">
      <div className="xr glass">
        <div className="xr-years" role="group" aria-label="Years held">
          <span>Held for</span>
          {[1, 2, 3, 4].map(y => <button key={y} type="button" aria-pressed={t === y} onClick={() => setT(y)}>{y} {y === 1 ? 'year' : 'years'}</button>)}
        </div>
        <dl className="xr-ledger" aria-live="polite">
          <div><dt>Your investment</dt><dd>{short(P)}</dd></div>
          <div className="plus"><dt>Interest at 12% p.a. × {t}</dt><dd>+ {short(int)}</dd></div>
          <div className="minus"><dt>Rent already received (6% p.a. × {t})</dt><dd>− {short(rent)}</dd></div>
          <div className="tot"><dt>Refund within 90 days</dt><dd>{short(refund)}</dd></div>
        </dl>
        <p className="xr-note">Each year held, the refund grows by <b>{short(P * 0.06)}</b>: {short(P * INTEREST)} interest, less {short(P * 0.06)} rent you have already received.</p>
        <p className="xs-fine">Illustration only. Delay protection is subject to the terms of the sale agreement.</p>
      </div>
    </XS>
  )
}
