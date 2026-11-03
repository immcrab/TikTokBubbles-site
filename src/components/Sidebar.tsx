import { useLayoutEffect, useRef, useState } from 'react'
import { navItems, site } from '../config/site'
import { BubbleMark, Icon } from './Icon'
import { Link, useRoute } from './router'

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { path } = useRoute()
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [pos, setPos] = useState<{ y: number; h: number } | null>(null)
  const active = navItems.find((n) => n.to === path)?.to ?? null

  useLayoutEffect(() => {
    const el = active ? refs.current[active] : null
    setPos(el ? { y: el.offsetTop, h: el.offsetHeight } : null)
  }, [active])

  const { links } = site
  const community = [
    links.tiktok && { label: 'TikTok', href: links.tiktok },
    links.discord && { label: 'Discord', href: links.discord },
    links.support && { label: 'Support', href: links.support },
    links.source && { label: 'Site source', href: links.source },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        id="site-nav"
        aria-label="Site"
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-line bg-side px-4 py-5 transition-[transform,visibility] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] lg:w-[230px] lg:visible lg:translate-x-0 ${
          open ? 'visible translate-x-0' : 'invisible -translate-x-full'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 px-2 py-1 no-underline" onClick={onClose}>
          <BubbleMark />
          <span className="serif text-[22px] leading-none text-cream">{site.name}</span>
          {site.version && (
            <span className="ml-auto rounded-full border border-line px-2 py-0.5 text-[10.5px] text-muted">
              v{site.version}
            </span>
          )}
        </Link>

        <nav aria-label="Pages" className="relative mt-8 flex flex-col gap-0.5">
          {pos && (
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 rounded-lg bg-raised transition-[transform,height] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{ transform: `translateY(${pos.y}px)`, height: pos.h }}
            />
          )}
          {navItems.map((n) => (
            <Link
              key={n.to}
              ref={(el: HTMLAnchorElement | null) => {
                refs.current[n.to] = el
              }}
              to={n.to}
              className="nav-link"
              aria-current={active === n.to ? 'page' : undefined}
              onClick={onClose}
            >
              <Icon name={n.icon} size={16} />
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          {links.download ? (
            <a href={links.download} download className="btn btn-primary justify-center" onClick={onClose}>
              <Icon name="install" size={16} />
              Download
            </a>
          ) : (
            <Link to="/install#download" className="btn btn-primary justify-center" onClick={onClose}>
              <Icon name="install" size={16} />
              Get the mod
            </Link>
          )}
          {community.length > 0 && (
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 px-1">
              {community.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12.5px] text-muted no-underline transition-colors duration-200 hover:text-cream"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="m-0 border-t border-line px-1 pt-3 text-[11.5px] leading-snug text-muted">
            Hosted by {site.host.name}. Mod by {site.author.name}. Independent project.
          </p>
        </div>
      </aside>
    </>
  )
}
