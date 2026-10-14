import {useState,useEffect} from 'react'
import Icon from './Icons'

const links=[['Shop','/products'],['Philosophy','#philosophy'],['Ritual','#bestseller'],['Reviews','#reviews']]
const drawerLinks=[['Home','/'],['Shop','/products'],['Our Philosophy','#philosophy'],['Our Ritual','#bestseller'],['Reviews','#reviews'],['Contact','#footer']]

export default function Navbar({onCart,cartCount}) {
 const [menu,setMenu]=useState(false),[search,setSearch]=useState(false),[term,setTerm]=useState(''),[scrolled,setScrolled]=useState(false)

 useEffect(()=>{document.body.classList.toggle('drawer-open',menu);return ()=>document.body.classList.remove('drawer-open')},[menu])
 useEffect(()=>{
  const onScroll=()=>setScrolled(window.scrollY>24)
  onScroll();window.addEventListener('scroll',onScroll,{passive:true})
  return ()=>window.removeEventListener('scroll',onScroll)
 },[])
 useEffect(()=>{
  const onKey=e=>{if(e.key==='Escape'){setMenu(false);setSearch(false)}}
  window.addEventListener('keydown',onKey);return ()=>window.removeEventListener('keydown',onKey)
 },[])

 return <>
 <div className="announce" role="note"><span>Pure ingredients</span><i aria-hidden="true"/><span>Visible care</span><i aria-hidden="true" className="announce-extra"/><span className="announce-extra">Plant-based skincare</span></div>
 <header className={`site-header${scrolled?' is-scrolled':''}`} id="top">
  <div className="nav-inner">
   <div className="nav-left">
    <button className="icon-btn nav-menu-btn" aria-label="Open menu" onClick={()=>setMenu(true)}><Icon name="menu"/></button>
    <nav className="nav-links" aria-label="Primary">{links.map(([label,href])=><a href={href} key={label}>{label}</a>)}</nav>
   </div>
   <a className="wordmark" href="/" aria-label="Soma home"><span className="wordmark-main">SOMA</span><span className="wordmark-sub">ORGANIC</span></a>
   <div className="header-actions">
    <button className={`icon-btn${search?' is-active':''}`} aria-label="Search products" aria-expanded={search} onClick={()=>setSearch(v=>!v)}><Icon name={search?'close':'search'} size={21}/></button>
    <button className="cart-button" onClick={onCart} aria-label={`Open cart, ${cartCount} items`}><Icon name="bag" size={21}/><span className="cart-label">BAG</span><span className={`cart-count${cartCount?' has-items':''}`}>{cartCount}</span></button>
   </div>
  </div>
  <div className={`search-panel${search?' open':''}`} aria-hidden={!search}>
   <form className="search-bar" onSubmit={e=>{e.preventDefault();setSearch(false);window.location.assign('/products')}}>
    <label htmlFor="site-search">Search Soma products</label>
    <Icon name="search" size={19}/>
    <input id="site-search" tabIndex={search?0:-1} value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search the collection…"/>
    <button className="small-button" type="submit" tabIndex={search?0:-1}>VIEW COLLECTION <Icon name="arrow" size={15}/></button>
   </form>
  </div>
 </header>
 {menu&&<div className="drawer-backdrop" onClick={()=>setMenu(false)}><nav className="drawer" aria-label="Main navigation" onClick={e=>e.stopPropagation()}>
  <div className="drawer-top"><span>SOMA</span><button className="icon-btn" aria-label="Close menu" onClick={()=>setMenu(false)}><Icon name="close"/></button></div>
  {drawerLinks.map(([label,href],i)=><a onClick={()=>setMenu(false)} href={href} key={label} style={{'--i':i}}><span><em className="drawer-index">{String(i+1).padStart(2,'0')}</em>{label}</span><Icon name="arrow" size={18}/></a>)}
  <p>Pure care for natural you.</p>
 </nav></div>}
 </>
}
