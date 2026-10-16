import {products} from './products.js'

const KEY = 'soma-demo-catalog-v1'
const validImages = new Set(products.map(p => p.image))
const validStatus = new Set(['draft', 'active', 'archived'])
const idFormat = /^demo-[a-z0-9-]{6,70}$/
const originalIds = new Set(products.map(p => p.id))

function store() {
  try { return typeof window === 'undefined' ? null : window.localStorage } catch { return null }
}
const text = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : ''
function clean(item) {
  if (!item || typeof item !== 'object') return null
  const id = text(item.id, 80)
  const name = text(item.name, 90)
  if (!(originalIds.has(id) || idFormat.test(id)) || !name) return null
  return {
    id, name,
    detail: text(item.detail, 160),
    image: validImages.has(item.image) ? item.image : products[0].image,
    status: validStatus.has(item.status) ? item.status : 'draft',
    isDemo: true,
  }
}

export function readDemoCatalog() {
  let stored = []
  try {
    const value = JSON.parse(store()?.getItem(KEY) || '[]')
    if (Array.isArray(value)) stored = value.slice(0, 100).map(clean).filter(Boolean)
  } catch { /* corrupted browser data should not crash the app */ }
  const map = new Map(stored.map(item => [item.id, item]))
  const base = products.map(p => map.get(p.id) || {...p, status: 'active', isDemo: false})
  return [...base, ...stored.filter(p => !originalIds.has(p.id))]
}

export function saveDemoProduct(candidate) {
  const item = clean(candidate)
  if (!item) return {ok: false, error: 'A valid name and product are required.'}
  const current = readDemoCatalog()
  const drafts = current.filter(p => p.isDemo)
  if (!drafts.some(p => p.id === item.id) && drafts.length >= 100)
    return {ok: false, error: 'Demo catalog limit reached.'}
  const next = [...drafts.filter(p => p.id !== item.id), item]
  try {
    store()?.setItem(KEY, JSON.stringify(next))
    if (!store()) return {ok: false, error: 'Browser storage is unavailable.'}
    return {ok: true, item}
  } catch { return {ok: false, error: 'Unable to save in this browser.'} }
}

export function deleteDemoDraft(id) {
  if (!idFormat.test(id)) return false
  const current = readDemoCatalog().filter(p => p.isDemo)
  try { store()?.setItem(KEY, JSON.stringify(current.filter(p => p.id !== id))); return !!store() }
  catch { return false }
}

export function resetDemoCatalog() {
  try { store()?.removeItem(KEY); return !!store() } catch { return false }
}

export function newDemoProduct() {
  const unique = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now()) + '-' + Math.random().toString(36).slice(2)
  return {id: 'demo-' + unique, name: '', detail: '', image: products[0].image, status: 'draft', isDemo: true}
}
