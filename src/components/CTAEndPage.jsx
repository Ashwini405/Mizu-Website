import { SLink, Ic, I } from '../ui.jsx'
import lakeImg from '../assets/loc/hero.jpg'

export function CTALeft() {
  return (
    <div className="lp lp-left cta-l">
      <div className="lp-img"><img src={lakeImg} alt="" draggable="false" /></div>
      <span className="lp-count">MIZU BY ISTA</span>
      <h2 className="lp-title">Investment Potential</h2>
      <p className="lp-sub">Beside Knowledge Capital, facing the lake</p>
    </div>
  )
}
export function CTARight() {
  return (
    <div className="lp lp-right cta-r">
      <p className="lp-lab">Next step</p>
      <h2 className="cta-h">Investment Potential</h2>
      <p className="lp-tag">Ready to explore your future investment?</p>
      <p className="lp-desc">Walk the site, see the plans and choose the ticket that suits you. CITYHUB Properties will guide you through the agreement terms.</p>
      <div className="cta-btns">
        <SLink to="/enquire" className="cb primary">Schedule Visit <Ic d={I.arrow} size={18} /></SLink>
        <a className="cb" href="mailto:info@cityhub.com?subject=MIZU%20brochure%20request">Download Brochure</a>
        <a className="cb" href="mailto:info@cityhub.com?subject=MIZU%20pre-launch%20enquiry">Contact Sales</a>
      </div>
    </div>
  )
}
