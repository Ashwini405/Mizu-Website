export const PRICE = 13000, RATE = 65, FLOOR = 24634, INTEREST = 0.12
export const EMAIL = 'info@cityhub.com'
export const MAP_URL = 'https://maps.google.com/?q=17.4166044,78.3464452'
export const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN')
export const money = l => l >= 100 ? ('₹' + (l / 100).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1') + ' Cr') : ('₹' + l + ' L')
/* rupees → ₹15,000 / ₹1.3 L / ₹1.92 Cr */
export const short = r => r >= 1e7 ? ('₹' + (r / 1e7).toFixed(2).replace(/\.?0+$/, '') + ' Cr') : r >= 100000 ? ('₹' + (r / 100000).toFixed(1).replace(/\.0$/, '') + ' L') : fmt(r)
/* l = investment in lakh. Rent = sq.ft × ₹65 a month, i.e. 6% a year of the price */
export const calc = l => { const sq = l * 100000 / PRICE, m = sq * RATE; return { sq, m, y: m * 12 } }
/* "~231" when the share is not a whole number of sq.ft */
export const sqft = l => { const sq = l * 100000 / PRICE; return (Math.abs(sq - Math.round(sq)) > 0.01 ? '~' : '') + Math.round(sq).toLocaleString('en-IN') }
/* the full-floor ticket */
export const FULL = { inv: FLOOR * PRICE, sq: FLOOR, m: FLOOR * RATE, y: FLOOR * RATE * 12 }
/* principal in rupees for the current choice */
export const principal = (l, ticket) => ticket === 'Full floor' ? FULL.inv : l * 100000
export const ticketFor = l => { const t = money(l); return ['₹30 L', '₹65 L', '₹1.3 Cr', '₹2.6 Cr'].includes(t) ? t : (l > 260 ? 'Above ₹2.6 Cr' : '₹1.3 Cr') }
export const NAV = [['/', 'Home', 'home'], ['/location', 'Location', 'pin'], ['/building', 'Building', 'bld'], ['/returns', 'Returns', 'rupee'], ['/protection', 'Protection', 'shield'], ['/process', 'Process', 'steps'], ['/enquire', 'Enquire', 'mail']]

export const SECTION_ID = { '/': 'home', '/location': 'location', '/building': 'building', '/returns': 'returns', '/protection': 'protection', '/process': 'process', '/enquire': 'enquire' }
