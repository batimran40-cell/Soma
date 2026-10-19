import {useState} from 'react'
import {products} from '../data/products'
import Icon from './Icons'
export function Hero(){
 return <section className="hero soma-luxury-hero soma-editorial-hero" aria-labelledby="soma-hero-title">
  <div className="hero-copy soma-editorial-hero-copy" data-reveal>
   <span className="eyebrow soma-editorial-hero-eyebrow"><span className="soma-hero-eyebrow-mark" aria-hidden="true">✳</span> SOMA ORGANIC <span className="soma-hero-eyebrow-separator" aria-hidden="true">/</span> BOTANICAL CARE</span>
   <h1 id="soma-hero-title">A gentler<br/>way to <em>glow.</em></h1>
   <p>Thoughtful skincare inspired by nature. Discover a calmer, more beautiful everyday ritual.</p>
   <div className="soma-hero-actions">
    <a className="button soma-hero-primary" href="/products">EXPLORE COLLECTION <Icon name="arrow" size={18}/></a>
    <a className="soma-hero-story" href="/story">OUR PHILOSOPHY <Icon name="arrow" size={16}/></a>
   </div>
   <div className="soma-hero-note"><span className="soma-hero-note-rule" aria-hidden="true"/><span>BOTANICAL <i aria-hidden="true">/</i> CONSIDERED <i aria-hidden="true">/</i> EVERYDAY</span></div>
  </div>
  <div className="hero-visual soma-hero-media soma-editorial-hero-visual soma-curated-hero-visual" aria-label="Explore three Soma Organic skincare essentials">
   <div className="soma-curation-scene">
    <span className="soma-curation-orbit soma-curation-orbit-one" aria-hidden="true"/>
    <span className="soma-curation-orbit soma-curation-orbit-two" aria-hidden="true"/>
    <a className="soma-curation-product soma-curation-product-serum" href="/products/vitamin-c" aria-label="Explore Vitamin C Face Serum">
     <img src="/images/serum-hero.webp" alt="Soma Organic Vitamin C Face Serum in a warm botanical setting" loading="eager" fetchPriority="high" decoding="async"/>
     <span className="soma-curation-item-name">VITAMIN C SERUM <span aria-hidden="true">↗</span></span>
    </a>
    <a className="soma-curation-product soma-curation-product-cleanser" href="/products/aloe-wash" aria-label="Explore Aloe Vera Face Wash">
     <img src="/images/face-wash.webp" alt="Soma Organic Aloe Vera Face Wash" loading="eager" decoding="async"/>
     <span className="soma-curation-item-name">ALOE FACE WASH <span aria-hidden="true">↗</span></span>
    </a>
    <a className="soma-curation-product soma-curation-product-cream" href="/products/hydrating-cream" aria-label="Explore Hydrating Face Cream">
     <img src="/images/cream.webp" alt="Soma Organic Hydrating Face Cream on natural stone" loading="lazy" decoding="async"/>
     <span className="soma-curation-item-name">HYDRATING CREAM <span aria-hidden="true">↗</span></span>
    </a>
   </div>
   <div className="soma-editorial-photo-label" aria-hidden="true"><span>01 / THE SOMA COLLECTION</span><span>THREE ESSENTIALS · ONE RITUAL</span></div>
  </div>
 </section>
}
export function FeaturedProducts({onAdd}){return <section id="products" className="products section-pad soma-featured" aria-labelledby="soma-featured-title">
 <div className="section-heading soma-featured-heading" data-reveal><div><span className="eyebrow">01 / THE SOMA COLLECTION</span><h2 id="soma-featured-title">Skincare rooted <em>in nature.</em></h2></div><div className="soma-featured-intro"><p>Four botanical-inspired essentials for thoughtful everyday care.</p><a href="/products">VIEW ALL PRODUCTS <Icon name="arrow" size={16}/></a></div></div>
 <div className="product-grid soma-featured-grid">{products.map((p,index)=><article className="product-card soma-featured-card" key={p.id} data-reveal>
  <a className="product-image" href={`/products/${p.id}`} aria-label={`View ${p.name} details`}><span className="soma-featured-card-number">{String(index+1).padStart(2,'0')} / 04</span><img src={p.image} alt={p.name} loading="lazy"/><span className="add-overlay">DISCOVER PRODUCT <Icon name="arrow" size={15}/></span></a>
  <div className="soma-featured-card-body"><span className="product-tag">{p.tag}</span><a href={`/products/${p.id}`} className="soma-featured-product-link"><h3>{p.name}</h3></a><p>{p.detail}</p><button className="soma-featured-add" type="button" onClick={()=>onAdd(p)} aria-label={`Add ${p.name} to bag`}>ADD TO BAG <span aria-hidden="true">↗</span></button></div>
 </article>)}</div>
 <a className="underlined-link soma-featured-view-mobile" href="/products">EXPLORE THE WHOLE COLLECTION <Icon name="arrow" size={17}/></a>
 </section>}
