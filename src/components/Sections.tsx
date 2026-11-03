import { useState, type ReactNode } from 'react'
import { site } from '../config/site'
import { Icon } from './Icon'
import { Link } from './router'
import { CopyButton, ExternalLink } from './ui'

const rule = 'border-t border-line'
export const wrap = 'mx-auto w-full max-w-[1040px] px-6'

function PageHead({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return (
    <header className="pb-10 pt-16 sm:pt-24">
      <p className="eyebrow m-0">{label}</p>
      <h1 className="m-0 mt-5 text-[clamp(2.2rem,6vw,3.5rem)] leading-[1.05]">{title}</h1>
      {children && <p className="m-0 mt-4 max-w-[36rem] text-[17px] text-muted">{children}</p>}
    </header>
  )
}

function DownloadLink({ className = 'btn btn-primary', children }: { className?: string; children: ReactNode }) {
  const d = site.lite.download
  return d ? (
    <ExternalLink href={d} className={className} download>
      {children}
    </ExternalLink>
  ) : (
    <Link to="/install" className={className}>
      {children}
    </Link>
  )
}

/* ---------------- Home ---------------- */

function Terminal() {
  const path = 'Gorilla Tag\\BepInEx\\plugins\\TikTokBubblesLite.dll'
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-2 font-mono text-[12px] text-muted">gorilla tag / install</span>
        <span className="mono-label ml-auto !text-[11px]">Steps</span>
      </div>
      <pre className="m-0 overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-[1.85] text-text" tabIndex={0} aria-label="Install steps">
        <span className="text-muted"># 1. install BepInEx with MonkeModManager{'\n'}</span>
        <span className="text-muted"># 2. drop the mod in plugins{'\n'}</span>
        {path}
        {'\n\n'}
        <span className="text-muted"># 3. start the game and press Tab{'\n'}</span>
        <span className="text-muted"># 4. type your username, then Connect</span>
      </pre>
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5">
        <span className="font-mono text-[11.5px] text-muted">Private and modded lobbies only</span>
        <CopyButton text={path} label="plugin path" />
      </div>
    </div>
  )
}

const stats = [
  ['2', 'Editions'],
  ['5', 'Install steps'],
  ['0', 'Keys for Lite'],
  [site.lite.size ?? '', 'Lite download'],
].filter(([n]) => n)

