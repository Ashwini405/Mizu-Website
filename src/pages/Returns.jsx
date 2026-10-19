import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import bg from '../assets/facade.jpg'
import { Ic, I } from '../ui.jsx'
import { money, short, calc, sqft, FULL, FLOOR } from '../data.js'
import { XS } from './Building.jsx'
/* hub-and-spoke "ticket" diagram. x,y,w,h = pill box in a 1000 x 600 stage; ix,iy = icon centre;
   top/left = where the icon sits (on the pill's top edge, or inside at the left); ax,ay = where the spoke meets the pill */
const BASE = [
  { k: 'inv', v: '₹30 L', l: 'Your investment', ic: 'layers', col: 'peach', x: 232, y: 48, w: 243, h: 120, pos: 'top', ax: 397, ay: 168 },
  { k: 'sq', v: '~231 sq.ft', l: 'Your share', ic: 'expand', col: 'sage', x: 542, y: 48, w: 262, h: 120, pos: 'top', ax: 592, ay: 168 },
  { v: '₹13,000', l: 'Price per sq.ft', ic: 'rupee', col: 'blue', x: 5, y: 170, w: 290, h: 117, pos: 'left', ax: 295, ay: 265 },
  { k: 'rm', v: '₹15,000', l: 'Rent a month', ic: 'cal', col: 'tan', x: 692, y: 168, w: 303, h: 117, pos: 'left', ax: 692, ay: 262 },
  { v: '₹65', l: 'Rent per sq.ft a month', ic: 'frame', col: 'lilac', x: 10, y: 307, w: 307, h: 118, pos: 'left', ax: 317, ay: 350 },
  { k: 'ry', v: '₹1.8 L', l: 'Rent a year', ic: 'chart', col: 'blue', x: 692, y: 307, w: 303, h: 118, pos: 'left', ax: 692, ay: 345 },
  { v: '6% a year', l: 'Assured yield, from day one', ic: 'pie', col: 'sage', x: 192, y: 457, w: 290, h: 138, pos: 'top', ax: 388, ay: 457 },
  { v: '12% p.a.', l: 'Refund interest if delayed', ic: 'shield', col: 'peach', x: 520, y: 457, w: 282, h: 138, pos: 'top', ax: 572, ay: 457 }
]
const HUB = [495, 318]
/* values for the ticket chosen on the Home page */
function live(lakh, ticket) {
  if (ticket === 'Full floor') return { inv: short(FULL.inv), sq: '24,634 sq.ft', rm: short(FULL.m), ry: short(FULL.y) }
  const c = calc(lakh)
  return { inv: money(lakh), sq: sqft(lakh) + ' sq.ft', rm: short(c.m), ry: short(c.y) }
}
export default function Returns({ lakh = 130, ticket = null }) {
  const L = live(lakh, ticket)
  const NODES = BASE.map(n => n.k ? { ...n, v: L[n.k] } : n)
  const wrap = useRef(), [k, setK] = useState(1)
  useLayoutEffect(() => {
    const fit = () => { const r = wrap.current.getBoundingClientRect(); setK(Math.max(.4, Math.min(r.width / 1000, r.height / 600, 1.5))) }
    fit(); const ro = new ResizeObserver(fit); ro.observe(wrap.current); return () => ro.disconnect()
  }, [])
  return (
    <div className="bd2" style={{ '--bg': `url(${bg})` }}>
      <div className="bd2-bg" aria-hidden="true" /><div className="bd2-shade" aria-hidden="true" />
      <header className="bd2-head">
        <div className="bd2-brand"><i /><span>MIZU</span><i /></div>
        <h1>Rent from day one, <span>while the tower rises</span></h1>
        <p>₹13,000 per sq.ft pre-launch. ₹65 per sq.ft a month assured rent (6% a year), paid from the day you invest, through construction.</p>
      </header>
      {/* desktop: the connected diagram */}
      <div className="bd2-wrap" ref={wrap}>
        <div className="bd2-stage" style={{ transform: `translate(-50%,0) scale(${k})` }}>
          <svg className="bd2-lines" viewBox="0 0 1000 600" aria-hidden="true">
            {NODES.map((n, i) => (
              <g key={i} style={{ '--i': i }}>
                <line className="ln" x1={HUB[0]} y1={HUB[1]} x2={n.ax} y2={n.ay} />
                <circle className="dot" cx={n.ax} cy={n.ay} r="4.5" />
                <circle className="dot" cx={(HUB[0] * .35 + n.ax * .65)} cy={(HUB[1] * .35 + n.ay * .65)} r="3" />
              </g>
            ))}
          </svg>
          <div className="bd2-hub" style={{ left: HUB[0], top: HUB[1] }} aria-hidden="true"><i /><i /><i /><span><Ic d={I.ticket} size={50} sw={1.6} /></span></div>
          {NODES.map((n, i) => (
            <div key={i} className={'bd2-node ' + n.pos} style={{ left: n.x, top: n.y, width: n.w, height: n.h, '--i': i }}>
              <span className={'ic ' + n.col}><Ic d={I[n.ic]} size={32} /></span>
              <div><strong>{n.v}</strong><small>{n.l}</small></div>
            </div>
          ))}
        </div>
      </div>
      {/* phone: simple grid */}
      <div className="bd2-grid">
        {NODES.map((n, i) => (
          <div key={i} className="bd2-card">
            <span className={'ic ' + n.col}><Ic d={I[n.ic]} size={26} /></span>
            <div><strong>{n.v}</strong><small>{n.l}</small></div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* the brochure's "What your investment earns" table; rows pick the ticket */
const ROWS = [30, 65, 130, 260]
export function EarningsTable({ lakh, setLakh, ticket, setTicket }) {
  const full = ticket === 'Full floor', custom = !full && !ROWS.includes(lakh)
  const row = (key, on, inv, sq, m, y, pick, tag) => (
    <tr key={key} className={on ? 'on' : ''} onClick={pick} tabIndex={0} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), pick())} aria-selected={on}>
      <th scope="row">{inv}{tag && <em>{tag}</em>}</th><td>{sq}</td><td>{m}</td><td>{y}</td>
    </tr>)
  const lr = l => { const c = calc(l); return [money(l), sqft(l), short(c.m), short(c.y)] }
  return (
    <XS eye="WHAT YOUR INVESTMENT EARNS" title={<>Pick a ticket, <span>see the rent</span></>} lead="Tap a row to make it your ticket. The figures update across the site.">
      <div className="xe">
        <div className="xe-cards">
          <div className="glass"><small>PRICE</small><b>₹13,000</b><span>per sq.ft, pre-launch</span></div>
          <div className="glass"><small>ASSURED RENT</small><b>₹65</b><span>per sq.ft a month (6% p.a.)</span></div>
          <div className="glass"><small>MINIMUM</small><b>₹30 L</b><span>investment</span></div>
          <p className="xe-note">Only ~25,000 sq.ft, one floor, is offered at this price, exclusively by the landowners, CITYHUB Properties. Rent starts from day one and runs through construction until first tenant / handover.</p>
        </div>
        <div className="glass xe-tbl">
          <table>
            <thead><tr><th scope="col">Investment</th><th scope="col">Share (sq.ft)</th><th scope="col">Rent / month</th><th scope="col">Rent / year</th></tr></thead>
            <tbody>
              {ROWS.map(l => { const [a, b, c, d] = lr(l); return row(l, !full && lakh === l, a, b, c, d, () => setLakh(l)) })}
              {custom && (() => { const [a, b, c, d] = lr(lakh); return row('c', true, a, b, c, d, () => {}, 'your pick') })()}
              {row('f', full, short(FULL.inv), <>{FLOOR.toLocaleString('en-IN')}<span className="xe-of"> · one floor</span></>, short(FULL.m), short(FULL.y), () => setTicket('Full floor'))}
            </tbody>
          </table>
          <p className="xs-fine">At ₹13,000/sq.ft and ₹65/sq.ft a month. Excludes GST, registration and other charges.</p>
        </div>
      </div>
    </XS>
  )
}
