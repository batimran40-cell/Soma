import {products} from './products.js'

const KEY = 'soma-demo-analytics-v1'
const SESSION_KEY = 'soma-demo-viewed-v1'
const validIds = new Set(products.map(p => p.id))
const LIMIT = 10000000
const fields = ['views', 'cartAdds', 'wishlistAdds']

function safeStorage(type) {
  try { return typeof window === 'undefined' ? null : window[type] } catch { return null }
}

function sanitize(input) {
  const clean = {}
  if (!input || typeof input !== 'object' || Array.isArray(input)) return clean
  for (const [id, entry] of Object.entries(input)) {
    if (!validIds.has(id) || !entry || typeof entry !== 'object') continue
    clean[id] = {}
    for (const field of fields) {
      const value = entry[field]
      clean[id][field] = Number.isSafeInteger(value) && value >= 0 ? Math.min(value, LIMIT) : 0
    }
  }
  return clean
}

export function readDemoAnalytics() {
  const store = safeStorage('localStorage')
  if (!store) return {}
  try { return sanitize(JSON.parse(store.getItem(KEY) || '{}')) } catch { return {} }
}

export function recordDemoEvent(productId, type) {
  if (!validIds.has(productId) || !fields.includes(type)) return false
  const store = safeStorage('localStorage')
  if (!store) return false
  if (type === 'views') {
    const session = safeStorage('sessionStorage')
    try {
      if (session && JSON.parse(session.getItem(SESSION_KEY) || '{}')[productId]) return false
    } catch { /* record the event if session storage cannot be read */ }
  }
  const next = readDemoAnalytics()
  const existing = next[productId] || {views: 0, cartAdds: 0, wishlistAdds: 0}
  next[productId] = {...existing, [type]: Math.min(LIMIT, existing[type] + 1)}
  try {
    store.setItem(KEY, JSON.stringify(next))
    if (type === 'views') {
      const session = safeStorage('sessionStorage')
      if (session) {
        try {
          const prior = JSON.parse(session.getItem(SESSION_KEY) || '{}')
          session.setItem(SESSION_KEY, JSON.stringify({...prior, [productId]: true}))
        } catch { /* private browsing can prevent session persistence */ }
      }
    }
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('soma:analytics-updated'))
    return true
  } catch { return false }
}

export function getDemoReport() {
  const counts = readDemoAnalytics()
  const rows = products.map(product => ({
    id: product.id,
    name: product.name,
    image: product.image,
    category: product.detail,
    views: counts[product.id]?.views || 0,
    cartAdds: counts[product.id]?.cartAdds || 0,
    wishlistAdds: counts[product.id]?.wishlistAdds || 0,
  }))
  const total = key => rows.reduce((sum, row) => sum + row[key], 0)
  return {rows, totals: {views: total('views'), cartAdds: total('cartAdds'), wishlistAdds: total('wishlistAdds'), products: rows.length}}
}

export function resetDemoAnalytics() {
  const store = safeStorage('localStorage')
  if (!store) return false
  try {
    store.removeItem(KEY)
    safeStorage('sessionStorage')?.removeItem(SESSION_KEY)
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('soma:analytics-updated'))
    return true
  } catch { return false }
}
