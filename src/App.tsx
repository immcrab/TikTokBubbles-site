import { useEffect, useState } from 'react'
import { navItems, site } from './config/site'
import { Link, RouterProvider, useRoute } from './components/router'
import { FaqPage, FeaturesPage, Footer, Home, InstallPage, PreviewPage, wrap } from './components/Sections'

const titles: Record<string, string> = {
  '/': 'TikTokBubbles - your TikTok chat, floating in VR',
  '/features': 'Features - TikTokBubbles',
  '/preview': 'Preview - TikTokBubbles',
  '/install': 'Install - TikTokBubbles',
  '/faq': 'FAQ - TikTokBubbles',
}

function useStars() {
  const [stars, setStars] = useState<number | null>(null)
  useEffect(() => {
    const ctl = new AbortController()
    fetch(`https://api.github.com/repos/${site.links.repoSlug}`, { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => typeof j?.stargazers_count === 'number' && setStars(j.stargazers_count))
      .catch(() => {})
    return () => ctl.abort()
  }, [])
  return stars
}

function Shell() {
  const { path } = useRoute()
  const stars = useStars()

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
      <header className="border-b border-line/70 bg-bg/60 backdrop-blur">
        <div className={`${wrap} flex flex-wrap items-center gap-x-8 gap-y-3 py-4`}>
          <Link to="/" className="flex items-center gap-2.5 text-[16px] font-semibold text-text no-underline">
            <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-lg border border-line bg-surface">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            {site.name}
          </Link>
          <nav aria-label="Pages" className="order-3 flex w-full gap-6 sm:order-none sm:ml-auto sm:w-auto">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} className="nav-link" aria-current={path === n.to ? 'page' : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <a
            href={site.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={stars === null ? 'Star on GitHub' : `Star on GitHub, ${stars} stars`}
            className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[14px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#6a9bf7] active:scale-95 sm:ml-0"
          >
            <span aria-hidden="true">★</span>
            {stars === null ? 'Star' : stars}
          </a>
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

