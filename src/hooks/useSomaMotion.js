import {useEffect} from 'react'

/**
 * Progressive enhancement for Soma's existing storefront.
 * All product visuals remain real assets; no WebGL or extra runtime dependencies.
 */
export function useSomaMotion(path) {
  useEffect(() => {
    if (typeof window === 'undefined' || path !== '/') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let ctx
    let disposed = false
    const cleanups = []
    const run = async () => {
      try {
        const [{default: gsap}, {ScrollTrigger}] = await Promise.all([
          import('gsap'), import('gsap/ScrollTrigger')
        ])
        if (disposed) return
        gsap.registerPlugin(ScrollTrigger)
        ctx = gsap.context(() => {
          const heroCopy = document.querySelector('.soma-luxury-hero .hero-copy')
          const heroProduct = document.querySelector('.soma-hero-product')
          const heroVisual = document.querySelector('.soma-hero-media')
          if (heroCopy) {
            gsap.fromTo(heroCopy.children,
              {opacity:0, y:30},
              {opacity:1, y:0, duration:1, stagger:0.12, ease:'power3.out', clearProps:'opacity,transform'}
            )
          }
          if (heroProduct) {
            gsap.fromTo(heroProduct,
              {opacity:0, scale:0.93, y:32},
              {opacity:1, scale:1, y:0, duration:1.45, delay:.12, ease:'power3.out', clearProps:'opacity'}
            )
            gsap.to(heroProduct, {
              yPercent:-7, ease:'none',
              scrollTrigger:{trigger:'.soma-luxury-hero',start:'top top',end:'bottom top',scrub:1}
            })
          }
          gsap.utils.toArray('[data-reveal]').filter(el=>!el.closest('.soma-luxury-hero')).forEach(el=>{
            gsap.fromTo(el,{opacity:0,y:32},{
              opacity:1,y:0,duration:.85,ease:'power2.out',
              scrollTrigger:{trigger:el,start:'top 90%',once:true},
              clearProps:'opacity,transform'
            })
          })
          gsap.utils.toArray('.editorial-feature > img, .philosophy-image > img, .ingredient-image > img').forEach(img=>{
            gsap.fromTo(img,{scale:1.075},{scale:1,ease:'none',
              scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:1.2}
            })
          })
          if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && heroVisual && heroProduct) {
            const xTo = gsap.quickTo(heroProduct,'x',{duration:.65,ease:'power3.out'})
            const rotateTo = gsap.quickTo(heroProduct,'rotation',{duration:.65,ease:'power3.out'})
            const onMove = event => {
              const rect = heroVisual.getBoundingClientRect()
              const pos = (event.clientX - rect.left)/rect.width - .5
              xTo(pos*18)
              rotateTo(pos*1.6)
            }
            const onLeave = () => {xTo(0);rotateTo(0)}
            heroVisual.addEventListener('pointermove',onMove,{passive:true})
            heroVisual.addEventListener('pointerleave',onLeave)
            cleanups.push(()=>{
              heroVisual.removeEventListener('pointermove',onMove)
              heroVisual.removeEventListener('pointerleave',onLeave)
            })
          }
          requestAnimationFrame(()=>{if(!disposed) ScrollTrigger.refresh()})
        })
      } catch (error) {
        console.warn('Soma motion is unavailable; the page remains accessible.',error)
      }
    }
    run()
    return () => {
      disposed = true
      cleanups.forEach(fn=>fn())
      ctx?.revert()
    }
  }, [path])
}
