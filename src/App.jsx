import {useEffect,useState} from 'react'
import Navbar from './components/Navbar'
import Icon from './components/Icons'
import {Hero,FeaturedProducts,OurPhilosophy,Benefits,BestSeller,RealResults,Newsletter,Footer,EditorialFeature,IngredientGallery,RitualBanner} from './components/Sections'
import {products} from './data/products'
import './styles/global.css'
export default function App(){
 const [cart,setCart]=useState([]),[cartOpen,setCartOpen]=useState(false)
 const add=(p)=>{setCart(items=>{const found=items.find(i=>i.id===p.id);return found?items.map(i=>i.id===p.id?{...i,quantity:i.quantity+1}:i):[...items,{...p,quantity:1}]});setCartOpen(true)}
 useEffect(()=>{
  let ctx;let disposed=false
  const start=async()=>{
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
   try { const [{default:gsap},{ScrollTrigger}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);if(disposed)return;gsap.registerPlugin(ScrollTrigger);ctx=gsap.context(()=>{gsap.utils.toArray('[data-reveal]').forEach(el=>gsap.fromTo(el,{opacity:0,y:28},{opacity:1,y:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));gsap.to('.hero-visual img',{y:-24,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}})})}catch(err){console.warn('Animations unavailable; static site remains usable',err)}
  };start();return()=>{disposed=true;ctx?.revert()}
 },[])
 const count=cart.reduce((sum,i)=>sum+i.quantity,0)
 return <div className="site-shell"><div className="page-frame"><Navbar onCart={()=>setCartOpen(true)} cartCount={count}/><main><Hero/><FeaturedProducts onAdd={add}/><EditorialFeature/><OurPhilosophy/><Benefits/><IngredientGallery/><BestSeller onAdd={()=>add(products[0])}/><RitualBanner/><RealResults/><Newsletter/></main><Footer/></div>{cartOpen&&<div className="cart-scrim" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" onClick={e=>e.stopPropagation()}><header><h2>Your bag ({count})</h2><button aria-label="Close cart" className="icon-btn" onClick={()=>setCartOpen(false)}><Icon name="close"/></button></header>{cart.length===0?<p>Your bag is currently empty.</p>:<div className="cart-items">{cart.map(p=><div className="cart-item" key={p.id}><img src={p.image} alt=""/><div><h3>{p.name}</h3><p>Quantity: {p.quantity}</p><button onClick={()=>setCart(x=>x.filter(i=>i.id!==p.id))}>Remove</button></div></div>)}</div>}<div className="cart-bottom"><p>Product pricing and checkout are not yet configured.</p><button className="button" onClick={()=>setCartOpen(false)}>CONTINUE SHOPPING</button></div></aside></div>}</div>
}
