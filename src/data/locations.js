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

/* approx. off-peak drive times from the site */
export const DRIVE_TIMES = [
  ['ORR junction', '~5 min'],
  ['Gachibowli', '~10 min'],
  ['Kokapet / Neopolis', '~10 min'],
  ['HITEC City', '~20 min'],
  ['RGIA Airport', '~35 min'],
]
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
  { id: 'nvidia', name: 'NVIDIA', title: 'NVIDIA', subtitle: 'Neighbouring tech campus', tagline: 'Global tech as a neighbour',
    description: 'NVIDIA is one of the global tech campuses around MIZU, alongside Amazon and Google, adding to everyday demand for office space close to the site.',
    image: facade, gallery: [facade, t4, t2, t5, t3], features: FEATS, distances: [['MIZU', 'Nearby'], ...SITE_DISTANCES], map: { label: 'NVIDIA', pin: { x: 150, y: 40 } } },
  { id: 'waverock', name: 'WaveRock SEZ', title: 'WaveRock SEZ', subtitle: 'Office cluster nearby', tagline: 'An established office cluster',
    description: 'WaveRock SEZ is part of the office cluster around MIZU, with My Home RMZ and Knowledge Capital, on Narsingi–Nanakramguda Road.',
    image: office, gallery: [office, t5, t4, t3, t2], features: FEATS, distances: [['MIZU', 'Nearby'], ...SITE_DISTANCES], map: { label: 'WaveRock', pin: { x: 60, y: 120 } } },
  { id: 'myhome-rmz', name: 'My Home RMZ', title: 'My Home RMZ', subtitle: 'Jayabheri · My Home RMZ', tagline: 'Offices and homes around the site',
    description: 'Neighbours include My Home RMZ and the residential communities at Vasavi, One West, Jayabheri and Vajra’s Jasmine County, with Shri Ram Universal School, Apollo and Star Hospitals close by.',
    image: retail, gallery: [retail, t2, t5, t4, t3], features: FEATS, distances: [['MIZU', 'Nearby'], ...SITE_DISTANCES], map: { label: 'My Home RMZ', pin: { x: 170, y: 105 } } },
  { id: 'financial-district', name: 'Financial District', title: 'Financial District', subtitle: 'Hyderabad’s business address', tagline: 'In the heart of the district',
    description: 'MIZU is located in Hyderabad’s Financial District at Nanakramguda, set among Hyderabad’s largest office campuses, with direct ORR access.',
    image: night, gallery: [night, t3, t2, t5, t4], features: FEATS, distLabel: 'Approx. drive times', distances: DRIVE_TIMES, map: { label: 'Financial District', pin: { x: 105, y: 95 } } },
  { id: 'knowledge-city', name: 'Knowledge City', title: 'Knowledge City', subtitle: 'Knowledge Capital, next door', tagline: 'Next door, facing the lake',
    description: 'MIZU sits beside Knowledge Capital, with a landscaped buffer on the east that opens onto the water.',
    image: lobby, gallery: [lobby, t4, t3, t2, t5], features: FEATS, distances: [['MIZU', 'Next door'], ...SITE_DISTANCES], map: { label: 'Knowledge Capital', pin: { x: 128, y: 82 } } },
  { id: 'orr-exit', name: 'ORR Exit', title: 'ORR Exit', subtitle: 'Exit 19, Nanakramguda', tagline: 'The Outer Ring Road, minutes away',
    description: 'Outer Ring Road Exit 19 at Nanakramguda is 1.3 km from the site: about 5 minutes to the ORR, 10 to Gachibowli and Kokapet, and 35 to RGIA Airport.',
    image: office, gallery: [office, t5, t2, t3, t4], features: FEATS, distances: [['MIZU', '1.3 km'], ...SITE_DISTANCES], map: { label: 'ORR Exit 19', pin: { x: 40, y: 85 } } },
]
export const TOTAL = locations.length
