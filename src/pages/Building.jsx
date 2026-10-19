import bg from '../assets/facade.jpg'
import facade from '../assets/facade.jpg'
import detail from '../assets/loc/hero.jpg'
import siteplan from '../assets/siteplan.jpg'
import { Ic, I } from '../ui.jsx'
/* value, label, icon, icon colour */
const STATS = [
  ['G + 11', 'with 4 basement levels', 'layers', 'peach'],
  ['~2,97,551', 'sq.ft built-up', 'expand', 'sage'],
  ['24,634', 'sq.ft typical office floor', 'chair', 'tan'],
  ['80 ft', 'road frontage', 'road', 'blue'],
  ['Ground & 1st', 'retail', 'bag', 'peach'],
  ['2nd to 11th', 'offices', 'tower', 'sage'],
  ['6th floor', 'environmental deck', 'leaf', 'moss'],
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
        <p>A Ground + 11 tower on ~1.03 acres: retail on the ground and first floors, offices from the 2nd to the 11th, and four levels of parking below.</p>
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

/* shared shell for the extra panels below each page */
export function XS({ eye, title, lead, children, className = '' }) {
  return (
    <div className={'xs ' + className} style={{ '--bg': `url(${bg})` }}>
      <div className="xs-bg" aria-hidden="true" /><div className="xs-shade" aria-hidden="true" />
      {(eye || title) && <header className="xs-head">
        {eye && <p className="rt2-eye"><i />{eye}<i /></p>}
        {title && <h2>{title}</h2>}
        {lead && <p className="xs-lead">{lead}</p>}
      </header>}
      {children}
    </div>
  )
}

const PILLARS = [['leaf', 'Nature integrated'], ['gate', 'Japanese minimalism'], ['waves', 'Waterfront views'], ['stones', 'Balanced spaces'], ['tree', 'Sustainable tomorrow']]
export function BuildingDesign() {
  return (
    <XS className="xs-design">
      <div className="xd">
        <div className="xd-copy glass">
          <p className="xs-kick">THE DESIGN</p>
          <h2><span className="xd-kana" aria-hidden="true">水</span>A place where business <em>flows naturally</em></h2>
          <i className="xs-rule" />
          <p>Mizu means water. Timber fins, planted balconies and an environmental deck at the sixth floor, opening to the lake on the east.</p>
          <ul className="xd-pillars">
            {PILLARS.map(([ic, t]) => <li key={t}><span><Ic d={I[ic]} size={22} sw={1.5} /></span>{t}</li>)}
          </ul>
          <p className="xs-fine">Concept design. Final elevation is under development and may differ.</p>
        </div>
        <figure className="xd-img">
          <img src={facade} alt="MIZU by ISTA, front elevation at dusk" loading="lazy" />
          <img className="xd-inset" src={detail} alt="Offices behind timber fins" loading="lazy" />
          <figcaption>Front elevation (north) · concept image</figcaption>
        </figure>
      </div>
    </XS>
  )
}

/* top → bottom; f = relative height */
const STACK = [
  ['Terrace', '', 'sk-ter', .7],
  ['Offices', '7 – 11', 'sk-off', 2.6],
  ['Environmental deck', '6', 'sk-eco', .8],
  ['Offices', '2 – 6', 'sk-off', 2.6],
  ['Retail', '1', 'sk-ret', .85],
  ['Retail', 'G', 'sk-ret', .85],
  ['Parking', 'B1 – B4', 'sk-park', 1.3]
]
const SPECS = [
  ['Land', '~1.03 acres'], ['Built-up area', '~2,97,551 sq.ft'], ['Structure', 'Ground + 11, 4 basements'],
  ['Retail', 'Ground & 1st floors'], ['Offices', '2nd – 11th floors'], ['Typical floor', '24,634 sq.ft'],
  ['Environmental deck', 'At the 6th floor'], ['Frontage', '80 ft wide road'], ['Lifts', '6 passenger + 2 goods']
]
export function BuildingSection() {
  return (
    <XS eye="THE BUILDING" title={<>Ground + 11, <span>four basements</span></>} lead="Retail at street level, ten office floors above, a green deck in the middle.">
      <div className="xsx">
        <figure className="sk glass" aria-label="Building section">
          <div className="sk-col">
            {STACK.map(([a, b, c, f], i) => (
              <div key={i} className={'sk-band ' + c} style={{ flexGrow: f, '--i': STACK.length - i }}>
                <span>{a}</span><b>{b}</b>
              </div>
            ))}
          </div>
          <figcaption>Section, not to scale.</figcaption>
        </figure>
        <dl className="specs glass">
          {SPECS.map(([k, v], i) => <div key={k} style={{ '--i': i }}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </div>
    </XS>
  )
}

const UNITS = [['Office 01', '6,753'], ['Office 02', '8,900'], ['Office 03', '4,273'], ['Office 04', '4,708']]
export function BuildingPlan() {
  return (
    <XS eye="SITE PLAN" title={<>Gates on the 80 ft road, <span>the lake to the east</span></>}>
      <div className="xp">
        <figure className="xp-img glass">
          <img src={siteplan} alt="Site plan: 80 ft north road with exit and entry gates, 23 ft driveways around the building, buffer area and water body to the east" loading="lazy" />
          <figcaption>Entry and exit gates on the 80 ft north road, 23 ft driveways all round, and a landscaped buffer opening onto the water body to the east. <span>Indicative site plan. North at top.</span></figcaption>
        </figure>
        <div className="xp-side">
          <div className="glass xp-units">
            <p className="xs-kick">TYPICAL OFFICE FLOOR</p>
            <table>
              <thead><tr><th scope="col">Unit</th><th scope="col">Area (sq.ft)</th></tr></thead>
              <tbody>{UNITS.map(([u, a]) => <tr key={u}><th scope="row">{u}</th><td>{a}</td></tr>)}</tbody>
              <tfoot><tr><th scope="row">Floor total</th><td>24,634</td></tr></tfoot>
            </table>
            <p className="xs-fine">Typical floor, levels 2–11. Areas as per plan; subject to final approvals.</p>
          </div>
          <ul className="xp-hl">
            <li className="glass"><Ic d={I.lift} size={26} sw={1.5} /><div><b>8 lifts</b><small>6 passenger + 2 goods</small></div></li>
            <li className="glass"><Ic d={I.road} size={26} sw={1.5} /><div><b>80 ft road frontage</b><small>Separate entry and exit gates</small></div></li>
            <li className="glass"><Ic d={I.waves} size={26} sw={1.5} /><div><b>23 ft driveway</b><small>All around; lake buffer to the east</small></div></li>
          </ul>
        </div>
      </div>
    </XS>
  )
}
