import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Scene from './Scene.jsx'
import PageTurn from './PageTurn.jsx'
import BookCover from './BookCover.jsx'
import { LeftPage, RightPage } from './LocationPage.jsx'
import { CTALeft, CTARight } from './CTAEndPage.jsx'
import { frontOf, backOf, leftOf, rightOf, SPREADS } from './BookPages.jsx'
import { locations, TOTAL } from '../data/locations.js'
import { Ic, I } from '../ui.jsx'
import { PAGE_W as W, PAGE_H as H, RIM, STAGE_W, STAGE_H, TIMING as T, clamp, tween, frame, placeBook } from '../animations/bookAnimations.js'

const reduce = () => matchMedia('(prefers-reduced-motion:reduce)').matches
let uid = 0

const keep = []
/* decode every photo up front so a page never lands with an empty picture */
function usePreload() {
  useEffect(() => {
    locations.forEach(l => l.gallery.forEach(src => { const im = new Image(); im.decoding = 'async'; im.src = src; keep.push(im); im.decode && im.decode().catch(() => {}) }))
  }, [])
}

export default function BookShowcase() {
  usePreload()
  const [mobile, setMobile] = useState(() => innerWidth < 860)
  useEffect(() => { const m = matchMedia('(max-width:859px)'), f = () => setMobile(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [])
  return (
    <section id="location" className="bk-section" aria-label="Nearby landmarks">
      <Scene blur />
      <div className="bk-head"><h2>Beside Knowledge Capital, facing the lake</h2><i /><p>MIZU sits on Narsingi-Nanakramguda Road, with Google, Amazon and NVIDIA campuses as neighbours and the Outer Ring Road minutes away. To the east, a landscaped buffer opens onto the water.</p></div>
      {mobile ? <MobileBook /> : <DesktopBook />}
    </section>
  )
}

/* ---------------------------------------------------------------- desktop: the 3D book */
function DesktopBook() {
  const [t, setT] = useState(0)               // leaves turned (0 = closed … 9 = call-to-action spread)
  const [leaf, setLeaf] = useState(null)      // the sheet that is turning right now
  const [thumbs, setThumbs] = useState({})
  const [k, setK] = useState(1)
  const wrap = useRef(), book = useRef(), leafRef = useRef(), lb = useRef(), ui = useRef(), root = useRef()
  const st = useRef({ t: 0, busy: false, visible: false, pending: null, alive: true })
  st.current.t = t

  /* fit the fixed-size stage to the screen (tablet = smaller book) */
  useLayoutEffect(() => {
    const fit = () => { const r = wrap.current.getBoundingClientRect(); setK(clamp(Math.min((r.width - 40) / STAGE_W, (r.height - 10) / STAGE_H), 0.3, 1.2)) }
    fit(); const ro = new ResizeObserver(fit); ro.observe(wrap.current); return () => ro.disconnect()
  }, [])
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { st.current.visible = e.isIntersecting }, { threshold: 0.35 })
    io.observe(root.current); return () => io.disconnect()
  }, [])

  const setLeft = a => { book.current && book.current.style.setProperty('--la', a) }

  /* -------- the timeline -------- */
  useEffect(() => {
    const S = st.current; S.alive = true
    const dur = d => (reduce() ? 0.01 : d)
    const waitCmd = ms => new Promise(res => {
      let el = 0
      const iv = setInterval(() => { if (S.visible && !document.hidden) el += 100; if (el >= ms * 1000) { clearInterval(iv); S.pending = null; res('timeout') } }, 100)
      S.pending = c => { clearInterval(iv); S.pending = null; res(c) }
    })
    const flip = async (j, dir, d, o = {}) => {
      const cover = j === 0
      setLeaf({ id: ++uid, j, n: o.n || 16, lag: cover ? 0.1 : o.lag || 0.32, cover, p0: dir > 0 ? 0 : 1 })
      await frame()
      const q = { p: dir > 0 ? 0 : 1 }
      await tween(q, { p: dir > 0 ? 1 : 0, duration: dur(d), ease: o.ease || 'power2.inOut', onUpdate: () => { leafRef.current && leafRef.current.set(q.p); o.on && o.on(q.p) } })
      setT(dir > 0 ? j + 1 : j); setLeaf(null); await frame()
    }
    const zoom = { s: 1 }
    const open = async () => {
      S.busy = true
      zoom.s = 1.05; placeBook(book.current, { x: -W / 2, s: 1.05, rx: 7 })
      await flip(0, 1, T.open, { ease: 'power2.inOut', on: p => { setLeft(clamp((p - 0.08) * 4)); placeBook(book.current, { x: (-W / 2) * (1 - p), s: 1.05 - 0.05 * p, rx: 7 * (1 - p) }) } })
      placeBook(book.current, { x: 0, s: 1, rx: 0 }); S.busy = false
    }
    const close = async () => {
      S.busy = true
      const from = S.t
      for (let j = from - 1; j >= 1; j--) {
        await flip(j, -1, T.rapid, { n: 8, lag: 0.25, ease: 'power1.inOut', on: () => {} })
        zoom.s = Math.max(0.9, zoom.s - 0.012); placeBook(book.current, { x: 0, s: zoom.s, rx: 0 })
      }
      await flip(0, -1, T.coverClose, { ease: 'power2.inOut', on: p => { setLeft(clamp(p * 4)); placeBook(book.current, { x: (-W / 2) * (1 - p), s: zoom.s + (1 - zoom.s) * (1 - p), rx: 7 * (1 - p) }) } })
      placeBook(book.current, { x: -W / 2, s: 1, rx: 0 }); setLeft(0); zoom.s = 1; S.busy = false
    }
    S.api = { open, close, flip }
    ;(async () => {
      setLeft(0); placeBook(book.current, { x: -W / 2, s: 1, rx: 0 })
      while (S.alive) {
        if (S.t === 0) { const c = await waitCmd(T.idle); if (!S.alive) break; if (c === 'timeout' && reduce()) { await waitCmd(1e6); continue } await open() }
        else {
          const cur = S.t, c = await waitCmd(cur === SPREADS ? T.cta : T.dwell)
          if (!S.alive) break
          S.busy = true
          if (c === 'prev' && cur > 1) await flip(cur - 1, -1, T.turn)
          else if (c === 'next' && cur < SPREADS) await flip(cur, 1, T.turn)
          else if (c === 'timeout') { if (cur < SPREADS) await flip(cur, 1, T.turn); else { S.busy = false; await close(); if (S.alive) await waitCmd(T.idle) } }
          S.busy = false
        }
      }
    })()
    return () => { S.alive = false; S.pending && S.pending('stop'); gsap.killTweensOf('*') }
  }, [])

  const send = c => { const S = st.current; if (!S.busy && S.pending) S.pending(c) }
  const onThumb = (i, kk) => setThumbs(o => ({ ...o, [i]: kk }))

  /* what the two static pages show */
  const sL = leaf ? leaf.j : t
  const sR = leaf ? leaf.j + 1 : Math.max(1, t)
  const s = { thumbs, onThumb, onOpen: () => send('open') }
  const frontEl = leaf && frontOf(leaf.j, s), backEl = leaf && backOf(leaf.j, s)
  const closed = t === 0 && !leaf

  return (
    <div className="bk-wrap" ref={el => { wrap.current = el; root.current = el }}>
      <div className="bk-stage" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${k})` }}>
        <div className="bk-persp">
          <div className={'bk-float' + (closed ? ' idle' : '')}>
            <div className="bk-book" ref={book}>
              <i className="bk-floor" />
              <div className="board l" style={{ left: -(W + RIM), top: -(H / 2 + RIM), width: W + RIM, height: H + RIM * 2 }}>
                <div className="pg-in l" style={{ right: 0, top: RIM, width: W, height: H }}>{sL >= 1 && leftOf(sL, s)}<i className="gut" /></div>
              </div>
              <div className="board r" style={{ left: 0, top: -(H / 2 + RIM), width: W + RIM, height: H + RIM * 2 }}>
                <div className="pg-in r" style={{ left: 0, top: RIM, width: W, height: H }}>{rightOf(sR)}<i className="gut" /></div>
              </div>
              <i className="hinge" style={{ top: -H / 2 + 128 }} /><i className="hinge" style={{ top: H / 2 - 150 }} />
              {closed && <div className={'cv-static'} style={{ left: 0, top: -(H / 2 + RIM), width: W + RIM, height: H + RIM * 2 }}><BookCover interactive onOpen={() => send('open')} /></div>}
              {leaf && <PageTurn key={leaf.id} ref={leafRef} front={frontEl} back={backEl} n={leaf.n} lag={leaf.lag} p0={leaf.p0}
                w={leaf.cover ? W + RIM : W} h={leaf.cover ? H + RIM * 2 : H} top={leaf.cover ? -(H / 2 + RIM) : -H / 2} />}
              <div className="bk-ui">
                {t > 1 && <button type="button" className="bk-nav prev" aria-label="Previous landmark" onClick={() => send('prev')} style={{ left: -W + 4 }}><Ic d={I.l} size={26} sw={2} /></button>}
                {t >= 1 && t < SPREADS && <button type="button" className="bk-nav next" aria-label="Next landmark" onClick={() => send('next')} style={{ left: W - 70 }}><Ic d={I.r} size={26} sw={2} /></button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- mobile: single page, swipe */
function MobileBook() {
  const ref = useRef(), [i, setI] = useState(0), vis = useRef(false), hold = useRef(0)
  const n = TOTAL + 1
  const go = k => { const el = ref.current; if (!el) return; const c = Math.max(0, Math.min(n - 1, k)); el.scrollTo({ left: c * el.clientWidth, behavior: 'smooth' }) }
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { vis.current = e.isIntersecting }, { threshold: 0.3 }); io.observe(ref.current)
    const iv = setInterval(() => {
      if (!vis.current || Date.now() < hold.current || reduce()) return
      const el = ref.current; const cur = Math.round(el.scrollLeft / el.clientWidth)
      go(cur >= n - 1 ? 0 : cur + 1)
    }, 8000)
    return () => { io.disconnect(); clearInterval(iv) }
  }, [])
  const [thumbs, setThumbs] = useState({})
  return (
    <div className="mb">
      <div className="mb-track" ref={ref} onScroll={e => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))} onTouchStart={() => { hold.current = Date.now() + 15000 }}>
        {locations.map((loc, q) => (
          <article className="mcard" key={loc.id} aria-label={loc.name}>
            <LeftPage loc={loc} i={q + 1} thumb={thumbs[q] || 0} onThumb={kk => setThumbs(o => ({ ...o, [q]: kk }))} />
            <RightPage loc={loc} />
          </article>
        ))}
        <article className="mcard" aria-label="Investment potential"><CTALeft /><CTARight /></article>
      </div>
      {i > 0 && <button type="button" className="mb-btn l" aria-label="Previous page" onClick={() => { hold.current = Date.now() + 15000; go(i - 1) }}><Ic d={I.l} size={22} sw={2} /></button>}
      {i < n - 1 && <button type="button" className="mb-btn r" aria-label="Next page" onClick={() => { hold.current = Date.now() + 15000; go(i + 1) }}><Ic d={I.r} size={22} sw={2} /></button>}
      <div className="mb-dots" role="group" aria-label="Pages">{Array.from({ length: n }, (_, q) => <button key={q} type="button" className={q === i ? 'on' : ''} aria-label={`Page ${q + 1}`} onClick={() => { hold.current = Date.now() + 15000; go(q) }} />)}</div>
    </div>
  )
}
