import {useEffect,useMemo,useRef,useState} from 'react'
import {products} from '../data/products'
import {getDemoReport,resetDemoAnalytics} from '../data/demoAnalytics'
import {readDemoCatalog,saveDemoProduct,deleteDemoDraft,resetDemoCatalog,newDemoProduct} from '../data/demoCatalog'
import '../styles/admin-studio.css'

const navigation = [['overview','Overview','◫'],['products','Products','◈'],['analytics','Analytics','▥'],['orders','Orders','▤'],['settings','Settings','⚙']]
const readable = n => new Intl.NumberFormat('en-US').format(n)
function Editor({initial,onClose,onSaved}) {
 const [form,setForm] = useState(initial)
 const [error,setError] = useState('')
 const first = useRef(null)
 const old = useRef('')
 useEffect(() => {
  const prior = document.activeElement
  old.current = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  first.current?.focus()
  const onKey = event => {
   if (event.key === 'Escape') onClose()
   if (event.key !== 'Tab') return
   const nodes = [...document.querySelectorAll('.soma-admin-editor input,.soma-admin-editor select,.soma-admin-editor button')]
   if (!nodes.length) return
   if (event.shiftKey && document.activeElement === nodes[0]) {event.preventDefault();nodes.at(-1).focus()}
   if (!event.shiftKey && document.activeElement === nodes.at(-1)) {event.preventDefault();nodes[0].focus()}
  }
  document.addEventListener('keydown',onKey)
  return () => {document.body.style.overflow=old.current;document.removeEventListener('keydown',onKey);prior?.focus?.()}
 },[onClose])
 const update=(key,value)=>{setForm(item=>({...item,[key]:value}));setError('')}
 const submit=event=>{
  event.preventDefault()
  const result=saveDemoProduct(form)
  if (result.ok) onSaved()
  else setError(result.error)
 }
 return <div className="soma-admin-modal" onPointerDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <section className="soma-admin-editor" role="dialog" aria-modal="true" aria-labelledby="soma-admin-editor-title">
   <div className="soma-admin-editor-head"><div><span className="soma-admin-kicker">LOCAL CATALOG PREVIEW</span><h2 id="soma-admin-editor-title">{initial.name?'Edit product':'New product draft'}</h2></div><button type="button" onClick={onClose} aria-label="Close editor">×</button></div>
   <p>Changes are saved in this browser only. They do not publish to the storefront.</p>
   <form onSubmit={submit}>
    <label>Product name<input ref={first} required maxLength={90} value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Product name"/></label>
    <label>Short description<input maxLength={160} value={form.detail} onChange={e=>update('detail',e.target.value)} placeholder="Short product description"/></label>
    <div className="soma-admin-two">
     <label>Product image<select value={form.image} onChange={e=>update('image',e.target.value)}>{products.map(p=><option key={p.id} value={p.image}>{p.name} photo</option>)}</select></label>
     <label>Demo status<select value={form.status} onChange={e=>update('status',e.target.value)}><option value="active">Active preview</option><option value="draft">Draft</option><option value="archived">Archived</option></select></label>
    </div>
    {error&&<p className="soma-admin-error" role="alert">{error}</p>}
    <div className="soma-admin-editor-actions"><button type="button" className="soma-admin-button muted" onClick={onClose}>Cancel</button><button type="submit" className="soma-admin-button">Save demo changes <span>↗</span></button></div>
   </form>
  </section>
 </div>
}