export function OurPhilosophy(){return <section id="philosophy" className="philosophy"><div className="philosophy-image" data-reveal><img src="/images/collection.webp" alt="Soma botanical skincare arranged with natural plants and stone" loading="lazy"/></div><div className="philosophy-copy" data-reveal><span className="eyebrow">OUR PHILOSOPHY</span><span className="short-line left"/><h2>Botanical care<br/>for a brighter you.</h2><p>We believe in the power of plants to nourish, comfort, and reveal your natural radiance. Thoughtful skincare, rooted in nature and made for everyday rituals.</p><a href="/#bestseller" className="button">EXPLORE OUR STORY <Icon name="arrow" size={18}/></a></div></section>}
const benefits=[['leaf','Organic Ingredients'],['heart','Consciously Made'],['sprout','Plant Powered Formulas'],['sun','Healthy Radiance']]
export function Benefits(){return <section className="benefits" aria-label="Our values">{benefits.map(([icon,title])=><div className="benefit" key={title} data-reveal><Icon name={icon} size={34}/><p>{title}</p></div>)}</section>}
export function BestSeller({onAdd}){return <section id="bestseller" className="bestseller"><div className="bestseller-copy" data-reveal><span className="eyebrow">THE DAILY RITUAL</span><span className="short-line left"/><h2>The Vitamin C<br/>Face Serum</h2><p>A considered daily ritual. Our botanical-inspired serum is designed to complement your skincare routine with a touch of nature.</p><button className="button" onClick={onAdd}>ADD TO BAG <Icon name="arrow" size={18}/></button></div><div className="bestseller-art" data-reveal><img src="/images/serum-premium.webp" alt="Soma Vitamin C Face Serum" loading="lazy"/></div></section>}
export function RealResults(){return <section id="reviews" className="reviews section-pad"><div className="section-heading" data-reveal><span className="eyebrow">THE SOMA EXPERIENCE</span><h2>Care worth sharing</h2><span className="short-line"/></div><div className="review-grid">{[['A little moment of calm','Make space for a skincare ritual that feels like a pause in your day.'],['Rooted in simplicity','Thoughtful textures, botanical inspiration and everyday ease.'],['Beauty in the details','Our collection is designed to bring a considered touch to your shelf.']].map(([title,desc])=><div className="review" key={title} data-reveal><span className="quote-mark">“</span><h3>{title}</h3><p>{desc}</p><span className="review-caption">SOMA ORGANIC · OUR APPROACH</span></div>)}</div></section>}
export function Newsletter(){const [email,setEmail]=useState(''),[status,setStatus]=useState('idle');return <section className="newsletter"><div className="newsletter-shadow" aria-hidden="true"/><div data-reveal><span className="eyebrow">JOIN OUR JOURNEY</span><h2>Wellness in your inbox.</h2><p>Hear about product launches and beautiful everyday rituals.</p></div><form className="newsletter-form" onSubmit={e=>{e.preventDefault();setStatus('demo')}}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input required id="newsletter-email" type="email" placeholder="Your email address" value={email} onChange={e=>{setEmail(e.target.value);setStatus('idle')}}/><button className="button" type="submit">SUBSCRIBE <Icon name="arrow" size={17}/></button>{status==='demo'&&<p className="form-status" role="status">Demo form: connect an email service to enable subscriptions.</p>}</form></section>}
export function Footer(){return <footer id="footer" className="footer"><a className="footer-brand" href="/">SOMA <small>NATURAL BEAUTY · INSPIRED BY NATURE</small></a><nav aria-label="Footer navigation"><a href="/products">Shop</a><a href="/story">Our Story</a><a href="#bestseller">The Ritual</a><a href="/#reviews">Our Approach</a><a href="/help">Help & FAQs</a></nav><div className="footer-social"><span>© {new Date().getFullYear()} SOMA ORGANIC</span><a href="/" aria-label="Back to top"><Icon name="arrow" size={20}/></a></div></footer>}


