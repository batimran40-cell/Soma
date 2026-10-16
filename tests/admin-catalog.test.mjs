import test from 'node:test'
import assert from 'node:assert/strict'
import {readDemoCatalog,saveDemoProduct,deleteDemoDraft,resetDemoCatalog,newDemoProduct} from '../src/data/demoCatalog.js'

function makeStorage(){
 const data = new Map()
 return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)}
}
const init=()=>{globalThis.window={localStorage:makeStorage()}}

test('demo catalog starts from the four original public products',()=>{
 init()
 const catalog=readDemoCatalog()
 assert.equal(catalog.length,4)
 assert.ok(catalog.every(item=>item.isDemo===false))
})

test('original product can be edited locally without modifying source catalog',()=>{
 init()
 const result=saveDemoProduct({id:'vitamin-c',name:'Soma Vitamin C',detail:'Local display copy',image:'/images/serum-premium.webp',status:'active'})
 assert.equal(result.ok,true)
 assert.equal(readDemoCatalog().find(x=>x.id==='vitamin-c').name,'Soma Vitamin C')
 assert.equal(deleteDemoDraft('vitamin-c'),false)
})

test('draft creation, updates and deletion are persistent in browser only',()=>{
 init()
 const p=newDemoProduct()
 p.name='New serum draft'
 assert.equal(saveDemoProduct(p).ok,true)
 assert.equal(readDemoCatalog().length,5)
 assert.equal(readDemoCatalog().find(x=>x.id===p.id).status,'draft')
 assert.equal(deleteDemoDraft(p.id),true)
 assert.equal(readDemoCatalog().length,4)
})

test('unknown image URLs are replaced by an allowed product asset',()=>{
 init()
 const draft={...newDemoProduct(),name:'Safe serum',image:'javascript:alert(1)',status:'nope'}
 assert.equal(saveDemoProduct(draft).ok,true)
 const read=readDemoCatalog().find(x=>x.id===draft.id)
 assert.equal(read.image,'/images/serum-premium.webp')
 assert.equal(read.status,'draft')
})

test('invalid product IDs and blank names are rejected',()=>{
 init()
 assert.equal(saveDemoProduct({id:'x',name:'Oops'}).ok,false)
 assert.equal(saveDemoProduct({...newDemoProduct(),name:'   '}).ok,false)
})

test('reset removes browser-local demo catalog edits',()=>{
 init()
 saveDemoProduct({...newDemoProduct(),name:'Draft'})
 assert.equal(resetDemoCatalog(),true)
 assert.equal(readDemoCatalog().length,4)
})
