import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { NAV, SECTION_ID, MAP_URL } from './data.js'
import { I, Ic, NavCtx, SLink } from './ui.jsx'
import Home from './pages/Home.jsx'

function Splash() {
  const [ph, setPh] = useState('show')
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const a = setTimeout(() => setPh('out'), 3500), b = setTimeout(() => { setPh('gone'); document.body.style.overflow = '' }, 4200)
    return () => { clearTimeout(a); clearTimeout(b); document.body.style.overflow = '' }
  }, [])
  if (ph === 'gone') return null
  return (
    <div className={'splash' + (ph === 'out' ? ' out' : '')} role="status" aria-label="Loading MIZU by ISTA">
      <div className="sp-in">
        <span className="sp-kana">水</span>
        <b className="sp-name">MIZU</b>
        <small className="sp-by">BY ISTA · CITYHUB PROPERTIES</small>
      </div>
    </div>
  )
}

export default function App() {
  const [lakh, setLakh] = useState(130)
  const [ticket, setTicket] = useState(null)
  const { pathname } = useLocation()
  const go = useNavigate()
  const active = SECTION_ID[pathname] ? pathname : '/'
  const idx = Math.max(0, NAV.findIndex(n => n[0] === active))
  /* one page at a time: every link opens its own full-window page */
  const nav = to => { if (SECTION_ID[to] && to !== pathname) go(to) }
  const step = d => nav(NAV[(idx + d + NAV.length) % NAV.length][0])
  const s = { lakh, setLakh: v => { setTicket(null); setLakh(v) }, ticket, setTicket }
  return (
    <NavCtx.Provider value={nav}>
      <Splash />
      <div className="bg" aria-hidden="true"><i /><i /><i /></div>
      <header className={'topbar' + ' on-dark'}>
        <SLink className="logo" to="/" aria-label="MIZU by ISTA, home"><span>水</span><b>MIZU<small>BY ISTA</small></b></SLink>
        <nav className="pillbar" aria-label="Quick links">
          <SLink to="/enquire" title="Enquire" aria-label="Enquire"><Ic d={I.mail} /></SLink>
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer" title="Open the site on Google Maps" aria-label="Open the site on Google Maps"><Ic d={I.site} /></a>
          <SLink to="/returns" title="Returns" aria-label="Returns"><Ic d={I.rupee} /></SLink>
        </nav>
        <SLink className="topr" to="/enquire">ENQUIRE <Ic d={I.arrow} size={18} /></SLink>
      </header>
      <nav className="dock" aria-label="Main">
        {NAV.map(([to, label, ic]) => <a key={to} href={'#' + to} data-l={label} aria-label={label} aria-current={to === active ? 'true' : undefined} className={to === active ? 'active' : ''} onClick={e => { e.preventDefault(); nav(to) }}><Ic d={I[ic]} /></a>)}
      </nav>
      <Routes>
        <Route path="*" element={<Home {...s} active={active} />} />
      </Routes>
      <button className="arrow prev" aria-label="Previous section" onClick={() => step(-1)}><Ic d={I.l} /></button>
      <button className="arrow next" aria-label="Next section" onClick={() => step(1)}><Ic d={I.r} /></button>
    </NavCtx.Provider>
  )
}
