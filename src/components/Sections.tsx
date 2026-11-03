import { useState, type ReactNode } from 'react'
import { site } from '../config/site'
import { Icon } from './Icon'
import { Link } from './router'
import { CopyButton, ExternalLink } from './ui'

const rule = 'border-t border-line'
const wrap = 'mx-auto w-full max-w-[720px] px-6'

function PageHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="pb-10 pt-14 sm:pt-20">
      <p className="eyebrow m-0">{eyebrow}</p>
      <h1 className="m-0 mt-3 text-[clamp(1.9rem,5vw,2.6rem)] font-semibold leading-tight">{title}</h1>
      {children && <p className="m-0 mt-3 max-w-[34rem] text-muted">{children}</p>}
    </header>
  )
}

/* ---------------- Home ---------------- */

const pages = [
  { to: '/features', title: 'Features', text: 'What the mod does.' },
  { to: '/preview', title: 'Preview', text: 'See it in the game.' },
  { to: '/install', title: 'Install', text: 'Five steps to get going.' },
  { to: '/faq', title: 'FAQ', text: 'Keys, lobbies, filters.' },
]

export function Home() {
  const { links } = site
  return (
    <section className={wrap}>
      <div className="pb-14 pt-20 sm:pt-28">
        <p className="eyebrow m-0">
          {site.status}
          {site.version && ` · v${site.version}`}
        </p>
        <h1 className="m-0 mt-4 text-[clamp(2.6rem,8vw,4.25rem)] font-semibold leading-[1.05]">
          TikTok<span className="text-accent">Bubbles</span>
        </h1>
        <p className="m-0 mt-4 text-[clamp(1.15rem,2.6vw,1.4rem)] text-text">{site.tagline}</p>
        <p className="m-0 mt-4 max-w-[34rem] text-muted">{site.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {links.download ? (
            <ExternalLink href={links.download} className="btn btn-primary" download>
              <Icon name="install" size={16} />
              Download
            </ExternalLink>
          ) : (
            <Link to="/install" className="btn btn-primary">
              Get started
            </Link>
          )}
          <Link to="/features" className="btn">
            Features
          </Link>
          {links.tiktok && (
            <ExternalLink href={links.tiktok}>
              {site.author.handle}
              <Icon name="external" size={14} />
            </ExternalLink>
          )}
        </div>
      </div>

      <ul className="m-0 list-none p-0">
        {pages.map((p) => (
          <li key={p.to} className={rule}>
            <Link to={p.to} className="group flex items-center justify-between gap-4 py-5 no-underline">
              <span>
                <span className="block font-medium text-text transition-colors group-hover:text-accent">{p.title}</span>
                <span className="block text-[14px] text-muted">{p.text}</span>
              </span>
              <Icon name="arrow" size={16} className="shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </li>
        ))}
        <li className={rule} aria-hidden="true" />
      </ul>
    </section>
  )
}

/* ---------------- Features ---------------- */

export function FeaturesPage() {
  return (
    <section className={wrap}>
      <PageHead eyebrow="Features" title="What it does">
        Everything here comes straight from the mod itself.
      </PageHead>
      <ul className="m-0 list-none p-0">
        {site.features.map((f) => (
          <li key={f.title} className={`${rule} py-5 sm:grid sm:grid-cols-[13rem_1fr] sm:gap-8`}>
            <h2 className="m-0 text-[15px] font-medium">{f.title}</h2>
            <p className="m-0 mt-1 text-[14px] text-muted sm:mt-0">{f.description}</p>
          </li>
        ))}
        <li className={rule} aria-hidden="true" />
      </ul>
    </section>
  )
}

/* ---------------- Preview ---------------- */

export function PreviewPage() {
  const m = site.media
  const hasMedia = m.kind !== 'none' && m.src
  return (
    <section className={wrap}>
      <PageHead eyebrow="Preview" title="See it in the game" />
      <figure className="m-0">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-surface">
          {hasMedia && m.kind === 'video' && (
            <video className="h-full w-full object-cover" src={m.src!} poster={m.poster ?? undefined} controls playsInline preload="metadata" />
          )}
          {hasMedia && m.kind === 'image' && <img className="h-full w-full object-cover" src={m.src!} alt={m.alt} loading="lazy" />}
          {!hasMedia && (
            <div className="grid h-full place-items-center px-6 text-center">
              <div>
                <p className="m-0 text-[20px] font-medium sm:text-[24px]">Gameplay preview coming soon</p>
                <p className="m-0 mt-2 text-[14px] text-muted">No footage has been added yet.</p>
              </div>
            </div>
          )}
        </div>
        {hasMedia && <figcaption className="mt-3 text-[13px] text-muted">{m.caption}</figcaption>}
      </figure>
    </section>
  )
}

/* ---------------- Install ---------------- */

export function InstallPage() {
  return (
    <section className={wrap}>
      <PageHead eyebrow="Install" title="Five steps">
        You need BepInEx for Gorilla Tag and a license key.
      </PageHead>
      <ol className="m-0 list-none p-0">
        {site.steps.map((s, i) => (
          <li key={s.title} className={`${rule} grid grid-cols-[2rem_1fr] gap-x-2 py-5`}>
            <span className="pt-px text-[14px] font-medium tabular-nums text-accent">{i + 1}</span>
            <div className="min-w-0">
              <h2 className="m-0 text-[15px] font-medium">{s.title}</h2>
              <p className="m-0 mt-1 text-[14px] text-muted">{s.body}</p>
              {s.code && (
                <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-line bg-surface py-1.5 pl-4 pr-1.5">
                  <code className="min-w-0 overflow-x-auto whitespace-nowrap font-mono text-[12.5px]" tabIndex={0} aria-label={s.codeLabel}>
                    {s.code}
                  </code>
                  <CopyButton text={s.code} label={s.codeLabel ?? 'text'} />
                </div>
              )}
            </div>
          </li>
        ))}
        <li className={rule} aria-hidden="true" />
      </ol>
      <Download />
    </section>
  )
}

function Download() {
  const { release, links } = site
  const rows: [string, string][] = [['File', release.fileName]]
  if (site.version) rows.push(['Version', site.version])
  rows.push(['Status', site.status])
  if (release.date) rows.push(['Released', release.date])
  if (release.size) rows.push(['Size', release.size])
  return (
    <div id="download" className="mt-10 rounded-xl border border-line bg-surface p-6 sm:p-8">
      <p className="eyebrow m-0">Download</p>
      <dl className="m-0 mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[12px] text-muted">{k}</dt>
            <dd className="m-0 mt-0.5 break-words text-[14px]">{v}</dd>
          </div>
        ))}
      </dl>
      <ul className="m-0 mt-5 list-none space-y-1 p-0 text-[14px] text-muted">
        {release.requirements.map((r) => (
          <li key={r} className="flex items-center gap-2">
            <Icon name="check" size={14} className="text-accent" />
            {r}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {links.download ? (
          <ExternalLink href={links.download} className="btn btn-primary" download>
            <Icon name="install" size={16} />
            Download {release.fileName}
          </ExternalLink>
        ) : (
          <>
            <span className="text-[14px] text-muted">The public download link is not out yet.</span>
            {links.tiktok && (
              <ExternalLink href={links.tiktok} className="btn btn-primary">
                Ask {site.author.handle} on TikTok
                <Icon name="external" size={14} />
              </ExternalLink>
            )}
          </>
        )}
      </div>
      <p className="m-0 mt-5 border-t border-line pt-4 text-[13px] text-muted">
        Early access needs a license key, entered once with TAB in game and tied to your PC. Keys come from the author.
      </p>
    </div>
  )
}

/* ---------------- FAQ ---------------- */

export function FaqPage() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className={wrap}>
      <PageHead eyebrow="FAQ" title="Questions" />
      <div className="border-b border-line">
        {site.faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className={rule}>
              <h2 className="m-0">
                <button
                  type="button"
                  id={`faq-b-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-p-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-4 text-left text-[15px] font-medium text-text transition-colors duration-200 hover:text-accent"
                >
                  {f.q}
                  <span className="text-muted"><Icon name={isOpen ? 'minus' : 'plus'} size={16} /></span>
                </button>
              </h2>
              <div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} className="faq-panel" data-open={isOpen}>
                <div>
                  <p className="m-0 max-w-[40rem] pb-4 text-[14px] text-muted">{f.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ---------------- Footer ---------------- */

export function Footer() {
  const { links } = site
  const items = [
    links.tiktok && ['TikTok', links.tiktok],
    links.discord && ['Discord', links.discord],
    links.support && ['Support', links.support],
    links.source && ['Site source', links.source],
  ].filter(Boolean) as [string, string][]
  return (
    <footer className={`${wrap} pb-12 pt-20`}>
      <div className={`${rule} flex flex-col gap-3 pt-6 text-[13px] text-muted sm:flex-row sm:items-start sm:justify-between`}>
        <div>
          <p className="m-0 text-text">
            Hosted by {site.host.link ? <a href={site.host.link} className="underline underline-offset-4">{site.host.name}</a> : site.host.name}
            <span className="text-muted"> · Mod by {site.author.name}</span>
          </p>
          <p className="m-0 mt-1 max-w-sm">{site.name} is an independent project, not affiliated with Gorilla Tag or TikTok.</p>
        </div>
        {items.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-1 p-0">
            {items.map(([l, h]) => (
              <li key={l}>
                <a href={h} target="_blank" rel="noopener noreferrer" className="text-muted underline-offset-4 transition-colors hover:text-text hover:underline">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  )
}
