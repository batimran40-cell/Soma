import {useState} from 'react'
import {products} from '../data/products'
import '../styles/account-premium.css'

export default function AccountPage({favorites=[],recent=[]}){
 const [tab,setTab]=useState('overview')
 const [email,setEmail]=useState('')
 const [message,setMessage]=useState('')
 const options=[['overview','Overview'],['orders','Orders'],['addresses','Addresses'],['wishlist','Wishlist'],['security','Security']]
 const saved=products.filter(product=>favorites.includes(product.id))
 return <main className="soma-account">
  <div className="soma-account-heading"><span className="soma-account-eyebrow">SOMA ORGANIC · MY ACCOUNT</span><h1>Your personal space.</h1><p>A calmer place to keep track of your skincare rituals.</p></div>
  <div className="soma-account-layout">
   <aside className="soma-account-aside"><div className="soma-account-avatar" aria-hidden="true">S</div><strong>Welcome to Soma</strong><p>Account preview</p><nav aria-label="Account sections">{options.map(([id,title])=><button key={id} type="button" className={tab===id?'active':''} aria-current={tab===id?'page':undefined} onClick={()=>setTab(id)}>{title}<span aria-hidden="true">↗</span></button>)}</nav></aside>
   <section className="soma-account-main" aria-live="polite">
    {tab==='overview'&&<><span className="soma-account-eyebrow">THE DAILY RITUAL</span><h2>A little care, every day.</h2><p>Explore your favourites and discover thoughtful botanical skincare essentials.</p><div className="soma-account-stats"><div><strong>{saved.length}</strong><span>Saved products</span></div><div><strong>{recent.length}</strong><span>Recently viewed</span></div></div><a className="soma-account-cta" href="/products">Explore the collection <span>↗</span></a>{import.meta.env.DEV&&<p><a href="/admin-preview" className="soma-account-cta">Open local SOMA Studio ↗</a></p>}</>}
    {tab==='wishlist'&&<><span className="soma-account-eyebrow">YOUR FAVOURITES</span><h2>Saved for later.</h2>{saved.length?<div className="soma-account-saved">{saved.map(p=><a href={'/products/'+p.id} key={p.id}><img src={p.image} alt=""/><span>{p.name}<small>{p.detail}</small></span><span>↗</span></a>)}</div>:<p>Your wishlist is waiting for its first favourite.</p>}<a className="soma-account-cta" href="/wishlist">Open wishlist ↗</a></>}
    {tab==='orders'&&<><span className="soma-account-eyebrow">YOUR ORDERS</span><h2>Order history.</h2><p>Order tracking is not yet connected to a commerce backend. No orders or payment records are stored in this preview.</p><a className="soma-account-cta" href="/products">Shop products ↗</a></>}
    {tab==='addresses'&&<><span className="soma-account-eyebrow">DELIVERY DETAILS</span><h2>Your addresses.</h2><p>Saved delivery addresses become available after secure account and checkout integration. This preview does not collect personal address information.</p></>}
    {tab==='security'&&<><span className="soma-account-eyebrow">ACCOUNT ACCESS</span><h2>Privacy comes first.</h2><p>Sign-in, password changes and two-factor authentication will be available after an authentication provider is connected. No fake login or password storage is used.</p><form onSubmit={e=>{e.preventDefault();setMessage('This is a design preview. Email sign-in is not connected yet.')}}><label htmlFor="soma-preview-email">Email address</label><input id="soma-preview-email" value={email} onChange={e=>setEmail(e.target.value)} type="email" autoComplete="email" placeholder="you@example.com" required/><button type="submit">Continue ↗</button></form>{message&&<p role="status">{message}</p>}</>}
   </section>
  </div>
 </main>
}
