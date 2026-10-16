import test from 'node:test'
import assert from 'node:assert/strict'
import {getDemoReport,readDemoAnalytics,recordDemoEvent,resetDemoAnalytics} from '../src/data/demoAnalytics.js'

function storage(){
 const values = new Map()
 return {getItem:k=>values.has(k)?values.get(k):null,setItem:(k,v)=>values.set(k,String(v)),removeItem:k=>values.delete(k)}
}
function setup(){
 globalThis.window={localStorage:storage(),sessionStorage:storage(),dispatchEvent:()=>{}}
}

test('all current catalog products appear with zero demo metrics',()=>{
 setup()
 const {rows,totals}=getDemoReport()
 assert.equal(rows.length,4)
 assert.equal(totals.views,0)
 for(const row of rows)assert.equal(row.views,0)
})

test('product views count once per browser session, with independent products',()=>{
 setup()
 assert.equal(recordDemoEvent('vitamin-c','views'),true)
 assert.equal(recordDemoEvent('vitamin-c','views'),false)
 assert.equal(recordDemoEvent('aloe-wash','views'),true)
 assert.equal(getDemoReport().totals.views,2)
 assert.equal(readDemoAnalytics()['vitamin-c'].views,1)
})

test('new session may record another view; cart and wishlist count actions',()=>{
 setup()
 recordDemoEvent('vitamin-c','views')
 window.sessionStorage=storage()
 assert.equal(recordDemoEvent('vitamin-c','views'),true)
 recordDemoEvent('vitamin-c','cartAdds')
 recordDemoEvent('vitamin-c','wishlistAdds')
 assert.equal(getDemoReport().totals.views,2)
 assert.equal(getDemoReport().totals.cartAdds,1)
 assert.equal(getDemoReport().totals.wishlistAdds,1)
})

test('invalid product IDs and event types never enter analytics',()=>{
 setup()
 assert.equal(recordDemoEvent('__proto__','views'),false)
 assert.equal(recordDemoEvent('fake-id','views'),false)
 assert.equal(recordDemoEvent('vitamin-c','orders'),false)
 assert.deepEqual(readDemoAnalytics(),{})
})

test('corrupted and negative browser data is ignored',()=>{
 setup()
 window.localStorage.setItem('soma-demo-analytics-v1','broken')
 assert.deepEqual(readDemoAnalytics(),{})
 window.localStorage.setItem('soma-demo-analytics-v1',JSON.stringify({'vitamin-c':{views:-10,cartAdds:Infinity,wishlistAdds:5},'alien':{views:90}}))
 assert.equal(getDemoReport().totals.views,0)
 assert.equal(getDemoReport().totals.wishlistAdds,5)
 assert.equal(getDemoReport().rows.length,4)
})

test('reset clears metrics and view deduplication state',()=>{
 setup()
 recordDemoEvent('vitamin-c','views')
 assert.equal(resetDemoAnalytics(),true)
 assert.equal(recordDemoEvent('vitamin-c','views'),true)
 assert.equal(getDemoReport().totals.views,1)
})

test('storage denial does not crash analytics',()=>{
 globalThis.window={localStorage:{getItem(){throw Error('disabled')},setItem(){throw Error('disabled')}},sessionStorage:storage(),dispatchEvent:()=>{}}
 assert.deepEqual(readDemoAnalytics(),{})
 assert.equal(recordDemoEvent('vitamin-c','views'),false)
})
