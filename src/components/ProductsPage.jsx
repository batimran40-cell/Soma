import {useMemo,useState} from 'react'
import {products} from '../data/products'
import '../styles/products.css'

const categories=['All Products','Serums','Cleansers','Moisturizers','Toners']
const getCategory = product => {
  if(product.id==='vitamin-c')return 'Serums'
  if(product.id==='aloe-wash')return 'Cleansers'
  if(product.id==='hydrating-cream')return 'Moisturizers'
  return 'Toners'
}
const descriptions={
  'vitamin-c':'A daily botanical serum designed to complement your skincare ritual.',
  'aloe-wash':'A gentle cleanser for a refreshing everyday skincare routine.',
  'hydrating-cream':'A comforting face cream for a daily moisture ritual.',
  'neem-toner':'A refreshing toner inspired by neem and tea tree botanicals.'
}
export default function ProductsPage({onAdd}){
  const [category,setCategory]=useState('All Products')
  const [query,setQuery]=useState('')
  const [sort,setSort]=useState('featured')
  const [selected,setSelected]=useState(null)
  const items=useMemo(()=>{
    const filtered=products.filter(p=>(category==='All Products'||getCategory(p)===category)&&`${p.name} ${p.detail}`.toLowerCase().includes(query.toLowerCase().trim()))
    if(sort==='name-asc')return [...filtered].sort((a,b)=>a.name.localeCompare(b.name))
    if(sort==='name-desc')return [...filtered].sort((a,b)=>b.name.localeCompare(a.name))
    return filtered
  },[category,query,sort])
  return <main className="products-page" id="products-page">
    <div className="products-breadcrumb"><a href="/">Home</a> / Shop</div>
    <section className="products-intro" aria-labelledby="products-title">
      <div className="products-intro-copy"><span className="products-kicker">Soma Organic · The Collection</span><h1 id="products-title">Care, rooted<br/>in nature.</h1><p>Explore our thoughtfully curated skincare essentials. Small daily rituals, made beautiful.</p></div>
      <div className="products-intro-visual"><img src="/images/collection.webp" alt="Soma Organic botanical skincare collection"/></div>
    </section>
    <section aria-label="Filter collection" className="products-controls">
      <div className="products-filters">{categories.map(c=><button type="button" key={c} className={`products-filter ${c===category?'active':''}`} aria-pressed={c===category} onClick={()=>setCategory(c)}>{c}</button>)}</div>
      <div style={{display:'flex',gap:'.7rem',flexWrap:'wrap'}}><input className="products-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products" aria-label="Search products"/><select className="products-sort" value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="name-asc">Name A–Z</option><option value="name-desc">Name Z–A</option></select></div>
    </section>
    <section className="products-results" aria-label="Shop Soma products">
      <div className="products-results-top"><h2>Our essentials</h2><span>{items.length} {items.length===1?'product':'products'}</span></div>
      {items.length?<div className="products-grid">{items.map(p=><article className="products-card" key={p.id}>
        <button className="products-image" type="button" onClick={()=>setSelected(p)} aria-label={`View details for ${p.name}`}><img src={p.image} alt={p.name} loading="lazy"/></button>
        <div className="products-tag">{p.tag}</div><h3>{p.name}</h3><p>{p.detail}</p>
        <div className="products-actions"><button className="products-action secondary" onClick={()=>setSelected(p)}>VIEW DETAILS</button><button className="products-action" onClick={()=>onAdd(p)}>ADD TO BAG</button></div>
      </article>)}</div>:<p className="products-empty">No products match your search. Try another term or category.</p>}
    </section>
    {selected&&<div className="product-modal-backdrop" onClick={()=>setSelected(null)} role="presentation">
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" onClick={e=>e.stopPropagation()}>
        <button className="product-modal-close" onClick={()=>setSelected(null)} aria-label="Close product details">✕</button>
        <img src={selected.image} alt={selected.name}/>
        <div className="product-modal-body"><span className="products-kicker">{getCategory(selected)}</span><h2 id="product-modal-title">{selected.name}</h2><p>{selected.detail}</p><p>{descriptions[selected.id]}</p><p>Pricing and checkout details will be available soon.</p><button className="products-action" onClick={()=>{onAdd(selected);setSelected(null)}}>ADD TO BAG</button></div>
      </section>
    </div>}
  </main>
}