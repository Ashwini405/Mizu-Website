/* All book pages are generated from this file.
   NOTE: Amazon's text and distances come from your reference design.
   For the other seven pages the photos are PLACEHOLDERS and the "MIZU" distance is a
   neutral label — replace them with real photos and verified distances (see TODO). */
import amazon from '../assets/loc/amazon.jpg'
import sunset from '../assets/loc/sunset.jpg'
import facade from '../assets/loc/facade.jpg'
import office from '../assets/loc/office.jpg'
import retail from '../assets/loc/retail.jpg'
import night from '../assets/loc/hero.jpg'
import lobby from '../assets/loc/lobby.jpg'
import t1 from '../assets/loc/t1.jpg'; import t2 from '../assets/loc/t2.jpg'; import t3 from '../assets/loc/t3.jpg'
import t4 from '../assets/loc/t4.jpg'; import t5 from '../assets/loc/t5.jpg'

export const SITE_DISTANCES = [
  ['Knowledge Capital', 'Next door'],
  ['Sohini Tech Park', '0.7 km'],
  ['Continental Hospitals', '0.75 km'],
  ['Apollo Hospitals', '0.9 km'],
  ['ORR Exit 19, Nanakramguda', '1.3 km'],
]
const feat = (a, b, c, d) => [['brief', a], ['people', b], ['tower', c], ['chart', d]]
const FEATS = feat('Major Hiring Hub', 'Global Workforce', 'Premium Infrastructure', 'High Rental Demand')
const GENERIC = 'One of the large technology employers around Hyderabad’s Financial District, adding to everyday demand for office space close to MIZU.'

export const locations = [
  { id: 'amazon', name: 'Amazon', title: 'Amazon', subtitle: 'Global Campus in Nanakramguda', tagline: 'A global tech leader, next door',
    description: 'Amazon’s prestigious campus is just minutes from MIZU, making it a high-demand location for professionals, businesses and investors. This proximity drives strong rental demand and long-term value.',
    image: amazon, gallery: [amazon, t2, t3, t4, t5], features: FEATS, distances: [['MIZU', '0.7 km'], ...SITE_DISTANCES], map: { label: 'amazon', pin: { x: 112, y: 70 } } },
  { id: 'google', name: 'Google', title: 'Google', subtitle: 'Neighbouring campus', tagline: 'A neighbour with global reach',
    description: 'Google’s campus is among the neighbours around MIZU on Narsingi–Nanakramguda Road, keeping a steady stream of professionals and businesses in the area.',
    image: sunset, gallery: [sunset, t3, t5, t2, amazon], features: FEATS, distances: [['MIZU', 'Nearby'], ...SITE_DISTANCES], map: { label: 'Google', pin: { x: 70, y: 52 } } },
  { id: 'microsoft', name: 'Microsoft', title: 'Microsoft', subtitle: 'Technology hub nearby', tagline: 'Technology talent, close by',
    description: GENERIC, image: facade, gallery: [facade, t4, t2, t5, t3], features: FEATS, distances: [['MIZU', 'Nearby'], ...SITE_DISTANCES], map: { label: 'Microsoft', pin: { x: 150, y: 40 } } },
  { id: 'wipro', name: 'Wipro', title: 'Wipro', subtitle: 'IT campus nearby', tagline: 'Established IT demand',
    description: GENERIC, image: office, gallery: [office, t5, t4, t3, t2], features: FEATS, distances: [['MIZU', 'Nearby'], ...SITE_DISTANCES], map: { label: 'wipro', pin: { x: 60, y: 120 } } },
  { id: 'infosys', name: 'Infosys', title: 'Infosys', subtitle: 'IT campus nearby', tagline: 'Steady office demand',
    description: GENERIC, image: retail, gallery: [retail, t2, t5, t4, t3], features: FEATS, distances: [['MIZU', 'Nearby'], ...SITE_DISTANCES], map: { label: 'Infosys', pin: { x: 170, y: 105 } } },
  { id: 'financial-district', name: 'Financial District', title: 'Financial District', subtitle: 'Hyderabad’s business address', tagline: 'In the heart of the district',
    description: 'MIZU is located in Hyderabad’s Financial District at Nanakramguda, surrounded by corporate campuses, hospitals and the Outer Ring Road.',
    image: night, gallery: [night, t3, t2, t5, t4], features: FEATS, distances: [['MIZU', 'In the district'], ...SITE_DISTANCES], map: { label: 'Financial District', pin: { x: 105, y: 95 } } },
  { id: 'knowledge-city', name: 'Knowledge City', title: 'Knowledge City', subtitle: 'Knowledge Capital, next door', tagline: 'Next door, facing the lake',
    description: 'MIZU sits beside Knowledge Capital, with a landscaped buffer on the east that opens onto the water.',
    image: lobby, gallery: [lobby, t4, t3, t2, t5], features: FEATS, distances: [['MIZU', 'Next door'], ...SITE_DISTANCES], map: { label: 'Knowledge Capital', pin: { x: 128, y: 82 } } },
  { id: 'orr-exit', name: 'ORR Exit', title: 'ORR Exit', subtitle: 'Exit 19, Nanakramguda', tagline: 'The Outer Ring Road, minutes away',
    description: 'Outer Ring Road Exit 19 at Nanakramguda is 1.3 km from the site, giving quick access to the rest of Hyderabad.',
    image: office, gallery: [office, t5, t2, t3, t4], features: FEATS, distances: [['MIZU', '1.3 km'], ...SITE_DISTANCES], map: { label: 'ORR Exit 19', pin: { x: 40, y: 85 } } },
]
export const TOTAL = locations.length
