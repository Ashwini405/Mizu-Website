import { locations, TOTAL } from '../data/locations.js'
import { LeftPage, RightPage } from './LocationPage.jsx'
import { CTALeft, CTARight } from './CTAEndPage.jsx'
import BookCover from './BookCover.jsx'
import { PAGE_W, PAGE_H, RIM } from '../animations/bookAnimations.js'

/* Spread numbers run 1..9. Spreads 1..8 are the landmarks (from data), spread 9 is the call to action.
   Leaf j turns from the right to the left. Its front is the right page of spread j (the cover for j = 0),
   its back is the left page of spread j + 1. */
export const SPREADS = TOTAL + 1

export const leftOf = (s, st) => s < 1 ? null : s > TOTAL ? <CTALeft /> : <LeftPage loc={locations[s - 1]} i={s} thumb={st.thumbs[s - 1] || 0} onThumb={st.onThumb && (k => st.onThumb(s - 1, k))} />
export const rightOf = s => s > TOTAL ? <CTARight /> : <RightPage loc={locations[Math.max(0, s - 1)]} />

export const frontOf = (j, st) => j === 0 ? <BookCover onOpen={st.onOpen} interactive={false} /> : rightOf(j)
export const backOf = (j, st) => (
  <div className={'board-back' + (j === 0 ? ' cov' : '')}>
    <div className="pg-in" style={{ right: 0, top: j === 0 ? RIM : 0, width: PAGE_W, height: PAGE_H }}>{leftOf(j + 1, { thumbs: st.thumbs })}</div>
  </div>
)
