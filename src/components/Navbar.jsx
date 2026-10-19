import {useCallback,useEffect,useRef,useState} from 'react'
import Icon from './Icons'
import SearchDialog from './SearchDialog'
import '../styles/navbar-premium.css'

const primary=[['Shop','/products'],['Our Story','/story'],['Ritual','/#bestseller']]
const drawerLinks=[['Home','/'],...primary,['Wishlist','/wishlist'],['Account','/account'],['Help & FAQs','/help'],['Shopping Bag','/cart']]

export default function Navbar({onCart,cartCount=0}){
 const [menu,setMenu]=useState(false)
 const [search,setSearch]=useState(false)
 const [scrolled,setScrolled]=useState(false)
 const drawerRef=useRef(null)
 const drawerCloseRef=useRef(null)
 const closeSearch=useCallback(()=>setSearch(false),[])
 const closeMenu=useCallback(()=>setMenu(false),[])

 useEffect(()=>{
  const update=()=>setScrolled(window.scrollY>12)
  update()
  window.addEventListener('scroll',update,{passive:true})
  return()=>window.removeEventListener('scroll',update)
 },[])

 useEffect(()=>{
  if(!menu)return
  const previous=document.activeElement
  const oldOverflow=document.body.style.overflow
  document.body.style.overflow='hidden'
  drawerCloseRef.current?.focus()
  const onKey=e=>{
   if(e.key==='Escape'){closeMenu();return}
   if(e.key!=='Tab')return
   const elements=[...(drawerRef.current?.querySelectorAll('a[href],button:not([disabled])')||[])]
   if(!elements.length)return
   if(e.shiftKey&&document.activeElement===elements[0]){e.preventDefault();elements.at(-1).focus()}
   else if(!e.shiftKey&&document.activeElement===elements.at(-1)){e.preventDefault();elements[0].focus()}
  }
  document.addEventListener('keydown',onKey)
  return()=>{document.body.style.overflow=oldOverflow;document.removeEventListener('keydown',onKey);previous?.focus?.()}
 },[menu,closeMenu])

 const current=typeof window!=='undefined'?window.location.pathname:'/'
 const isCurrent=url=>!url.includes('#')&&current===url
 const closeOnNavigate=()=>{closeMenu();closeSearch()}

 return <>
  <div className="soma-nav-announcement">
   <div className="soma-announcement-inner">
    <span className="soma-announcement-message"><Icon name="leaf" size={14}/><span>Pure botanicals. Thoughtful everyday care.</span></span>
    <a href="/products" className="soma-nav-announcement-side">DISCOVER THE COLLECTION <span aria-hidden="true">→</span></a>
   </div>
  </div>

  <header className={`site-header soma-premium-header soma-reference-header${scrolled?' is-scrolled':''}`} id="top">
   <div className="soma-premium-nav">
    <div className="soma-premium-left">
     <button className="soma-nav-icon soma-nav-toggle" type="button" aria-label="Open navigation" aria-expanded={menu} aria-controls="soma-mobile-nav" onClick={()=>setMenu(true)}><Icon name="menu" size={22}/></button>
     <nav className="soma-premium-links" aria-label="Main navigation">
      {primary.map(([title,url])=><a href={url} key={title} aria-current={isCurrent(url)?'page':undefined}>{title}</a>)}
     </nav>
    </div>
    <a className="soma-premium-logo" href="/" aria-label="Soma Organic — home" onClick={closeOnNavigate}><span>SOMA</span><small>ORGANIC</small></a>
    <div className="soma-premium-actions">
     <button className="soma-nav-icon soma-nav-search-trigger" type="button" aria-label={search?'Close product search':'Search products'} aria-expanded={search} aria-controls="soma-premium-search" onClick={()=>setSearch(v=>!v)}><Icon name={search?'close':'search'} size={20}/></button>
     <a className="soma-nav-icon soma-account-link" href="/account" aria-label="My account" title="My account"><Icon name="user" size={19}/></a>
     <a className="soma-nav-icon soma-nav-wishlist" href="/wishlist" aria-label="View wishlist" title="Wishlist"><Icon name="heart" size={20}/></a>
     <button className="soma-nav-icon soma-nav-bag" type="button" onClick={onCart} aria-label={`Open shopping bag, ${cartCount} items`} title="Shopping bag">
      <Icon name="bag" size={20}/>
      {cartCount>0&&<span className="soma-nav-bag-count" aria-hidden="true">{cartCount>99?'99+':cartCount}</span>}
     </button>
    </div>
   </div>
  </header>
  {search&&<SearchDialog onClose={closeSearch}/>}
  {menu&&<div className="soma-nav-overlay" onPointerDown={e=>{if(e.target===e.currentTarget)closeMenu()}}>
    <div className="soma-nav-drawer" id="soma-mobile-nav" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Navigation">
     <div className="soma-nav-drawer-top">
      <a href="/" onClick={closeOnNavigate} className="soma-drawer-brand">SOMA <small>ORGANIC</small></a>
      <button ref={drawerCloseRef} className="soma-nav-icon" type="button" onClick={closeMenu} aria-label="Close navigation"><Icon name="close" size={22}/></button>
     </div>
     <nav aria-label="Mobile navigation">{drawerLinks.map(([title,url],i)=><a href={url} key={title} aria-current={isCurrent(url)?'page':undefined} onClick={closeOnNavigate}><small>{String(i+1).padStart(2,'0')}</small><span>{title}</span><Icon name="arrow" size={19}/></a>)}</nav>
     <p>A quieter kind of radiance.</p>
    </div>
   </div>}
 </>
}
