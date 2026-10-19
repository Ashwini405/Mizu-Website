import { useState, useEffect } from 'react'
import { ticketFor, EMAIL, MAP_URL } from '../data.js'
import { XS } from './Building.jsx'
import enq from '../assets/facade.jpg'
import { Sheet, Ic, I } from '../ui.jsx'
const OPTS = ['₹30 L', '₹65 L', '₹1.3 Cr', '₹2.6 Cr', 'Above ₹2.6 Cr', 'Full floor']
export default function Enquire({ lakh, ticket }) {
  const [tk, setTk] = useState(ticket || ticketFor(lakh))
  useEffect(() => { setTk(ticket || ticketFor(lakh)) }, [lakh, ticket])
  const [err, setErr] = useState('')
  const [ok, setOk] = useState(false)
  const submit = e => {
    e.preventDefault()
    const f = new FormData(e.target), n = (f.get('name') || '').trim(), p = (f.get('phone') || '').trim()
    if (!n) return setErr('Enter your name.')
    if (p.replace(/\D/g, '').length < 10) return setErr('Enter a 10-digit mobile number.')
    setErr('')
    const body = 'Name: ' + n + '\nMobile: ' + p + '\nTicket size: ' + tk + '\n\nPlease call me back about the MIZU pre-launch.'
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('MIZU pre-launch enquiry — ' + tk) + '&body=' + encodeURIComponent(body)
    setOk(true)
  }
  return (
    <Sheet variant="enquire" bg={enq} pos="50% 50%"
      left={<><h1>Hold your share <em>before</em> <span>launch</span></h1><i className="rule" /><p className="lead">Tell us your ticket size. CITYHUB Properties will call you back with the floor plan, the agreement terms and a site visit slot.</p>
        <div className="efacts">
          <div><span><Ic d={I.rupee} size={24} /></span><p><b>₹13,000</b>per sq.ft, pre-launch</p></div>
          <div><span><Ic d={I.cal} size={24} /></span><p><b>₹65</b>per sq.ft a month</p></div>
          <div><span><Ic d={I.bld} size={24} /></span><p><b>One floor</b>~25,000 sq.ft only</p></div>
        </div>
        <p className="note mailm"><span className="mc"><Ic d={I.mail} size={20} /></span><span>Or write to<br /><a href={'mailto:' + EMAIL}>{EMAIL}</a></span></p></>}>
      <form className="card enq" onSubmit={submit} noValidate>
        <div className="field"><label htmlFor="nm">Name</label><div className="inp"><Ic d={I.user} size={22} /><input id="nm" name="name" autoComplete="name" placeholder="Enter your full name" required /></div></div>
        <div className="field"><label htmlFor="ph">Mobile number</label><div className="inp"><Ic d={I.phone} size={22} /><input id="ph" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Enter your mobile number" required /></div></div>
        <div className="field"><label htmlFor="tk">Ticket size</label>
          <div className="inp sel"><span className="rc">₹</span>
            <select id="tk" value={tk} onChange={e => setTk(e.target.value)}>{OPTS.map(o => <option key={o}>{o}</option>)}</select>
            <Ic d={I.down} size={20} /></div></div>
        <p className="err" role="alert">{err}</p>
        <button className="cta dark wide" type="submit">Request a call back <Ic d={I.arrow} size={20} /></button>
        <p className="note lk"><Ic d={I.lock} size={18} />Opens your email app with your details filled in, addressed to CITYHUB Properties.</p>
      </form>
      {ok && <div className="ok" role="status">Your email is ready to send. If it didn't open, write to <a href={'mailto:' + EMAIL}>{EMAIL}</a> with your name, number and ticket size.</div>}
    </Sheet>
  )
}

/* back page of the brochure: who to talk to, who builds it, the fine print */
export function Contacts() {
  return (
    <XS eye="EXCLUSIVE PRE-LAUNCH" title={<>Own it before it rises. <span>Earn from day one.</span></>}>
      <div className="xc">
        <div className="xc-card glass">
          <p className="xs-kick">PRE-LAUNCH ENQUIRIES</p>
          <h3>CITYHUB Properties</h3>
          <p className="xc-sub">The landowners · exclusive pre-launch</p>
          <a className="xc-link" href={'mailto:' + EMAIL}><Ic d={I.mail} size={20} />{EMAIL}</a>
          <a className="xc-link" href={MAP_URL} target="_blank" rel="noopener noreferrer"><Ic d={I.site} size={20} />View site location on map <Ic d={I.arrow} size={16} /></a>
        </div>
        <div className="xc-card glass">
          <p className="xs-kick">DEVELOPER</p>
          <h3>ISTA HOMES</h3>
          <p className="xc-sub">Design, construction and delivery of MIZU.</p>
          <p className="xc-prot"><Ic d={I.shield} size={20} />Delay protection: cancel if the project is delayed or work halts. Principal + 12% p.a., less rent received, within 90 days.</p>
        </div>
      </div>
      <footer className="xc-foot">
        <p>Assured rent, prices and areas are subject to the terms of the sale agreement. Plans and images are indicative and may change as per approvals. This website is not an offer or contract.</p>
        <div className="xc-brand"><span aria-hidden="true">水</span><b>MIZU</b><small>FLOWING TOWARDS A BRIGHTER TOMORROW</small></div>
      </footer>
    </XS>
  )
}