export function EditorialFeature(){return <section className="editorial-feature" aria-labelledby="editorial-title"><img src="/images/editorial-nature.webp" alt="Vitamin C botanical serum in a lush natural setting" loading="lazy"/><div className="editorial-overlay" data-reveal><span className="eyebrow">MADE FOR YOUR MOMENT OF CALM</span><h2 id="editorial-title">A quieter kind<br/>of radiance.</h2><p>Thoughtful botanical rituals. Natural textures. Everyday beauty.</p><a href="/products" className="button button-cream">EXPLORE THE COLLECTION <Icon name="arrow" size={18}/></a></div></section>}
const ingredientItems=[{name:'Vitamin C',subtitle:'Inspired by citrus radiance',image:'/images/serum-premium.webp',number:'01'},{name:'Botanical Oils',subtitle:'A nourishing daily ritual',image:'/images/botanical-oil.webp',number:'02'},{name:'Plant Extracts',subtitle:'Rooted in natural care',image:'/images/ritual.webp',number:'03'}]
export function IngredientGallery(){return <section id="ingredients" className="ingredient-gallery section-pad"><div className="ingredient-heading" data-reveal><div><span className="eyebrow">THE BEAUTY OF BOTANICALS</span><h2>Nature is our<br/><em>inspiration.</em></h2></div><p>A sensorial approach to care, made for little moments that feel extraordinary.</p></div><div className="ingredient-cards">{ingredientItems.map(item=><article className="ingredient-card" key={item.number} data-reveal><div className="ingredient-image"><img src={item.image} alt={item.name} loading="lazy"/></div><div className="ingredient-meta"><span>{item.number} / BOTANICALS</span><h3>{item.name}</h3><p>{item.subtitle}</p></div></article>)}</div></section>}
export function RitualBanner(){return <section className="ritual-banner" aria-labelledby="ritual-heading"><div className="ritual-banner-art"><img src="/images/product-trio.webp" alt="Soma Organic skincare product collection with botanicals" loading="lazy"/></div><div className="ritual-banner-copy" data-reveal><span className="eyebrow">THE SOMA EDIT</span><h2 id="ritual-heading">The art of<br/><em>slowing down.</em></h2><p>Invite the beauty of the botanical world into your everyday rituals.</p><a className="underlined-link" href="/products">SHOP THE COLLECTION <Icon name="arrow" size={18}/></a></div></section>}

const ritualProducts=[
 {number:'01',step:'CLEANSE',title:'Begin gently.',detail:'A fresh start for your daily skincare ritual.',image:'/images/face-wash.webp',name:'Aloe Vera Face Wash',id:'aloe-wash'},
 {number:'02',step:'REFRESH',title:'Take a moment.',detail:'A simple refreshing step before serum.',image:'/images/toner.webp',name:'Neem & Tea Tree Toner',id:'neem-toner'},
 {number:'03',step:'TREAT',title:'Find your glow.',detail:'Make your serum a moment of everyday care.',image:'/images/serum-premium.webp',name:'Vitamin C Face Serum',id:'vitamin-c'},
 {number:'04',step:'MOISTURIZE',title:'Finish softly.',detail:'Complete your routine with comforting moisture.',image:'/images/hydrating-premium.webp',name:'Hydrating Face Cream',id:'hydrating-cream'}
]
export function RitualSteps(){return <section className="soma-ritual-steps" aria-labelledby="soma-ritual-title">
 <div className="soma-ritual-heading" data-reveal><div><span className="eyebrow">04 / THE DAILY RITUAL</span><h2 id="soma-ritual-title">A little care, <em>every day.</em></h2></div><p>Four simple moments. One beautifully considered routine. Explore the Soma essentials, at your own pace.</p></div>
 <div className="soma-ritual-grid">{ritualProducts.map(item=><a className="soma-ritual-step" href={`/products/${item.id}`} key={item.id} data-reveal aria-label={`Discover ${item.name}`}>
  <div className="soma-ritual-image"><span className="soma-ritual-number">{item.number} / 04</span><img src={item.image} alt={item.name} loading="lazy"/></div>
  <div className="soma-ritual-step-copy"><span>{item.step}</span><h3>{item.title}</h3><p>{item.detail}</p><span className="soma-ritual-discover">EXPLORE PRODUCT <span aria-hidden="true">↗</span></span></div>
 </a>)}</div>
 </section>}
