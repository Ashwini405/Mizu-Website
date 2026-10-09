import bg from '../assets/home-bg.jpg'
import p1 from '../assets/p1.jpg'
import p2 from '../assets/p2.jpg'
import { SLink, Ic, I } from '../ui.jsx'
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
