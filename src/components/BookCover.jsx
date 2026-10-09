import { Ic, I } from '../ui.jsx'

/* the closed book: cream cover, gold edges, spine band */
export default function BookCover({ onOpen, interactive = false }) {
  return (
    <div className="cv">
      <i className="cv-spine" />
      <div className="cv-frame">
        <span className="cv-kana" aria-hidden="true">水</span>
        <p className="cv-brand">MIZU <small></small></p>
        <i className="cv-rule" />
        <h2>Investment Potential</h2>
        <p className="cv-sub">Explore Nearby Landmarks</p>
        <button type="button" className="cv-btn" tabIndex={interactive ? 0 : -1} onClick={onOpen}>Open Book <Ic d={I.arrow} size={18} /></button>
      </div>
      <i className="cv-edge" />
    </div>
  )
}
