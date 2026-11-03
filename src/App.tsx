import { useEffect, useState } from 'react'
import { site } from './config/site'
import { BubbleMark, Icon } from './components/Icon'
import { Sidebar } from './components/Sidebar'
import { Link, RouterProvider, useRoute } from './components/router'
import { FaqPage, FeaturesPage, Footer, Home, InstallPage, PreviewPage } from './components/Sections'

const titles: Record<string, string> = {
  '/': 'TikTokBubbles — pop your stream into Gorilla Tag',
  '/features': 'Features — TikTokBubbles',
  '/preview': 'Preview — TikTokBubbles',
  '/install': 'Install — TikTokBubbles',
  '/faq': 'FAQ — TikTokBubbles',
}

function Shell() {
  const { path } = useRoute()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.title = titles[path] ?? titles['/']
  }, [path])

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

  const Page =
    { '/features': FeaturesPage, '/preview': PreviewPage, '/install': InstallPage, '/faq': FaqPage }[path] ?? Home

  return (
    <>
      <a
        href="#main"
        className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-md bg-cream px-3 py-2 text-sm text-bg focus:translate-y-0"
      >
        Skip to content
      </a>
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-side/95 px-4 backdrop-blur lg:hidden">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <BubbleMark size={24} />
          <span className="serif text-xl text-cream">{site.name}</span>
        </Link>
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

      <main id="main" className="min-h-[calc(100vh-4rem)] lg:pl-[230px]">
        <div key={path} className="page-in">
          <Page />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  )
}
