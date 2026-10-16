import {useEffect,useRef,useState} from 'react'
import {products} from '../data/products'
import '../styles/search-dialog-premium.css'

export default function SearchDialog({onClose}){
 const [query,setQuery]=useState('')
 const ref=useRef(null)
 const closeRef=useRef(null)
 const results=products.filter(p=>(p.name+' '+p.detail).toLowerCase().includes(query.trim().toLowerCase()))
 useEffect(()=>{let old=document.body.style.overflow;let previous=document.activeElement;document.body.style.overflow='hidden';ref.current?.focus();const key=e=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){let nodes=[...document.querySelectorAll('.soma-search-modal a,.soma-search-modal button,.soma-search-modal input')].filter(n=>!n.disabled);if(!nodes.length)return;const i=nodes.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();nodes.at(-1).focus()}else if(!e.shiftKey&&i===nodes.length-1){e.preventDefault();nodes[0].focus()}}};document.addEventListener('keydown',key);return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',key);previous?.focus?.()}},[onClose])
 const navigate=()=>{onClose();window.location.assign('/products?q='+encodeURIComponent(query.trim()))}
 return <div className="soma-search-backdrop" onPointerDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <section className="soma-search-modal" role="dialog" aria-modal="true" aria-labelledby="soma-search-heading">
   <header><div><span className="soma-search-eyebrow">SOMA ORGANIC</span><h2 id="soma-search-heading">What are you looking for?</h2></div><button ref={closeRef} type="button" aria-label="Close search" className="soma-search-dismiss" onClick={onClose}>×</button></header>
   <form role="search" onSubmit={e=>{e.preventDefault();navigate()}}><label className="sr-only" htmlFor="soma-modal-query">Search products</label><span aria-hidden="true">⌕</span><input ref={ref} id="soma-modal-query" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search serums, ingredients, skincare…"/><button type="submit" aria-label="View all search results">↗</button></form>
   <div className="soma-search-body"><div className="soma-search-intro"><span className="soma-search-eyebrow">{query?'MATCHING PRODUCTS':'EXPLORE OUR COLLECTION'}</span><p>{query?'Results update as you type.':'Carefully considered essentials for everyday rituals.'}</p><div className="soma-search-chips">{['Serum','Cleanser','Cream'].map(t=><button key={t} type="button" onClick={()=>setQuery(t)}>{t} ↗</button>)}</div></div>
    <div className="soma-search-results" aria-live="polite">{results.length?results.slice(0,5).map(p=><a key={p.id} href={'/products/'+p.id} onClick={onClose}><img src={p.image} alt=""/><span><strong>{p.name}</strong><small>{p.detail}</small></span><b aria-hidden="true">↗</b></a>):<p>No matching skincare products. Try a different keyword.</p>}</div>
   </div>
   <footer><span>{results.length} matching product{results.length!==1?'s':''}</span><button type="button" onClick={navigate}>View all products ↗</button></footer>
  </section>
 </div>
}
