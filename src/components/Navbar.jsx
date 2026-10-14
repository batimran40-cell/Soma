import {useState,useEffect} from 'react'
import Icon from './Icons'
export default function Navbar({onCart,cartCount}) {
 const [menu,setMenu]=useState(false),[search,setSearch]=useState(false),[term,setTerm]=useState('')
 useEffect(()=>{document.body.classList.toggle('drawer-open',menu);return ()=>document.body.classList.remove('drawer-open')},[menu])
 return <>
 <header className="site-header" id="top"><div className="nav-inner">
  <button className="icon-btn" aria-label="Open menu" onClick={()=>setMenu(true)}><Icon name="menu"/></button>
  <a className="wordmark" href="#top" aria-label="Soma home">SOMA</a>
  <div className="header-actions"><button className="cart-button" onClick={onCart} aria-label={`Open cart, ${cartCount} items`}>CART ({cartCount})</button><button className="icon-btn" aria-label="Search products" onClick={()=>setSearch(v=>!v)}><Icon name="search" size={21}/></button></div>
 </div>{search&&<form className="search-bar" onSubmit={e=>{e.preventDefault();document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}}><label htmlFor="site-search">Search Soma products</label><input id="site-search" autoFocus value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search the collection…"/><button className="small-button" type="submit">VIEW COLLECTION <Icon name="arrow" size={15}/></button></form>}</header>
 {menu&&<div className="drawer-backdrop" onClick={()=>setMenu(false)}><nav className="drawer" aria-label="Main navigation" onClick={e=>e.stopPropagation()}><div className="drawer-top"><span>SOMA</span><button className="icon-btn" aria-label="Close menu" onClick={()=>setMenu(false)}><Icon name="close"/></button></div>{[['Home','#top'],['Shop','#products'],['Our Philosophy','#philosophy'],['Our Ritual','#bestseller'],['Reviews','#reviews'],['Contact','#footer']].map(([label,href])=><a onClick={()=>setMenu(false)} href={href} key={label}>{label}<Icon name="arrow" size={18}/></a>)}<p>Pure care for natural you.</p></nav></div>}
 </>
}