export default function AdminDashboard() {
 const [tab,setTab] = useState('overview')
 const [version,setVersion] = useState(0)
 const [query,setQuery] = useState('')
 const [statusFilter,setStatusFilter] = useState('all')
 const [editing,setEditing] = useState(null)
 const [message,setMessage] = useState('')
 useEffect(()=>{
  const refresh=()=>setVersion(v=>v+1)
  window.addEventListener('storage',refresh)
  window.addEventListener('soma:analytics-updated',refresh)
  return ()=>{window.removeEventListener('storage',refresh);window.removeEventListener('soma:analytics-updated',refresh)}
 },[])
 const report=useMemo(()=>getDemoReport(),[version])
 const catalog=useMemo(()=>readDemoCatalog(),[version])
 const rows=useMemo(()=>catalog.filter(item=>
  (statusFilter==='all'||(item.status||'active')===statusFilter)&&
  (item.name+' '+item.detail).toLowerCase().includes(query.toLowerCase().trim())),[catalog,query,statusFilter])
 const ranked=[...report.rows].sort((a,b)=>b.views-a.views)
 const top=ranked[0]
 const max=Math.max(1,...ranked.map(r=>r.views))
 const edit = product=>setEditing({id:product.id,name:product.name,detail:product.detail,image:product.image,status:product.status||'active',isDemo:true})
 const refresh=()=>{setVersion(v=>v+1);setEditing(null);setMessage('Demo changes saved in this browser.')}
 const resetMetrics=()=>{if(!window.confirm('Clear browser-local demo views and interaction counts?'))return;if(resetDemoAnalytics())setMessage('Local demo analytics cleared.')}
 const resetCatalog=()=>{if(!window.confirm('Remove all browser-local demo catalog edits and drafts?'))return;if(resetDemoCatalog()){setVersion(v=>v+1);setMessage('Demo catalog restored to original products.')}}
 const removeDraft=id=>{if(!window.confirm('Delete this local demo draft?'))return;if(deleteDemoDraft(id)){setVersion(v=>v+1);setMessage('Demo draft deleted.')}}
 return <main className="soma-admin">
  <aside className="soma-admin-sidebar"><a href="/" className="soma-admin-logo">✺ SOMA <small>STUDIO</small></a><div className="soma-admin-label">WORKSPACE</div><nav aria-label="Admin sections">{navigation.map(([id,label,icon])=><button key={id} type="button" className={tab===id?'selected':''} aria-current={tab===id?'page':undefined} onClick={()=>setTab(id)}><span aria-hidden="true">{icon}</span>{label}</button>)}</nav><div className="soma-admin-sidebar-bottom"><span>LOCAL DEVELOPMENT</span><p>Demo data only. Private browser storage, not a production admin system.</p><a href="/products">View storefront ↗</a></div></aside>
  <div className="soma-admin-workspace">
   <header className="soma-admin-topbar"><div><span className="soma-admin-kicker">SOMA ORGANIC / STUDIO</span><h1>{navigation.find(n=>n[0]===tab)?.[1]}</h1></div><div className="soma-admin-top-actions"><span className="soma-admin-demo-pill">● Demo mode</span><a href="/" className="soma-admin-store-link">Storefront ↗</a></div></header>
   <div className="soma-admin-notice" role="note"><strong>Preview environment.</strong> Counts are recorded only in this browser. No real customers, sales, inventory or orders are connected.</div>
   {message&&<p className="soma-admin-flash" role="status">{message}<button onClick={()=>setMessage('')} aria-label="Dismiss notification">×</button></p>}
   {tab==='overview'&&<>
    <div className="soma-admin-section-head"><div><span className="soma-admin-kicker">GOOD MORNING, SOMA</span><h2>Your store at a glance.</h2><p>A simple overview of local browsing interactions.</p></div><button className="soma-admin-button" onClick={()=>setTab('products')}>Manage products ↗</button></div>
    <div className="soma-admin-stat-grid">
     {[['Product views',report.totals.views,'Unique per product, per browser session'],['Add-to-bag actions',report.totals.cartAdds,'Local button interactions'],['Wishlist saves',report.totals.wishlistAdds,'Local save interactions'],['Catalog products',catalog.length,'Includes unpublished demo drafts']].map(([name,count,hint])=><article className="soma-admin-stat" key={name}><span>{name}</span><strong>{readable(count)}</strong><small>{hint}</small></article>)}
    </div>
    <div className="soma-admin-bottom-grid"><section className="soma-admin-card"><div className="soma-admin-card-heading"><div><span className="soma-admin-kicker">ENGAGEMENT</span><h3>Product views</h3></div><button onClick={()=>setTab('analytics')}>Full report ↗</button></div><div className="soma-admin-bars">{ranked.map(p=><div className="soma-admin-bar-row" key={p.id}><div><span>{p.name}</span><strong>{readable(p.views)}</strong></div><div className="soma-admin-bar-track"><i style={{width:(p.views/max*100)+'%'}}/></div></div>)}</div></section>
     <section className="soma-admin-card soma-admin-spotlight"><span className="soma-admin-kicker">MOST VIEWED · LOCAL</span>{top&&<><img src={top.image} alt=""/><h3>{top.name}</h3><p>{top.views?readable(top.views)+' recorded views':'No views recorded yet'}</p><a href={'/products/'+top.id}>Open product ↗</a></>}</section>
    </div>
   </>}
   {tab==='products'&&<><div className="soma-admin-section-head"><div><span className="soma-admin-kicker">CATALOG</span><h2>Products, beautifully organized.</h2><p>Edit demo cards, draft new products and inspect local engagement.</p></div><button className="soma-admin-button" onClick={()=>setEditing(newDemoProduct())}>+ Add product</button></div>
    <div className="soma-admin-card soma-admin-products"><div className="soma-admin-toolbar"><label className="soma-admin-search"><span aria-hidden="true">⌕</span><input aria-label="Search products" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products…"/></label><select aria-label="Filter status" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="all">All statuses</option><option value="active">Active</option><option value="draft">Draft</option><option value="archived">Archived</option></select></div>
    <div className="soma-admin-table-wrap"><table><thead><tr><th scope="col">Product</th><th scope="col">Status</th><th scope="col">Views</th><th scope="col">Bag adds</th><th scope="col">Actions</th></tr></thead><tbody>{rows.map(p=>{const metric=report.rows.find(x=>x.id===p.id);return <tr key={p.id}><td><div className="soma-admin-product-cell"><img src={p.image} alt=""/><div><strong>{p.name}</strong><small>{p.detail||'No description'}</small></div></div></td><td><span className={'soma-admin-status '+(p.status||'active')}>{p.status||'active'}</span></td><td>{readable(metric?.views||0)}</td><td>{readable(metric?.cartAdds||0)}</td><td><div className="soma-admin-inline-actions"><button onClick={()=>edit(p)}>Edit</button>{p.id.startsWith('demo-')&&<button onClick={()=>removeDraft(p.id)}>Delete</button>}</div></td></tr>})}</tbody></table>{!rows.length&&<p className="soma-admin-empty">No products match your search.</p>}</div></div>
   </>}
   {tab==='analytics'&&<><div className="soma-admin-section-head"><div><span className="soma-admin-kicker">ANALYTICS</span><h2>Understand each product.</h2><p>Transparent, per-product local counts. No fabricated performance statistics.</p></div></div>
    <div className="soma-admin-card"><div className="soma-admin-card-heading"><h3>Product engagement report</h3><button onClick={resetMetrics}>Clear demo counts</button></div><div className="soma-admin-table-wrap"><table><thead><tr><th>Product</th><th>Views</th><th>Add to bag</th><th>Wishlist saves</th></tr></thead><tbody>{ranked.map(p=><tr key={p.id}><td><div className="soma-admin-product-cell"><img src={p.image} alt=""/><strong>{p.name}</strong></div></td><td>{readable(p.views)}</td><td>{readable(p.cartAdds)}</td><td>{readable(p.wishlistAdds)}</td></tr>)}</tbody></table></div></div></>}
   {tab==='orders'&&<div className="soma-admin-card soma-admin-placeholder"><span className="soma-admin-kicker">COMING WITH SUPABASE</span><h2>Order management</h2><p>Customer orders, payment status, refunds and shipping are intentionally unavailable until secure server-side checkout and role permissions are implemented.</p><p>No fake orders are shown.</p></div>}
   {tab==='settings'&&<div className="soma-admin-card soma-admin-placeholder"><span className="soma-admin-kicker">WORKSPACE SETTINGS</span><h2>Demo configuration</h2><p>Everything on this screen remains local to your current browser. For production, use authenticated admin APIs, server-side role checks and Supabase RLS.</p><div className="soma-admin-settings-actions"><button onClick={resetCatalog}>Reset demo product edits</button><button onClick={resetMetrics}>Reset demo analytics</button></div></div>}
  </div>
  {editing&&<Editor initial={editing} onClose={()=>setEditing(null)} onSaved={refresh}/>}
 </main>
}