export function Home() {
  return (
    <>
      <section className={`${wrap} grid items-center gap-14 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1fr_440px] lg:gap-16`}>
        <div>
          <p className="eyebrow m-0">Free Gorilla Tag mod</p>
          <h1 className="m-0 mt-6 text-[clamp(2.8rem,7vw,4.6rem)] leading-[1.02]">
            Your TikTok chat, <span className="text-accent">floating in front of you.</span>
          </h1>
          <p className="m-0 mt-6 max-w-[34rem] text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">{site.description}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <DownloadLink>
              Download Lite
              <Icon name="arrow" size={16} />
            </DownloadLink>
            <Link to="/features" className="tlink">
              See features
              <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
        <Terminal />
      </section>

      <section className={`${wrap} pb-16`}>
        <dl className={`${rule} m-0 grid grid-cols-2 gap-y-8 pt-10 sm:grid-cols-4`}>
          {stats.map(([n, l]) => (
            <div key={l}>
              <dd className="m-0 text-[clamp(2rem,4vw,2.75rem)] font-normal leading-none tracking-tight">{n}</dd>
              <dt className="mono-label mt-3">{l}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${wrap} pb-8`}>
        <p className="mono-label m-0">Editions</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface/80 p-7">
            <div className="flex items-baseline justify-between">
              <h2 className="m-0 text-[24px]">Lite</h2>
              <span className="mono-label !text-accent">{site.lite.price}</span>
            </div>
            <p className="m-0 mt-3 text-muted">Your TikTok chat as bubbles you can touch and pop. Public download, no key.</p>
            <div className="mt-6">
              <DownloadLink className="tlink">
                Download {site.lite.fileName}
                <Icon name="arrow" size={15} />
              </DownloadLink>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-surface/80 p-7">
            <div className="flex items-baseline justify-between">
              <h2 className="m-0 text-[24px]">Full</h2>
              <span className="mono-label !text-accent">{site.full.price}</span>
            </div>
            <p className="m-0 mt-3 text-muted">Gifts, follow alerts, YouTube chat, filters and every setting. Early access with a license key.</p>
            <div className="mt-6">
              <ExternalLink href={site.links.tiktok} className="tlink">
                DM {site.author.handle} on TikTok
                <Icon name="external" size={14} />
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ---------------- Features ---------------- */

function FeatureList({ label, items }: { label: string; items: { title: string; description: string }[] }) {
  return (
    <div className="mt-12">
      <p className="mono-label m-0 pb-4">{label}</p>
      <ul className="m-0 list-none p-0">
        {items.map((f) => (
          <li key={f.title} className={`${rule} py-5 sm:grid sm:grid-cols-[16rem_1fr] sm:gap-10`}>
            <h2 className="m-0 text-[17px]">{f.title}</h2>
            <p className="m-0 mt-1 text-[15px] text-muted sm:mt-0">{f.description}</p>
          </li>
        ))}
        <li className={rule} aria-hidden="true" />
      </ul>
    </div>
  )
}

export function FeaturesPage() {
  return (
    <section className={wrap}>
      <PageHead label="Features" title="What it does">
        Lite is free. Full adds more on top.
      </PageHead>
      <FeatureList label="Lite · free" items={site.liteFeatures} />
      <FeatureList label="Full · by DM" items={site.fullFeatures} />
    </section>
  )
}

/* ---------------- Preview ---------------- */

export function PreviewPage() {
  const m = site.media
  const hasMedia = m.kind !== 'none' && m.src
  return (
    <section className={wrap}>
      <PageHead label="Preview" title="See it in the game" />
      <figure className="m-0 max-w-[860px]">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-surface">
          {hasMedia && m.kind === 'video' && (
            <video className="h-full w-full object-cover" src={m.src!} poster={m.poster ?? undefined} controls playsInline preload="metadata" />
          )}
          {hasMedia && m.kind === 'image' && <img className="h-full w-full object-cover" src={m.src!} alt={m.alt} loading="lazy" />}
          {!hasMedia && (
            <div className="grid h-full place-items-center px-6 text-center">
              <div>
                <p className="m-0 text-[22px] font-medium sm:text-[28px]">Gameplay preview coming soon</p>
                <p className="m-0 mt-2 text-[15px] text-muted">No footage has been added yet.</p>
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
      <PageHead label="Install" title="Up and running in five steps">
        These steps are for the free Lite edition.
      </PageHead>
      <div className="max-w-[760px]">
        <ol className="m-0 list-none p-0">
          {site.steps.map((s, i) => (
            <li key={s.title} className={`${rule} grid grid-cols-[2.5rem_1fr] gap-x-2 py-6`}>
              <span className="pt-0.5 font-mono text-[14px] tabular-nums text-accent">{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <h2 className="m-0 text-[18px]">{s.title}</h2>
                <p className="m-0 mt-1 text-[15px] text-muted">{s.body}</p>
                {s.code && (
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line bg-surface py-1.5 pl-4 pr-1.5">
                    <code className="min-w-0 overflow-x-auto whitespace-nowrap font-mono text-[13px]" tabIndex={0} aria-label={s.codeLabel}>
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
      </div>
    </section>
  )
}

function Download() {
  const { lite, full, links, author } = site
  const rows: [string, string][] = [
    ['File', lite.fileName],
    ['Edition', `${lite.name} (${lite.price.toLowerCase()})`],
  ]
  if (lite.date) rows.push(['Released', lite.date])
  if (lite.size) rows.push(['Size', lite.size])
  return (
    <div id="download" className="mt-12 rounded-2xl border border-line bg-surface/90 p-7 sm:p-9">
      <p className="mono-label m-0">Download</p>
      <dl className="m-0 mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="mono-label !text-[11px]">{k}</dt>
            <dd className="m-0 mt-1 break-words text-[15px]">{v}</dd>
          </div>
        ))}
      </dl>
      <ul className="m-0 mt-6 list-none space-y-1.5 p-0 text-[15px] text-muted">
        {lite.requirements.map((r) => (
          <li key={r} className="flex items-center gap-2">
            <Icon name="check" size={14} className="text-accent" />
            {r}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <DownloadLink>
          <Icon name="install" size={16} />
          Download {lite.fileName}
        </DownloadLink>
        <ExternalLink href={links.tiktok} className="tlink">
          Want Full{full.version ? ` (v${full.version})` : ''}? DM {author.handle}
          <Icon name="external" size={14} />
        </ExternalLink>
      </div>
    </div>
  )
}

/* ---------------- FAQ ---------------- */

export function FaqPage() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className={wrap}>
      <PageHead label="FAQ" title="Questions" />
      <div className="max-w-[760px] border-b border-line">
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
                  className="flex w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-5 text-left text-[17px] font-medium tracking-tight text-text transition-colors duration-200 hover:text-accent"
                >
                  {f.q}
                  <span className="text-muted"><Icon name={isOpen ? 'minus' : 'plus'} size={16} /></span>
                </button>
              </h2>
              <div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} className="faq-panel" data-open={isOpen}>
                <div>
                  <p className="m-0 max-w-[40rem] pb-5 text-[15px] text-muted">{f.a}</p>
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
    links.repo && ['GitHub', links.repo],
    ['TikTok', links.tiktok],
    links.discord && ['Discord', links.discord],
    links.support && ['Support', links.support],
  ].filter(Boolean) as [string, string][]
  return (
    <footer className={`${wrap} pb-12 pt-24`}>
      <div className={`${rule} flex flex-col gap-4 pt-6 text-[13.5px] text-muted sm:flex-row sm:items-start sm:justify-between`}>
        <div>
          <p className="m-0 text-text">
            Hosted by {site.host.link ? <a href={site.host.link} className="underline underline-offset-4">{site.host.name}</a> : site.host.name}
            <span className="text-muted"> · Mod by {site.author.name}</span>
          </p>
          <p className="m-0 mt-1 max-w-sm">{site.name} is an independent project, not affiliated with Gorilla Tag or TikTok.</p>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-1 p-0">
          {items.map(([l, h]) => (
            <li key={l}>
              <a href={h} target="_blank" rel="noopener noreferrer" className="text-muted underline-offset-4 transition-colors hover:text-text hover:underline">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
