import gsap from 'gsap'

/* design size of the book, in px. The whole stage is scaled to fit the screen. */
export const PAGE_W = 800
export const PAGE_H = 740
export const RIM = 16               // leather board that overhangs the pages
export const STAGE_W = 1700
export const STAGE_H = 840

/* seconds */
export const TIMING = { idle: 3, open: 2.5, turn: 1.5, dwell: 8, cta: 5, close: 3, rapid: 0.27, coverClose: 0.95 }

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const smooth = x => x * x * (3 - 2 * x)

/* Absolute angle (deg) of every strip of a page while it turns.
   p = 0..1. The outer edge leads and the spine side follows (lag), so the paper curls. */
export function stripAngles(p, n, lag) {
  const out = []
  for (let i = 0; i < n; i++) {
    const u = (i + 1) / n
    out.push(180 * smooth(clamp(p * (1 + lag) - lag * (1 - u))))
  }
  return out
}

export const tween = (target, vars) => new Promise(res => gsap.to(target, { ...vars, onComplete: res }))
export const frame = () => new Promise(r => requestAnimationFrame(() => r()))

/* book container: x moves the spine, s is the camera zoom, rx the tilt */
export function placeBook(el, { x = 0, s = 1, rx = 0 }) {
  if (el) el.style.transform = `translate3d(${x}px,0,0) scale(${s}) rotateX(${rx}deg)`
}
