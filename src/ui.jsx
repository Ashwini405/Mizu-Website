import { useEffect, useRef, useState, createContext, useContext } from 'react'
import { Link } from 'react-router-dom'
export const NavCtx = createContext(null)
export const BookCtx = createContext({ current: null })
export function useLenis() {}
export const SLink = ({ to, children, ...p }) => {
  const nav = useContext(NavCtx)
  return <Link to={to} {...p} onClick={e => { if (nav && !e.metaKey && !e.ctrlKey) { e.preventDefault(); nav(to) } }}>{children}</Link>
}
export function useTween(v, ms = 520) {
  const [x, setX] = useState(v), cur = useRef(v)
  useEffect(() => {
    const a = cur.current, t0 = performance.now(); let id
    const f = t => { const k = Math.min(1, (t - t0) / ms); cur.current = a + (v - a) * (1 - Math.pow(1 - k, 3)); setX(cur.current); if (k < 1) id = requestAnimationFrame(f) }
    id = requestAnimationFrame(f)
    return () => cancelAnimationFrame(id)
  }, [v])
  return x
}
export const I = {
  home: 'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
  pin: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14',
  bld: 'M5 21V6l8-3v18M13 9l6 2v10M3 21h18M8 9h2M8 13h2M8 17h2',
  rupee: 'M7 5h10M7 9h10M7 5h3a4 4 0 010 8H7l8 7',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4',
  steps: 'M5 3v18M5 5h12l-3 4 3 4H5',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  site: 'M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4',
  l: 'M15 5l-7 7 7 7', r: 'M9 5l7 7-7 7',
  arrow: 'M4 12h16M14 6l6 6-6 6',
  down: 'M6 9l6 6 6-6',
  coins: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v4c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 10v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4M4 14v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4',
  expand: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5M4 4l6 6M20 4l-6 6M4 20l6-6M20 20l-6-6',
  frame: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01',
  chart: 'M4 20v-6h3v6M10 20v-9h3v9M16 20V7h3v13M3 20h18',
  percent: 'M19 5L5 19M7 9a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 3.5-7 8-7s8 3 8 7',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 018 0v3',
  layers: 'M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5',
  chair: 'M8 3h8v8H8zM6 11h12M12 11v6M7 21l5-4 5 4',
  road: 'M9 3L5 21M15 3l4 18M12 4v3M12 11v3M12 18v3',
  bag: 'M5 8h14l-1 13H6zM9 8V6a3 3 0 016 0v2',
  tower: 'M5 21V3h10v18M15 9h4v12M3 21h18M8 7h2M8 11h2M8 15h2',
  leaf: 'M5 19C5 9 11 4 20 4c0 9-5 15-13 15M5 19l8-8',
  lift: 'M5 3h14v18H5zM12 3v18M7.5 9l1.5-2 1.5 2M13.5 15l1.5 2 1.5-2',
  ticket: 'M4 8h16v3a2 2 0 000 4v3H4v-3a2 2 0 000-4zM10 8v10',
  doc: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h4',
  hand: 'M3 15h4l5 2 6-2a2 2 0 00-2-3l-5 1M3 12v8h4M12 4a3 3 0 100 6 3 3 0 000-6z',
  cap: 'M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6',
  waves: 'M3 8c3-3 6 3 9 0s6 3 9 0M3 13c3-3 6 3 9 0s6 3 9 0M3 18c3-3 6 3 9 0s6 3 9 0',
  eye: 'M2 12c3-5 7-7 10-7s7 2 10 7c-3 5-7 7-10 7s-7-2-10-7zM12 15a3 3 0 100-6 3 3 0 000 6z',
  pie: 'M12 3a9 9 0 109 9h-9zM15 3.6A9 9 0 0120.4 9H15z',
  house: 'M3 11l9-8 9 8M5 10v10h14V10M9 20v-6h6v6'
}
export const Ic = ({ d, size = 20, sw = 1.7 }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
export const Foot = ({ dark }) => (
  <footer className={'foot' + (dark ? ' dark' : '')} />
)
/* Full-screen page. variant: building | returns | protection | process | enquire
   bg = full-bleed photo, pos = background-position, left = headline block, children = glass / cream panel */
export function Sheet({ variant, bg, pos = 'center', eyebrow = 'pill', left, children, panelLabel }) {
  const ref = useRef(), root = useRef()
  useEffect(() => {
    const enter = new IntersectionObserver(([e]) => { if (e.isIntersecting) { root.current && root.current.classList.add('in'); enter.disconnect() } }, { threshold: 0.18 })
    enter.observe(root.current)
    const els = [...ref.current.querySelectorAll('.card,.rrow,.step,.fcard,.pcard')]
    els.forEach((e, i) => { e.classList.add('rv'); e.style.setProperty('--d', i % 9) })
    const io = new IntersectionObserver(es => es.forEach(x => {
      if (x.isIntersecting) { x.target.classList.add('shown'); setTimeout(() => { x.target.style.transitionDelay = '0ms' }, 1400); io.unobserve(x.target) }
    }), { root: null, threshold: 0.12 })
    els.forEach(e => io.observe(e))
    return () => { io.disconnect(); enter.disconnect() }
  }, [])
  return (
    <div className={'slide v-' + variant} ref={root} style={{ '--bg': `url(${bg})`, '--pos': pos }}>
      <div className="sl-bg" aria-hidden="true" />
      <div className="sl-shade" aria-hidden="true" />
      {left && (
        <div className="sl-left">
          {eyebrow === 'none' ? null : eyebrow === 'pill' ? <span className="pill">MIZU </span> : <span className="eyebrow2">MIZU </span>}
          {left}
        </div>
      )}
      <div className="sl-panel" ref={ref} aria-label={panelLabel}>{children}</div>
    </div>
  )
}
