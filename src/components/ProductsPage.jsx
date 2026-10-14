import {useMemo,useState} from 'react'
import {products} from '../data/products'
import Icon from './Icons'
import '../styles/products.css'
import '../styles/discovery.css'
import '../styles/products-reference.css'

const categories=['All Products','Serums','Cleansers','Moisturizers','Toners']
const getCategory=product=>({'vitamin-c':'Serums','aloe-wash':'Cleansers','hydrating-cream':'Moisturizers','neem-toner':'Toners'})[product.id]||'All Products'
export default function ProductsPage({onAdd,favorites=[],onToggle=()=>{},cartCount=0,onCart=()=>{}}){
 const [category,setCategory]=useState('All Products')
 const [query,setQuery]=useState(()=>new URLSearchParams(window.location.search).get('q')||'')
 const [sort,setSort]=useState('featured')
 const [searchOpen,setSearchOpen]=useState(false)
 const items=useMemo(()=>{
  const filtered=products.filter(p=>(category==='All Products'||getCategory(p)===category)&&`${p.name} ${p.detail}`.toLowerCase().includes(query.toLowerCase().trim()))
  if(sort==='name-asc')return [...filtered].sort((a,b)=>a.name.localeCompare(b.name))
  if(sort==='name-desc')return [...filtered].sort((a,b)=>b.name.localeCompare(a.name))
  return filtered
 },[category,query,sort])
 return <main className="products-page soma-reference-products" id="products-page">
  <section className="soma-ref-shop-hero" aria-labelledby="products-title">
   <header className="soma-ref-shop-nav">
    <a href="/" className="soma-ref-shop-brand" aria-label="Soma Organic home"><span className="soma-ref-brand-mark" aria-hidden="true">✳</span><span>Soma<small>ORGANIC</small></span></a>
    <nav className="soma-ref-shop-links" aria-label="Shop navigation"><a href="/products" aria-current="page">Shop</a><a href="/story">Our Story</a><a href="/#ingredients">Explore</a><a href="/help">FAQs</a></nav>
    <div className="soma-ref-shop-tools">
     <form className="soma-ref-shop-search" role="search" onSubmit={e=>{e.preventDefault();setSearchOpen(false);document.getElementById('soma-shop-grid')?.scrollIntoView({behavior:'smooth'})}}>
      <input aria-label="Search Soma products" placeholder="Search anything..." value={query} onChange={e=>setQuery(e.target.value)} />
      <button type="submit" aria-label="Search"><span aria-hidden="true">⌕</span></button>
     </form>
     <button type="button" className="soma-ref-search-toggle" onClick={()=>setSearchOpen(v=>!v)} aria-label="Toggle product search" aria-expanded={searchOpen}>⌕</button>
     <a href="/wishlist" className="soma-ref-shop-round" aria-label="View wishlist">♡{favorites.length>0&&<span className="soma-ref-tool-count">{favorites.length}</span>}</a>
     <button type="button" onClick={onCart} className="soma-ref-shop-round" aria-label={`Open bag with ${cartCount} items`}><Icon name="bag" size={18}/>{cartCount>0&&<span className="soma-ref-tool-count">{cartCount}</span>}</button>
    </div>
   </header>
   {searchOpen&&<form className="soma-ref-mobile-search" onSubmit={e=>{e.preventDefault();setSearchOpen(false);document.getElementById('soma-shop-grid')?.scrollIntoView({behavior:'smooth'})}}><input autoFocus aria-label="Search Soma collection" placeholder="Search products" value={query} onChange={e=>setQuery(e.target.value)}/><button type="submit">SEARCH ↗</button></form>}
   <div className="soma-ref-shop-hero-copy">
    <span className="soma-ref-hero-offer">NATURALLY INSPIRED SKINCARE</span>
    <h1 id="products-title">Organic<br/>Serums &amp; Care</h1>
    <p>Four thoughtfully curated skincare essentials. Explore botanical rituals for everyday moments of care.</p>
    <a href="#soma-shop-grid" className="soma-ref-shop-cta">Shop Now <span aria-hidden="true">↗</span></a>
   </div>
   <div className="soma-ref-shop-hero-art" aria-hidden="true"><img src="/images/serum-premium.webp" alt=""/></div>
  </section>
  <section className="soma-ref-shop-catalog" id="soma-shop-grid" aria-labelledby="soma-ref-catalog-title">
   <div className="soma-ref-catalog-head"><span className="soma-ref-small-eyebrow">THE SOMA COLLECTION</span><h2 id="soma-ref-catalog-title">Popular Serums &amp; Skincare</h2><p>Discover your everyday botanical essentials.</p></div>
   <div className="soma-ref-catalog-controls">
    <div className="soma-ref-catalog-filters" aria-label="Filter products">{categories.map(c=><button type="button" key={c} aria-pressed={c===category} className={c===category?'is-active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div>
    <select aria-label="Sort products" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="name-asc">Name A–Z</option><option value="name-desc">Name Z–A</option></select>
   </div>
   {items.length?<div className="soma-ref-product-grid">{items.map(p=><article className="soma-ref-product-card" key={p.id}>
    <div className="soma-ref-product-media"><a href={`/products/${p.id}`} aria-label={`View ${p.name}`}><img src={p.image} alt={p.name} loading="lazy"/></a><button type="button" className="soma-ref-product-heart" aria-pressed={favorites.includes(p.id)} aria-label={`${favorites.includes(p.id)?'Remove':'Add'} ${p.name} ${favorites.includes(p.id)?'from':'to'} wishlist`} onClick={()=>onToggle(p.id)}>{favorites.includes(p.id)?'♥':'♡'}</button></div>
    <div className="soma-ref-product-description"><a href={`/products/${p.id}`} className="soma-ref-product-name">{p.name}</a><p>{p.detail}</p><strong>{Number.isFinite(p.price)?`${p.currency||'PKR'} ${p.price.toLocaleString()}`:'Price on request'}</strong><button type="button" onClick={()=>onAdd(p)}>Add to bag ↗</button></div>
   </article>)}</div>:<div className="soma-ref-no-results"><h3>No products found</h3><p>Try another search or category.</p><button onClick={()=>{setQuery('');setCategory('All Products')}}>Show all products</button></div>}
   <p className="soma-ref-catalog-count">Showing {items.length} of {products.length} Soma Organic products</p>
  </section>
 </main>
}
