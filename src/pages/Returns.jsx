import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import bg from '../assets/home-bg.jpg'
import { Ic, I } from '../ui.jsx'
import { money, short, calc } from '../data.js'
/* hub-and-spoke "ticket" diagram. x,y,w,h = pill box in a 1000 x 600 stage; ix,iy = icon centre;
   top/left = where the icon sits (on the pill's top edge, or inside at the left); ax,ay = where the spoke meets the pill */
const BASE = [
  { k: 'inv', v: '₹30 L', l: 'Investment', ic: 'layers', col: 'peach', x: 232, y: 48, w: 243, h: 120, pos: 'top', ax: 397, ay: 168 },
  { k: 'sq', v: '~231 sq.ft', l: 'Share', ic: 'expand', col: 'sage', x: 542, y: 48, w: 262, h: 120, pos: 'top', ax: 592, ay: 168 },
  { v: '₹1.3 Cr', l: 'Total value', ic: 'rupee', col: 'blue', x: 5, y: 170, w: 290, h: 117, pos: 'left', ax: 295, ay: 265 },
  { k: 'rm', v: '₹15,000', l: 'Rent a month', ic: 'cal', col: 'tan', x: 692, y: 168, w: 303, h: 117, pos: 'left', ax: 692, ay: 262 },
  { v: '1,000 sq.ft', l: 'Typical office area', ic: 'frame', col: 'lilac', x: 10, y: 307, w: 307, h: 118, pos: 'left', ax: 317, ay: 350 },
  { k: 'ry', v: '₹1.8 L', l: 'Rent a year', ic: 'chart', col: 'blue', x: 692, y: 307, w: 303, h: 118, pos: 'left', ax: 692, ay: 345 },
  { v: '₹7.8 L', l: 'per year (for 1,000 sq.ft)', ic: 'pie', col: 'sage', x: 192, y: 457, w: 290, h: 138, pos: 'top', ax: 388, ay: 457 },
  { v: '₹65,000', l: 'per month (for 1,000 sq.ft)', ic: 'bld', col: 'peach', x: 520, y: 457, w: 282, h: 138, pos: 'top', ax: 572, ay: 457 }
]
const HUB = [495, 318]
const crore = r => '₹' + (r / 1e7).toFixed(2).replace(/\.?0+$/, '') + ' Cr'
const yearly = y => y >= 1e7 ? crore(y) : '₹' + (Math.round(y / 1e4) / 10).toLocaleString('en-IN') + ' L'
/* values for the ticket chosen on the Home page */
function live(lakh, ticket) {
  if (ticket === 'Full floor') return { inv: '₹32.02 Cr', sq: 'Full floor', rm: '₹16 L', ry: '₹1.92 Cr' }
  const c = calc(lakh)
  return { inv: money(lakh), sq: (lakh === 30 ? '~' : '') + Math.round(c.sq).toLocaleString('en-IN') + ' sq.ft', rm: short(c.m), ry: yearly(c.y) }
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
        <h1>Retail at street level, <span>offices above</span></h1>
        <p>A well-planned mixed-use building with retail on the ground and first floor, and modern offices above.</p>
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
