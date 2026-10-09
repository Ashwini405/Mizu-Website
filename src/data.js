export const PRICE = 13000, RATE = 65
export const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN')
export const money = l => l >= 100 ? ('₹' + (l / 100).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1') + ' Cr') : ('₹' + l + ' L')
export const short = r => r >= 100000 ? ('₹' + (r / 100000).toFixed(1).replace(/\.0$/, '') + ' L') : fmt(r)
export const calc = l => { const sq = l * 100000 / PRICE, m = sq * RATE; return { sq, m, y: m * 12 } }
export const ticketFor = l => { const t = money(l); return ['₹30 L', '₹65 L', '₹1.3 Cr', '₹2.6 Cr'].includes(t) ? t : (l > 260 ? 'Above ₹2.6 Cr' : '₹1.3 Cr') }
export const NAV = [['/', 'Home', 'home'], ['/location', 'Location', 'pin'], ['/building', 'Building', 'bld'], ['/returns', 'Returns', 'rupee'], ['/protection', 'Protection', 'shield'], ['/process', 'Process', 'steps'], ['/enquire', 'Enquire', 'mail']]

export const SECTION_ID = { '/': 'home', '/location': 'location', '/building': 'building', '/returns': 'returns', '/protection': 'protection', '/process': 'process', '/enquire': 'enquire' }
