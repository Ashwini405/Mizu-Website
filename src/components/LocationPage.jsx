import { useEffect, useRef } from 'react'
import { Ic, I } from '../ui.jsx'
import { TOTAL } from '../data/locations.js'

const pad = n => String(n).padStart(2, '0')
const ICONS = {
  brief: 'M4 8h16v11H4zM9 8V6a2 2 0 012-2h2a2 2 0 012 2v2M4 13h16M11 13v2h2v-2',
  people: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-3 2.7-5 6-5s6 2 6 5M16 5.2a3 3 0 010 5.6M18 15c2 .6 3 2.3 3 5',
  tower: I.tower, chart: I.chart
}

export function Logo({ id, name }) {
  if (id === 'amazon') return (
    <span className="lg lg-amz" aria-label="amazon"><b>amazon</b>
      <svg viewBox="0 0 120 20" aria-hidden="true"><path d="M8 4c24 14 70 14 102-2" fill="none" stroke="#F90" strokeWidth="4" strokeLinecap="round" /><path d="M104 0l10 2-4 9" fill="none" stroke="#F90" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>)
  if (id === 'mizu') return <span className="lg lg-t" aria-label="MIZU" style={{ fontFamily: 'var(--kana)', fontSize: 40 }}>水</span>
  if (id === 'google') return <span className="lg lg-g" aria-label="Google"><i style={{ color: '#4285F4' }}>G</i><i style={{ color: '#EA4335' }}>o</i><i style={{ color: '#FBBC05' }}>o</i><i style={{ color: '#4285F4' }}>g</i><i style={{ color: '#34A853' }}>l</i><i style={{ color: '#EA4335' }}>e</i></span>
  return <span className="lg lg-t" aria-label={name}>{name}</span>
}

/* little Google-style map. Everything is drawn in SVG so the pin follows the data. */
export function MiniMap({ map }) {
  const { x, y } = map.pin, lw = Math.max(54, map.label.length * 7.2 + 18)
  return (
    <div className="mm" role="img" aria-label={`Map: ${map.label} and MIZU`}>
      <svg viewBox="0 0 292 282" width="292" height="282">
        <rect width="292" height="282" fill="#E9E3D2" />
        <g fill="#CFD9B3" opacity=".85"><ellipse cx="62" cy="40" rx="30" ry="18" /><ellipse cx="215" cy="30" rx="26" ry="14" /><ellipse cx="38" cy="150" rx="26" ry="22" /><ellipse cx="170" cy="190" rx="28" ry="18" /><ellipse cx="90" cy="236" rx="30" ry="16" /></g>
        <path d="M205 0c-10 40 22 54 18 96s-30 52-24 100 20 60 8 86H292V0z" fill="#9CC6D6" />
        <g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round"><path d="M-10 70L120 30 190 120" /><path d="M20 -5L70 120 140 230 150 290" /><path d="M-5 200L130 150 205 190" /><path d="M120 30L140 -5" /></g>
        <g fill="none" stroke="#F5EFE0" strokeWidth="3"><path d="M0 120L80 110 150 140" /><path d="M60 0L90 60" /><path d="M170 230L240 262" /></g>
        <path d={`M${x} ${y + 12}L${x + 8} ${y + 44}L96 150`} fill="none" stroke="#F0B84A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={x} cy={y + 12} r="4" fill="#fff" stroke="#222" strokeWidth="2" />
        <g transform={`translate(${Math.max(8, Math.min(292 - lw - 8, x - lw / 2))} ${y - 22})`}><rect width={lw} height="26" rx="9" fill="#fff" stroke="rgba(0,0,0,.08)" /><text x={lw / 2} y="17.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#222" fontFamily="Figtree,sans-serif">{map.label}</text></g>
        <g transform="translate(96 150)"><circle r="23" fill="#EFD9A4" opacity=".85" /><path d="M0 12C-8 3-9-3-9-6a9 9 0 0118 0c0 3-1 9-9 18z" transform="translate(0 -9)" fill="#B08040" /><circle cy="-15" r="3.4" fill="#fff" /><text y="26" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="1" fill="#2a2118" fontFamily="Figtree,sans-serif">MIZU</text></g>
        <text x="250" y="140" fontSize="8.5" fill="#4F7C90" textAnchor="middle" fontFamily="Figtree,sans-serif">Durgam</text><text x="250" y="150" fontSize="8.5" fill="#4F7C90" textAnchor="middle" fontFamily="Figtree,sans-serif">Cheruvu</text><text x="250" y="160" fontSize="8.5" fill="#4F7C90" textAnchor="middle" fontFamily="Figtree,sans-serif">(Lake)</text>
        <g transform="translate(262 252)"><text y="-14" textAnchor="middle" fontSize="8" fill="#555" fontFamily="Figtree,sans-serif">N</text><path d="M0 -10L8 10L0 5L-8 10Z" fill="#2a2118" /></g>
      </svg>
    </div>
  )
}

/* LEFT page: the big photo, counter, title, thumbnails */
export function LeftPage({ loc, i, thumb = 0, onThumb }) {
  const g = loc.gallery
  const first = useRef(true)
  useEffect(() => { first.current = false }, [])
  return (
    <div className={'lp lp-left lp-' + loc.id}>
      <div className="lp-img"><img key={g[thumb]} className={first.current ? '' : 'fx'} src={g[thumb]} alt={`${loc.name}, ${loc.subtitle}`} draggable="false" />{loc.id === 'mizu' && <i className="lp-veil" aria-hidden="true" />}</div>
      <span className="lp-count">{pad(i)} / {pad(TOTAL)}</span>
      <button type="button" className="lp-gal" onClick={() => onThumb && onThumb((thumb + 1) % g.length)}>View Gallery</button>
      <h2 className="lp-title">{loc.title}</h2>
      <p className="lp-sub">{loc.subtitle}</p>
      <div className="lp-thumbs" role="group" aria-label="Gallery">
        {g.map((s, k) => <button type="button" key={k} className={k === thumb ? 'on' : ''} aria-label={`Photo ${k + 1}`} aria-pressed={k === thumb} onClick={() => onThumb && onThumb(k)}><img src={s} alt="" draggable="false" /></button>)}
      </div>
    </div>
  )
}

/* RIGHT page: about, feature cards, distances, map */
export function RightPage({ loc }) {
  return (
    <div className="lp lp-right">
      <p className="lp-lab">About</p>
      <div className="lp-head"><h2>{loc.name}</h2><Logo id={loc.id} name={loc.name} /></div>
      <p className="lp-tag">{loc.tagline}</p>
      <p className="lp-desc">{loc.description}</p>
      <ul className="lp-feat">
        {loc.features.map(([ic, t]) => <li key={t}><Ic d={ICONS[ic]} size={30} sw={1.5} /><span>{t}</span></li>)}
      </ul>
      <div className="lp-low">
        <div className="lp-dist">
          <p className="lp-lab">{loc.distLabel || 'Key distances'}</p>
          <ul>{loc.distances.map(([a, b]) => <li key={a}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" fill="#B28045" /><circle cx="12" cy="10" r="2.6" fill="#fff" /></svg><span>{a}</span><b>{b}</b></li>)}</ul>
        </div>
        <MiniMap map={loc.map} />
      </div>
    </div>
  )
}
