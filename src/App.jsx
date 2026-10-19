import {useEffect,useState} from 'react'
import Navbar from './components/Navbar'
import AdminDashboard from './components/AdminDashboard'
import {recordDemoEvent} from './data/demoAnalytics'
import AccountPage from './components/AccountPage'
import ProductsPage from './components/ProductsPage'
import ProductDetailPage from './components/ProductDetailPage'
import CartExperience from './components/CartExperience'
import CheckoutPage from './components/CheckoutPage'
import DiscoveryPage from './components/DiscoveryPage'
import {StoryPage,HelpPage,NotFoundPage} from './components/EditorialPages'
import {Hero,FeaturedProducts,OurPhilosophy,Benefits,BestSeller,RealResults,Newsletter,Footer,EditorialFeature,IngredientGallery,RitualBanner,RitualSteps} from './components/Sections'
import {products} from './data/products'
import './styles/global.css'
import './styles/refinements.css'
import './styles/hero-premium.css'
import './styles/reference-inspired.css'
import './styles/reference-shop.css'
import './styles/hero-navbar-fix.css'
import './styles/soma-premium-final.css'
import './styles/premium-system-v2.css'
import './styles/visual-qa-fixes.css'
import './styles/editorial-polish.css'
import './styles/soma-atelier-reference.css'
import './styles/navbar-reference-final.css'
import './styles/hero-editorial-final.css'
import './styles/hero-product-curation.css'
import './styles/collection-reference-final.css'
export default function App(){
 const [cart,setCart]=useState(()=>{try{const saved=JSON.parse(localStorage.getItem('soma-cart-v1')||'[]');if(!Array.isArray(saved))return [];return saved.filter(x=>products.some(p=>p.id===x.id)&&Number.isInteger(x.quantity)&&x.quantity>0).map(x=>({...products.find(p=>p.id===x.id),quantity:Math.min(x.quantity,20)}))}catch{return []}}),[cartOpen,setCartOpen]=useState(false)
 useEffect(()=>{try{localStorage.setItem('soma-cart-v1',JSON.stringify(cart.map(({id,quantity})=>({id,quantity}))))}catch{}},[cart])
 const setQuantity=(id,quantity)=>setCart(items=>quantity<=0?items.filter(p=>p.id!==id):items.map(p=>p.id===id?{...p,quantity:Math.min(20,Math.max(1,quantity))}:p))
 const remove=(id)=>setCart(items=>items.filter(p=>p.id!==id))
 const [favorites,setFavorites]=useState(()=>{try{const a=JSON.parse(localStorage.getItem('soma-favorites-v1')||'[]');return Array.isArray(a)?a.filter(id=>products.some(p=>p.id===id)):[]}catch{return []}})
 const [recent,setRecent]=useState(()=>{try{const a=JSON.parse(localStorage.getItem('soma-recent-v1')||'[]');return Array.isArray(a)?a.filter(id=>products.some(p=>p.id===id)).slice(0,4):[]}catch{return []}})
 const toggleFavorite=id=>{if(!favorites.includes(id))recordDemoEvent(id,'wishlistAdds');setFavorites(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id])}
 useEffect(()=>{try{localStorage.setItem('soma-favorites-v1',JSON.stringify(favorites))}catch{}},[favorites])
 useEffect(()=>{try{localStorage.setItem('soma-recent-v1',JSON.stringify(recent))}catch{}},[recent])
 const [path,setPath]=useState(window.location.pathname.replace(/\/$/,'')||'/')
 useEffect(()=>{const update=()=>setPath(window.location.pathname.replace(/\/$/,'')||'/');window.addEventListener('popstate',update);const click=e=>{const link=e.target.closest('a[href]');if(!link||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;if(link.target==='_blank'||link.hasAttribute('download'))return;const url=new URL(link.href);if(url.origin!==location.origin||!(/^\/$|^\/(?:cart|checkout|wishlist|account|admin-preview|story|help)\/?$|^\/products\/?$|^\/products\/[a-z0-9-]+\/?$/.test(url.pathname)))return;e.preventDefault();history.pushState({},'',url.pathname+url.hash);update();if(url.hash){requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById(url.hash.slice(1))?.scrollIntoView({block:'start'})))}else window.scrollTo({top:0,behavior:'instant'})};document.addEventListener('click',click);return()=>{window.removeEventListener('popstate',update);document.removeEventListener('click',click)}},[])
 useEffect(()=>{const id=path.startsWith('/products/')?path.split('/')[2]:null;if(id&&products.some(p=>p.id===id)){recordDemoEvent(id,'views');setRecent(v=>[id,...v.filter(x=>x!==id)].slice(0,4))}},[path])
 const add=(p,amount=1)=>{recordDemoEvent(p.id,'cartAdds');const qty=Math.max(1,Math.min(20,Number(amount)||1));setCart(items=>{const found=items.find(i=>i.id===p.id);return found?items.map(i=>i.id===p.id?{...i,quantity:Math.min(20,i.quantity+qty)}:i):[...items,{...p,quantity:qty}]});setCartOpen(true)}
 useEffect(()=>{
  let ctx;let disposed=false
  const start=async()=>{
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
   try { const [{default:gsap},{ScrollTrigger}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);if(disposed)return;gsap.registerPlugin(ScrollTrigger);ctx=gsap.context(()=>{gsap.utils.toArray('[data-reveal]').forEach(el=>gsap.fromTo(el,{opacity:0,y:28},{opacity:1,y:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}))})}catch(err){console.warn('Animations unavailable; static site remains usable',err)}
  };start();return()=>{disposed=true;ctx?.revert()}
 },[path])
 useEffect(()=>{const onEscape=e=>{if(e.key==='Escape')setCartOpen(false)};window.addEventListener('keydown',onEscape);return()=>window.removeEventListener('keydown',onEscape)},[])
 useEffect(()=>{const product=path.startsWith('/products/')?products.find(p=>p.id===path.split('/')[2]):null;const titles={'/':'Soma Organic — Botanical Skincare','/products':'Shop Botanical Skincare — Soma Organic','/wishlist':'Your Wishlist — Soma Organic','/account':'My Account — Soma Organic','/admin-preview':'Soma Studio — Local Demo','/cart':'Shopping Bag — Soma Organic','/checkout':'Checkout Preview — Soma Organic','/story':'Our Story — Soma Organic','/help':'Help & FAQs — Soma Organic'};document.title=product?`${product.name} — Soma Organic`:(titles[path]||'Page Not Found — Soma Organic');const desc=product?`Discover ${product.name}, part of the Soma Organic skincare collection.`:(path==='/story'?'Discover the botanical inspiration and daily rituals behind Soma Organic.':path==='/products'?'Explore the Soma Organic skincare collection.':'Explore thoughtful botanical skincare rituals by Soma Organic.');const meta=document.querySelector('meta[name="description"]');if(meta)meta.setAttribute('content',desc)},[path])
 const count=cart.reduce((sum,i)=>sum+i.quantity,0)
 return <div className="site-shell"><div className="page-frame">{path==='/admin-preview'?null:<Navbar onCart={()=>setCartOpen(true)} cartCount={count}/>}{path==='/admin-preview'?(import.meta.env.DEV?<AdminDashboard/>:<NotFoundPage/>):path==='/account'?<AccountPage favorites={favorites} recent={recent}/>:path==='/story'?<StoryPage/>:path==='/help'?<HelpPage/>:path==='/wishlist'?<DiscoveryPage favorites={favorites} onToggle={toggleFavorite} recent={recent} onAdd={add}/>:path==='/checkout'?<CheckoutPage items={cart}/>:path==='/cart'?<CartExperience asPage items={cart} onQuantity={setQuantity} onRemove={remove} onClear={()=>setCart([])} onClose={()=>setCartOpen(false)}/>:path.startsWith('/products/')?<ProductDetailPage slug={path.split('/')[2]} onAdd={add} favorites={favorites} onToggle={toggleFavorite}/>:path==='/products'?<ProductsPage onAdd={add} favorites={favorites} onToggle={toggleFavorite} cartCount={count} onCart={()=>setCartOpen(true)}/>:path==='/'?<main><Hero/><FeaturedProducts onAdd={add}/><EditorialFeature/><OurPhilosophy/><Benefits/><RitualSteps/><IngredientGallery/><BestSeller onAdd={()=>add(products[0])}/><RitualBanner/><RealResults/><Newsletter/></main>:<NotFoundPage/>}{path==='/admin-preview'?null:<Footer/>}</div><CartExperience open={cartOpen} items={cart} onQuantity={setQuantity} onRemove={remove} onClear={()=>setCart([])} onClose={()=>setCartOpen(false)}/></div>
}