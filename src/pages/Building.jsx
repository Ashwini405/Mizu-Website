import bg from '../assets/home-bg.jpg'
import { Ic, I } from '../ui.jsx'
/* value, label, icon, icon colour */
const STATS = [
  ['G + 11', 'with 4 basement levels', 'layers', 'peach'],
  ['~2.98 lakh', 'sq.ft built-up', 'expand', 'sage'],
  ['24,634', 'sq.ft typical office floor', 'chair', 'tan'],
  ['80 ft', 'road frontage', 'road', 'blue'],
  ['Ground & 1st', 'retail', 'bag', 'peach'],
  ['2nd to 11th', 'offices', 'tower', 'sage'],
  ['6th floor', 'green deck', 'leaf', 'moss'],
  ['6 + 2', 'passenger and goods lifts', 'lift', 'cream']
]
export default function Building() {
  return (
    <div className="b3" style={{ '--bg': `url(${bg})` }}>
      <div className="b3-bg" aria-hidden="true" /><div className="b3-shade" aria-hidden="true" />
      <section className="b3-hero" aria-label="About the building">
        <div className="b3-brand"><i /><span>MIZU</span><i /></div>
        <h1>Retail at street level, offices above</h1>
        <i className="b3-rule" />
        <p>A well-planned mixed-use building with retail on the ground and first floor, and modern offices above.</p>
      </section>
      <div className="b3-grid">
        {STATS.map(([v, l, ic, col], i) => (
          <div className="b3-card" key={v} style={{ '--i': i }}>
            <span className={'ic ' + col}><Ic d={I[ic]} size={34} sw={1.5} /></span>
            <i className="b3-div" aria-hidden="true" />
            <div><strong>{v}</strong><small>{l}</small></div>
          </div>
        ))}
      </div>
    </div>
  )
}
