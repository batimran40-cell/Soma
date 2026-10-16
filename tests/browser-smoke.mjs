import {chromium} from 'playwright'
import {spawn} from 'node:child_process'
import {mkdir} from 'node:fs/promises'

const base='http://127.0.0.1:4178'
const pages=['/','/products','/products/vitamin-c','/wishlist','/cart','/account','/admin-preview']
const widths=[320,375,768,1024,1440,1920]
const screenshots=['/','/products','/products/vitamin-c','/admin-preview']
const server=spawn('npm',['run','dev','--','--host','127.0.0.1','--port','4178','--strictPort'],{stdio:'pipe'})
let output=''
server.stderr.on('data',chunk=>{output+=chunk.toString()})
server.stdout.on('data',chunk=>{output+=chunk.toString()})

async function ready(){
 for(let i=0;i<100;i++){
  if(server.exitCode!==null)throw new Error('Vite exited: '+output.slice(-900))
  try {const response=await fetch(base);if(response.ok)return}
  catch {/* wait for Vite startup */}
  await new Promise(resolve=>setTimeout(resolve,200))
 }
 throw new Error('Vite did not start: '+output.slice(-900))
}
let browser
try {
 await ready()
 browser=await chromium.launch({headless:true,args:['--no-sandbox']})
 await mkdir('artifacts/soma-ui',{recursive:true})
 const failures=[]
 for (const width of widths) {
  const page=await browser.newPage({viewport:{width,height:850},reducedMotion:'reduce'})
  const runtime=[]
  page.on('pageerror',error=>runtime.push(error.message))
  for(const path of pages) {
   const response=await page.goto(base+path,{waitUntil:'networkidle',timeout:30000})
   if(!response?.ok())failures.push(path+' at '+width+': HTTP response not OK')
   const layout=await page.evaluate(()=>({
    overflow:document.documentElement.scrollWidth-innerWidth,
    heading:!!document.querySelector('main h1'),
    overlay:!!document.querySelector('vite-error-overlay')
   }))
   if(layout.overflow>3)failures.push(path+' at '+width+': horizontal overflow '+layout.overflow)
   if(!layout.heading)failures.push(path+' at '+width+': missing heading')
   if(layout.overlay)failures.push(path+' at '+width+': Vite error overlay')
   if(runtime.length){failures.push(path+' at '+width+': '+runtime.splice(0).join('; '))}
   if((width===375||width===1440)&&screenshots.includes(path)){
    const name=path==='/'?'home':path.slice(1).replaceAll('/','-')
    await page.screenshot({path:'artifacts/soma-ui/'+name+'-'+width+'.png',fullPage:true})
   }
  }
  await page.close()
 }
 const page=await browser.newPage({viewport:{width:1280,height:800}})
 await page.goto(base+'/',{waitUntil:'networkidle'})
 await page.getByRole('button',{name:/Search products/}).click()
 const dialog=page.getByRole('dialog',{name:/What are you looking for/})
 await dialog.waitFor()
 await dialog.getByRole('searchbox').fill('vitamin')
 if(!(await dialog.getByText('Vitamin C Face Serum').count()))failures.push('Search dialog did not return Vitamin C serum')
 await page.keyboard.press('Escape')
 if(await dialog.count())failures.push('Search dialog did not close on Escape')
 await page.goto(base+'/products/vitamin-c',{waitUntil:'networkidle'})
 await page.goto(base+'/admin-preview',{waitUntil:'networkidle'})
 await page.getByRole('button',{name:/Products/}).first().click()
 await page.getByRole('button',{name:/Add product/}).click()
 const editor=page.getByRole('dialog',{name:'New product draft'})
 await editor.getByRole('textbox',{name:'Product name'}).fill('Browser test draft')
 await editor.getByRole('button',{name:/Save demo changes/}).click()
 if(!await page.getByText('Browser test draft').count())failures.push('Admin draft did not save')
 await browser.close()
 if(failures.length)throw new Error(failures.join('\n'))
 console.log('Browser checks passed: '+pages.length+' routes × '+widths.length+' viewports; search + admin draft interactions.')
} catch(error){
 if(browser)await browser.close().catch(()=>{})
 console.error(error)
 process.exitCode=1
} finally {server.kill('SIGTERM')}
