import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import { stripAngles, clamp, PAGE_W, PAGE_H } from '../animations/bookAnimations.js'

/* A turning sheet, built from n narrow vertical strips that hinge on each other.
   Each strip has a front face and a back face, so the paper bends as it turns.
   The parent drives it with ref.set(p): p = 0 (flat on the right) to 1 (flat on the left).
   Nothing re-renders while it animates — styles are written straight to the DOM. */
const PageTurn = forwardRef(function PageTurn({ front, back, w = PAGE_W, h = PAGE_H, top = 0, n = 16, lag = 0.32, p0 = 0 }, ref) {
  const sw = w / n
  const strips = useRef([]), fs = useRef([]), bs = useRef([]), fh = useRef([]), bh = useRef([]), sr = useRef(), sl = useRef()

  const set = p => {
    const ang = stripAngles(p, n, lag)
    let prev = 0, x = 0
    for (let i = 0; i < n; i++) {
      const a = ang[i], r = a * Math.PI / 180, cos = Math.cos(r), curve = a - prev
      strips.current[i].style.transform = `rotateY(${-(a - prev)}deg)`
      const front = a < 90, hl = clamp(curve / 8) * 0.34
      fs.current[i].style.opacity = front ? 0.4 * (1 - cos) : 0
      bs.current[i].style.opacity = front ? 0 : 0.4 * (1 + cos)
      fh.current[i].style.opacity = front ? hl : 0
      bh.current[i].style.opacity = front ? 0 : hl
      x += sw * cos; prev = a
    }
    /* soft shadow the sheet casts on the page underneath */
    const lift = Math.sin((ang[n - 1] * Math.PI) / 180), a = 0.42 * lift
    const c = `25,12,0`
    if (x > 0) {
      sr.current.style.background = `linear-gradient(90deg,rgba(${c},${a}) 0,rgba(${c},${a}) ${x}px,rgba(${c},0) ${x + 120}px)`
      sl.current.style.background = 'none'
    } else {
      sl.current.style.background = `linear-gradient(270deg,rgba(${c},${a}) 0,rgba(${c},${a}) ${-x}px,rgba(${c},0) ${-x + 120}px)`
      sr.current.style.background = 'none'
    }
  }
  useImperativeHandle(ref, () => ({ set }))
  useLayoutEffect(() => { set(p0) }, [])

  const build = i => (
    <div key={i} className="pt-s" ref={el => (strips.current[i] = el)} style={{ width: sw + 0.75, height: h, left: i ? sw : 0 }}>
      <div className="pt-f"><div className="pt-c" style={{ width: w, height: h, left: -i * sw }}>{front}</div><i className="pt-sh" ref={el => (fs.current[i] = el)} /><i className="pt-hl" ref={el => (fh.current[i] = el)} /></div>
      <div className="pt-b"><div className="pt-c" style={{ width: w, height: h, left: -(w - (i + 1) * sw) }}>{back}</div><i className="pt-sh" ref={el => (bs.current[i] = el)} /><i className="pt-hl" ref={el => (bh.current[i] = el)} /></div>
      {i < n - 1 && build(i + 1)}
    </div>
  )
  return (
    <>
      <div className="pt-shadow" ref={sr} style={{ left: 0, top: -PAGE_H / 2, width: PAGE_W, height: PAGE_H }} />
      <div className="pt-shadow" ref={sl} style={{ left: -PAGE_W, top: -PAGE_H / 2, width: PAGE_W, height: PAGE_H }} />
      <div className="pt" style={{ top, width: w, height: h }} aria-hidden="true">{build(0)}</div>
    </>
  )
})
export default PageTurn
