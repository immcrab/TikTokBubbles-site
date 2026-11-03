import { useEffect, useState } from 'react'
import { navItems, site } from './config/site'
import { BubbleMark, Icon } from './components/Icon'
import { Sidebar } from './components/Sidebar'
import { Faq, Features, Footer, Hero, Installation, Preview } from './components/Sections'

const ids = navItems.map((n) => n.id)

function useActiveSection() {
  const [active, setActive] = useState<string>(ids[0])
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.35
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) cur = id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = ids[ids.length - 1]
      setActive(cur)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return active
}

export default function App() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-md bg-cream px-3 py-2 text-sm text-bg focus:translate-y-0"
      >
        Skip to content
      </a>
      <Sidebar active={active} open={open} onClose={() => setOpen(false)} />

      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-side/95 px-4 backdrop-blur lg:hidden">
        <a href="#overview" className="flex items-center gap-2 no-underline">
          <BubbleMark size={24} />
          <span className="serif text-xl text-cream">{site.name}</span>
        </a>
        <button
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-line bg-transparent text-cream transition-colors duration-200 hover:bg-raised active:scale-95"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </header>

      <main id="main" className="lg:pl-[230px]">
        <Hero />
        <Features />
        <Preview />
        <Installation />
        <Faq />
        <Footer />
      </main>
    </>
  )
}
