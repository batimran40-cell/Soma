import {useState} from 'react'
import '../styles/editorial-pages.css'

export function StoryPage(){
 return <main className="soma-editorial-page">
  <section className="sep-hero"><div className="sep-hero-copy"><span className="sep-eyebrow">SOMA ORGANIC · OUR APPROACH</span><h1>A quieter kind <em>of beauty.</em></h1><p>We believe a daily skincare ritual should feel considered, calm and uniquely yours. Inspired by the botanical world, Soma brings a little pause to everyday care.</p><a href="/products" className="sep-cta">EXPLORE THE COLLECTION <span>↗</span></a></div><div className="sep-hero-photo"><img src="/images/collection.webp" alt="Soma Organic skincare collection arranged with botanical elements"/></div></section>
  <section className="sep-manifesto"><span className="sep-eyebrow">OUR PHILOSOPHY</span><h2>Thoughtful rituals.<br/><em>Simply beautiful.</em></h2><p>Natural textures, a softer pace and the small satisfaction of taking time for yourself. Our collection invites you to make room for those moments.</p></section>
  <section className="sep-split"><div className="sep-photo"><img src="/images/editorial-nature.webp" alt="Soma botanical serum surrounded by green leaves" loading="lazy"/></div><div className="sep-copy"><span className="sep-eyebrow">THE ART OF EVERYDAY CARE</span><h2>Care starts with intention.</h2><p>From the first cleanse to the final nourishing step, discover four Soma Organic essentials designed to be part of a simple, personal routine.</p><a href="/products" className="sep-text-link">DISCOVER THE PRODUCTS ↗</a></div></section>
 </main>
}
const faq=[
 ['How do I learn more about a product?','Visit any product details page to explore its product concept, intended routine, and available information. Final ingredient lists and safety instructions must be confirmed from the physical product packaging.'],
 ['Can I place an order through the website?','Online order submission is not enabled yet. You can explore the collection, save favorites and prepare your shopping bag while pricing and secure checkout are being configured.'],
 ['Are prices and delivery charges available?','Verified product prices, delivery fees and shipping options have not been published. The website will display those details once they are confirmed.'],
 ['How does the wishlist work?','The wishlist and recently viewed products are saved locally in this browser. They do not sync between devices or accounts.'],
 ['Where can I find shipping and return policies?','Shipping, returns and refunds policies are being prepared and will be published before the website accepts real orders.']
]
export function HelpPage(){
 const [open,setOpen]=useState(0)
 return <main className="soma-editorial-page sep-help"><div className="sep-help-heading"><span className="sep-eyebrow">SOMA ORGANIC · INFORMATION</span><h1>Here to <em>help.</em></h1><p>A little clarity makes every ritual feel easier. Browse commonly asked questions about our collection and current shopping experience.</p></div><section className="sep-faq" aria-label="Frequently asked questions">{faq.map(([q,a],i)=><div className="sep-faq-row" key={q}><button type="button" aria-expanded={open===i} onClick={()=>setOpen(open===i?-1:i)}><span>{String(i+1).padStart(2,'0')}</span><strong>{q}</strong><span>{open===i?'−':'+'}</span></button>{open===i&&<p>{a}</p>}</div>)}</section><div className="sep-help-foot"><span className="sep-eyebrow">DISCOVER SOMA</span><h2>Find your daily ritual.</h2><a className="sep-cta" href="/products">SHOP THE COLLECTION <span>↗</span></a></div></main>
}
export function NotFoundPage(){
 return <main className="soma-editorial-page sep-notfound"><span className="sep-eyebrow">SOMA ORGANIC / 404</span><h1>A little off <em>the path.</em></h1><p>We couldn't find this page, but your next botanical ritual is just a click away.</p><a href="/" className="sep-cta">RETURN HOME <span>↗</span></a></main>
}
