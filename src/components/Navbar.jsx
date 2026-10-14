import {useEffect,useRef,useState} from 'react'
import Icon from './Icons'
import '../styles/navbar-premium.css'

const primary=[['Home','/'],['Shop','/products'],['Our Story','/story'],['Ritual','/#bestseller']]
const drawerLinks=[...primary,['Wishlist','/wishlist'],['Reviews','/#reviews'],['Your bag','/cart'],['Help & FAQs','/help']]
export default function Navbar({onCart,cartCount}){
 const [menu,setMenu]=useState(false)
 const [search,setSearch]=useState(false)
 const [term,setTerm]=useState('')
 const [scrolled,setScrolled]=useState(false)
 const drawerClose=useRef(null)
 const searchInput=useRef(null)
 useEffect(()=>{const update=()=>setScrolled(window.scrollY>18);update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update)},[])
 useEffect(()=>{if(!menu)return;const old=document.body.style.overflow;const before=document.activeElement;document.body.style.overflow='hidden';drawerClose.current?.focus();const key=e=>{if(e.key==='Escape')setMenu(false);if(e.key==='Tab'){const nodes=[...document.querySelectorAll('.soma-nav-drawer a,.soma-nav-drawer button')];if(!nodes.length)return;if(e.shiftKey&&document.activeElement===nodes[0]){e.preventDefault();nodes.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===nodes.at(-1)){e.preventDefault();nodes[0].focus()}}};window.addEventListener('keydown',key);return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',key);before?.focus?.()}},[menu])
 useEffect(()=>{if(search)searchInput.current?.focus()},[search])
 useEffect(()=>{const onKey=e=>{if(e.key==='Escape')setSearch(false)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[])
 const submit=e=>{e.preventDefault();const q=term.trim();setSearch(false);window.location.assign(q?'/products?q='+encodeURIComponent(q):'/products')}
 return <>
  <div className="soma-nav-announcement"><span>BOTANICAL CARE, BEAUTIFULLY CONSIDERED</span><span className="soma-nav-announcement-side">SOMA ORGANIC · DAILY RITUALS</span></div>
  <header className={`site-header soma-premium-header${scrolled?' is-scrolled':''}`} id="top">
   <div className="soma-premium-nav">
    <div className="soma-premium-left">
      <button className="soma-nav-icon soma-nav-toggle" type="button" aria-label="Open navigation" aria-expanded={menu} aria-controls="soma-mobile-nav" onClick={()=>setMenu(true)}><Icon name="menu" size={23}/></button>
      <nav className="soma-premium-links" aria-label="Primary navigation">{primary.map(([name,url])=><a href={url} key={name}>{name}</a>)}</nav>
    </div>
    <a className="soma-premium-logo" href="/" aria-label="Soma Organic home"><span>SOMA</span><small>ORGANIC</small></a>
    <div className="soma-premium-actions">
      <a className="soma-nav-wishlist" href="/wishlist" aria-label="View wishlist">♡ <span>Wishlist</span></a>
      <button className="soma-nav-icon" type="button" aria-label={search?'Close product search':'Search products'} aria-expanded={search} aria-controls="soma-nav-search" onClick={()=>setSearch(v=>!v)}><Icon name={search?'close':'search'} size={21}/></button>
      <button className="soma-nav-bag" type="button" onClick={onCart} aria-label={`Open shopping bag, ${cartCount} items`}><Icon name="bag" size={19}/><span className="soma-nav-bag-label">Bag</span><strong>{cartCount}</strong></button>
    </div>
   </div>
   <div id="soma-nav-search" className={`soma-nav-search${search?' is-open':''}`} hidden={!search}>
      <form onSubmit={submit} role="search"><label htmlFor="soma-search-input">Search the collection</label><input ref={searchInput} id="soma-search-input" type="search" placeholder="Discover your next ritual…" value={term} onChange={e=>setTerm(e.target.value)}/><button type="submit">SEARCH <Icon name="arrow" size={16}/></button></form>
   </div>
  </header>
  {menu&&<div className="soma-nav-overlay" onPointerDown={e=>{if(e.target===e.currentTarget)setMenu(false)}}>
    <nav className="soma-nav-drawer" id="soma-mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation">
     <div className="soma-nav-drawer-top"><span>SOMA <small>ORGANIC</small></span><button ref={drawerClose} className="soma-nav-icon" type="button" onClick={()=>setMenu(false)} aria-label="Close navigation"><Icon name="close" size={24}/></button></div>
     {drawerLinks.map(([name,url],i)=><a href={url} key={name} onClick={()=>setMenu(false)}><small>{String(i+1).padStart(2,'0')}</small><span>{name}</span><Icon name="arrow" size={19}/></a>)}
     <p>A quieter kind of radiance.</p>
    </nav>
   </div>}
 </>
}