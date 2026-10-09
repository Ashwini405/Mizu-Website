import homeBg from '../assets/home-bg.jpg'
import sceneImg from '../assets/loc/scene.jpg'

const CITY = [[0,22,38],[24,14,60],[40,18,48],[60,12,78],[74,20,56],[96,14,92],[112,22,64],[136,12,104],[150,18,70],[170,26,52],[198,14,86],[214,20,60],[236,16,42],[254,24,66],[280,14,30]]
/* The shared sunset backdrop. With `blur` it becomes the soft depth-of-field version used behind the book. */
export default function Scene({ blur = false }) {
  return (
    <div className={'scene' + (blur ? ' blur' : '')} aria-hidden="true" style={blur ? { '--sbg': `url(${homeBg})` } : undefined}>
      <i className="sc-sky" /><i className="sc-sun" />
      <svg className="sc-city" viewBox="0 0 300 110" preserveAspectRatio="none">
        <defs><linearGradient id={'cg' + (blur ? 'b' : 'a')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8FB0D6" /><stop offset="1" stopColor="#D8C7BD" /></linearGradient></defs>
        {CITY.map(([x, w, h], i) => <rect key={i} x={x} y={110 - h} width={w} height={h} fill={`url(#cg${blur ? 'b' : 'a'})`} opacity={0.72 + (i % 3) * 0.08} />)}
      </svg>
      <i className="sc-lake" />
      <img className="sc-bld" src={sceneImg} alt="" />
      <i className="sc-leaf l1" /><i className="sc-leaf l2" /><i className="sc-leaf l3" /><i className="sc-leaf r1" />
      <i className="sc-floor" />
      <i className="sc-haze" />
    </div>
  )
}
