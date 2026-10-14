import {useEffect,useState} from 'react'
import {products} from '../data/products'
import '../styles/product-detail.css'

const copy={
 'vitamin-c':{category:'SERUM · DAILY RITUAL',headline:'A little light, in every drop.',description:'Meet a botanical-inspired Vitamin C face serum, created to make your daily skincare feel special.',ritual:'After cleansing, apply a small amount according to your product instructions, then follow with moisturizer and daytime sunscreen.'},
 'aloe-wash':{category:'CLEANSER · FRESH START',headline:'A softer beginning.',description:'Refresh your skincare routine with Soma Organic Aloe Vera Face Wash.',ritual:'Massage gently onto damp skin, rinse thoroughly, and follow with your favorite moisturizer.'},
 'hydrating-cream':{category:'MOISTURIZER · EVERYDAY COMFORT',headline:'The art of feeling cared for.',description:'A comforting cream for a simple, considered daily moisturizing ritual.',ritual:'Use after cleansing and any serum, following the directions on the final product packaging.'},
 'neem-toner':{category:'TONER · BOTANICAL BALANCE',headline:'A moment to reset.',description:'Neem and tea tree inspiration for a refreshing step in your everyday skincare ritual.',ritual:'Apply following the directions on the final product packaging, and avoid contact with eyes.'}
}
export default function ProductDetailPage({slug,onAdd}){
 const product=products.find(p=>p.id===slug)
 const [quantity,setQuantity]=useState(1)
 const [active,setActive]=useState(0)
 const [expanded,setExpanded]=useState('ritual')
 useEffect(()=>{setQuantity(1);setActive(0);setExpanded('ritual')},[slug])
 useEffect(()=>{const onKey=e=>{if(e.key==='ArrowRight')setActive(v=>(v+1)%2);if(e.key==='ArrowLeft')setActive(v=>(v+1)%2)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[])
 if(!product)return <main className="soma-detail-missing"><span className="pdp-eyebrow">SOMA ORGANIC</span><h1>We couldn't find that ritual.</h1><p>This product isn't in our collection.</p><a className="pdp-btn" href="/products">BACK TO THE COLLECTION →</a></main>
 const info=copy[product.id]
 const related=products.filter(p=>p.id!==product.id).slice(0,3)
 const images=[product.image,'/images/collection.webp']
 return <main className="soma-pdp">
  <nav className="pdp-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/products">Shop</a><span>/</span><span aria-current="page">{product.name}</span></nav>
  <div className="pdp-main">
   <section className="pdp-gallery" aria-label={product.name+' gallery'}>
     <div className="pdp-gallery-stage"><img key={images[active]} src={images[active]} alt={active===0?product.name:'Soma Organic botanical collection'} /><span className="pdp-gallery-counter">0{active+1} / 02</span><button className="pdp-gallery-next" type="button" onClick={()=>setActive((active+1)%2)} aria-label="Next product image">→</button></div>
     <div className="pdp-thumbs">{images.map((src,i)=><button type="button" key={src} onClick={()=>setActive(i)} className={active===i?'selected':''} aria-label={'Show image '+(i+1)} aria-pressed={active===i}><img src={src} alt=""/></button>)}</div>
   </section>
   <section className="pdp-information">
     <span className="pdp-eyebrow">{info.category}</span><div className="pdp-small-rule"/>
     <h1>{product.name}</h1><p className="pdp-subtitle">{info.headline}</p>
     <p className="pdp-desc">{info.description}</p><div className="pdp-meta"><span>{product.detail}</span><span>{product.tag}</span></div>
     <div className="pdp-purchase"><div className="pdp-qty" aria-label="Quantity selector"><button type="button" onClick={()=>setQuantity(v=>Math.max(1,v-1))} aria-label="Decrease quantity">−</button><span aria-live="polite">{quantity}</span><button type="button" onClick={()=>setQuantity(v=>Math.min(20,v+1))} aria-label="Increase quantity">+</button></div><button className="pdp-btn pdp-add" onClick={()=>{for(let i=0;i<quantity;i++)onAdd(product)}}>ADD TO BAG <span>↗</span></button></div>
     <p className="pdp-price-note">Product prices and checkout are not configured yet.</p>
     <div className="pdp-accordions">{[{id:'ritual',title:'THE DAILY RITUAL',body:info.ritual},{id:'details',title:'PRODUCT DETAILS',body:product.detail+' · '+info.description},{id:'ingredients',title:'INGREDIENTS & SAFETY',body:'The final ingredient list and safety information have not yet been provided. Please confirm the physical product label before purchasing or using.'}].map(x=><div className="pdp-accordion" key={x.id}><button type="button" aria-expanded={expanded===x.id} onClick={()=>setExpanded(expanded===x.id?'':x.id)}>{x.title}<span>{expanded===x.id?'−':'+'}</span></button>{expanded===x.id&&<p>{x.body}</p>}</div>)}</div>
   </section>
  </div>
  <section className="pdp-editorial"><span className="pdp-eyebrow">THE SOMA PHILOSOPHY</span><h2>Nature, considered.<br/><em>Care, reimagined.</em></h2><p>Thoughtful everyday essentials made for moments of calm. Discover a routine that feels like your own.</p><a className="pdp-text-link" href="/products">EXPLORE THE COLLECTION ↗</a></section>
  <section className="pdp-related"><div className="pdp-related-heading"><div><span className="pdp-eyebrow">CONTINUE YOUR RITUAL</span><h2>Made to go together.</h2></div><a href="/products">SHOP ALL ↗</a></div><div className="pdp-related-grid">{related.map(p=><article key={p.id}><a href={'/products/'+p.id}><div className="pdp-related-image"><img src={p.image} alt={p.name} loading="lazy"/></div><span className="pdp-related-tag">{p.tag}</span><h3>{p.name}</h3><p>{p.detail}</p></a></article>)}</div></section>
 </main>
}