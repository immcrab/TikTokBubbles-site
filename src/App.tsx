import { useEffect } from 'react'
import { navItems, site } from './config/site'
import { Link, RouterProvider, useRoute } from './components/router'
import { FaqPage, FeaturesPage, Footer, Home, InstallPage, PreviewPage } from './components/Sections'

const titles: Record<string, string> = {
  '/': 'TikTokBubbles - pop your stream into Gorilla Tag',
  '/features': 'Features - TikTokBubbles',
  '/preview': 'Preview - TikTokBubbles',
  '/install': 'Install - TikTokBubbles',
  '/faq': 'FAQ - TikTokBubbles',
}

function Shell() {
  const { path } = useRoute()

  useEffect(() => {
    document.title = titles[path] ?? titles['/']
  }, [path])

  const Page =
    { '/features': FeaturesPage, '/preview': PreviewPage, '/install': InstallPage, '/faq': FaqPage }[path] ?? Home

  return (
    <>
      <a
        href="#main"
        className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-md bg-text px-3 py-2 text-sm text-bg focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[720px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2 font-semibold text-text no-underline">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent" />
            {site.name}
          </Link>
          <nav aria-label="Pages" className="flex gap-5">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} className="nav-link" aria-current={path === n.to ? 'page' : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" className="min-h-[calc(100vh-12rem)]">
        <div key={path} className="page-in">
          <Page />
        </div>
      </main>
      <Footer />
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
