import {useMemo,useState} from 'react'
import {products} from '../data/products'
import '../styles/products.css'
import '../styles/discovery.css'

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
export default function ProductsPage({onAdd,favorites=[],onToggle=()=>{}}){
  const [category,setCategory]=useState('All Products')
  const [query,setQuery]=useState('')
  const [sort,setSort]=useState('featured')
  
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
      <div className="products-results-top"><h2>Our essentials</h2><a href="/wishlist" className="products-wishlist-link">♡ MY WISHLIST ({favorites.length})</a><span>{items.length} {items.length===1?'product':'products'}</span></div>
      {items.length?<div className="products-grid premium-products-grid">{items.map((p,index)=><article className="products-card premium-product-card" key={p.id}>
        <div className="premium-product-visual">
          <a className="products-image" href={`/products/${p.id}`} aria-label={`Explore ${p.name}`}><img src={p.image} alt={p.name} loading="lazy"/></a>
          <span className="premium-product-index">{String(index+1).padStart(2,'0')} / 0{items.length}</span>
          <button type="button" className="premium-product-favorite" aria-label={`${favorites.includes(p.id)?"Remove":"Add"} ${p.name} ${favorites.includes(p.id)?"from":"to"} wishlist`} aria-pressed={favorites.includes(p.id)} onClick={()=>onToggle(p.id)}>{favorites.includes(p.id)?"♥":"♡"}</button>
          <a className="premium-product-quick" href={`/products/${p.id}`}>DISCOVER PRODUCT <span aria-hidden="true">↗</span></a>
        </div>
        <div className="premium-product-info"><span className="products-tag">{p.tag}</span><h3><a href={`/products/${p.id}`}>{p.name}</a></h3><p>{p.detail}</p><div className="premium-product-price" aria-label={`Price for ${p.name}`}>{p.price != null ? `${p.currency || "PKR"} ${Number(p.price).toLocaleString()}` : "Price on request"}</div>
          <div className="premium-product-actions"><button type="button" className="premium-product-add" onClick={()=>onAdd(p)}>ADD TO BAG <span aria-hidden="true">↗</span></button></div>
        </div>
      </article>)}</div>:<p className="products-empty">No products match your search. Try another term or category.</p>}
    </section>
  </main>
}