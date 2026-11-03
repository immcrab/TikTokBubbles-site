import { useState, type CSSProperties, type ReactNode } from 'react'
import { site } from '../config/site'
import { BubbleMark, Icon } from './Icon'
import { Link } from './router'
import { CopyButton, ExternalLink, Reveal } from './ui'

const hairline = 'border-t border-line'
const vars = (o: Record<string, string | number>) => o as CSSProperties

function PageHead({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="enter">
      <p className="eyebrow m-0">{eyebrow}</p>
      <h1 className="section-title !mb-3 !text-[clamp(2.4rem,6vw,3.5rem)]">{title}</h1>
      {children && <p className="lead m-0">{children}</p>}
    </header>
  )
}

const page = 'mx-auto max-w-[860px] px-6 pb-16 pt-16 sm:pt-24'

/* ---------------- Home ---------------- */

const bubbles = [
  { s: 130, x: '6%', y: '10%', dur: '17s', delay: '0s', dx: '14px', dy: '-26px' },
  { s: 56, x: '84%', y: '16%', dur: '13s', delay: '-4s', dx: '-10px', dy: '-22px' },
  { s: 92, x: '90%', y: '58%', dur: '19s', delay: '-9s', dx: '-12px', dy: '-28px' },
  { s: 40, x: '14%', y: '66%', dur: '12s', delay: '-6s', dx: '10px', dy: '-18px' },
  { s: 170, x: '68%', y: '0%', dur: '20s', delay: '-11s', dx: '8px', dy: '-26px' },
  { s: 28, x: '30%', y: '8%', dur: '14s', delay: '-2s', dx: '-8px', dy: '-20px' },
  { s: 64, x: '46%', y: '84%', dur: '16s', delay: '-7s', dx: '12px', dy: '-24px' },
]

const chips = [
  { t: '+1 follower', x: '4%', y: '30%', delay: '-1s', dur: '11s' },
  { t: 'CONGRATS!', x: '80%', y: '34%', delay: '-5s', dur: '13s' },
  { t: 'Big gift', x: '12%', y: '72%', delay: '-8s', dur: '12s' },
  { t: 'Super Chat', x: '76%', y: '76%', delay: '-3s', dur: '14s' },
]

const highlights = [
  { to: '/features', icon: 'bubble', title: 'What it does', text: 'Bubbles for chat, gifts and followers.' },
  { to: '/preview', icon: 'preview', title: 'See it', text: 'A peek at the bubbles in action.' },
  { to: '/install', icon: 'install', title: 'Get it', text: 'Five steps and you are live.' },
  { to: '/faq', icon: 'faq', title: 'Questions', text: 'Keys, lobbies, filters and more.' },
] as const

export function Home() {
  const { links } = site
  return (
    <>
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-24 text-center sm:pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {bubbles.map((b, i) => (
            <span
              key={i}
              className="bubble-outline"
              style={vars({ width: b.s, height: b.s, left: b.x, top: b.y, '--dur': b.dur, '--delay': b.delay, '--dx': b.dx, '--dy': b.dy })}
            />
          ))}
          {chips.map((c) => (
            <span
              key={c.t}
              className="chip hidden sm:block"
              style={vars({ left: c.x, top: c.y, '--dur': c.dur, '--delay': c.delay, '--dx': '6px', '--dy': '-14px' })}
            >
              {c.t}
            </span>
          ))}
        </div>

        <div className="mx-auto max-w-[760px]">
          <div className="enter mx-auto grid h-16 w-16 place-items-center rounded-full border border-line bg-raised/70" style={vars({ '--i': 0 })}>
            <BubbleMark size={34} />
          </div>
          <h1 className="serif enter mb-0 mt-8 text-[clamp(3rem,8vw,5.25rem)] leading-[1.02]" style={vars({ '--i': 1 })}>
            TikTok<em className="text-accent">Bubbles</em>
          </h1>
          <p className="serif enter m-0 mt-3 text-[clamp(1.4rem,3vw,1.9rem)] italic text-cream/90" style={vars({ '--i': 2 })}>
            {site.tagline}
          </p>
          <p className="enter mx-auto mb-0 mt-5 max-w-[34rem] text-[16px] text-muted" style={vars({ '--i': 3 })}>
            {site.description}
          </p>
          <div className="enter mt-9 flex flex-wrap items-center justify-center gap-3" style={vars({ '--i': 4 })}>
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
              See features
            </Link>
            {links.tiktok && (
              <ExternalLink href={links.tiktok}>
                {site.author.handle}
                <Icon name="external" size={14} />
              </ExternalLink>
            )}
          </div>
          <p className="enter m-0 mt-5 text-[12px] text-muted/80" style={vars({ '--i': 5 })}>
            Floating chips and bubbles are an illustration, not gameplay.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[860px] px-6 pb-12">
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
          {highlights.map((h) => (
            <Reveal as="li" key={h.to}>
              <Link to={h.to} className="tile group">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-raised text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-bg">
                  <Icon name={h.icon} size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-medium text-cream">{h.title}</span>
                  <span className="block text-[13.5px] text-muted">{h.text}</span>
                </span>
                <Icon name="arrow" size={16} className="ml-auto shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-cream" />
              </Link>
            </Reveal>
          ))}
        </ul>
        <dl className="m-0 mt-8 grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-side/60 text-left sm:grid-cols-4">
          {[
            ['Type', 'BepInEx plugin'],
            ['Status', site.status],
            ['Access', 'License key'],
            ['By', site.author.name],
          ].map(([k, v], i) => (
            <div key={k} className={`border-line px-5 py-4 ${i % 2 === 1 ? 'border-l' : ''} ${i > 0 ? 'sm:border-l' : ''} ${i > 1 ? 'border-t sm:border-t-0' : ''}`}>
              <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">{k}</dt>
              <dd className="m-0 mt-1 text-[14px] text-cream">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}

/* ---------------- Features ---------------- */

export function FeaturesPage() {
  return (
    <section className={page}>
      <PageHead eyebrow="Features" title={<>Tiny bubbles, <em className="text-accent">big energy</em></>}>
        Everything here comes straight from the mod itself.
      </PageHead>
      <ul className="m-0 mt-12 grid list-none gap-x-14 p-0 md:grid-cols-2">
        {site.features.map((f) => (
          <Reveal as="li" key={f.title} className={`${hairline} flex gap-4 py-6`}>
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-raised text-accent">
              <Icon name={f.icon} size={18} />
            </span>
            <div>
              <h2 className="m-0 text-[15.5px] font-medium text-cream">{f.title}</h2>
              <p className="m-0 mt-1.5 text-[14px] text-muted">{f.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      <NextLink to="/install" label="Ready to try it? Installation" />
    </section>
  )
}

/* ---------------- Preview ---------------- */

export function PreviewPage() {
  const m = site.media
  const hasMedia = m.kind !== 'none' && m.src
  return (
    <section className={page}>
      <PageHead eyebrow="Preview" title={<>Watch the <em className="text-accent">bubbles</em> float</>} />
      <Reveal className="mt-10">
        <figure className="m-0">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-side">
            {hasMedia && m.kind === 'video' && (
              <video className="h-full w-full object-cover" src={m.src!} poster={m.poster ?? undefined} controls playsInline preload="metadata" />
            )}
            {hasMedia && m.kind === 'image' && <img className="h-full w-full object-cover" src={m.src!} alt={m.alt} loading="lazy" />}
            {!hasMedia && (
              <div className="grid h-full place-items-center px-6 text-center">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  {[
                    { s: 96, x: '12%', y: '58%', dur: '15s', delay: '0s' },
                    { s: 52, x: '78%', y: '22%', dur: '13s', delay: '-5s' },
                    { s: 70, x: '66%', y: '64%', dur: '18s', delay: '-9s' },
                    { s: 34, x: '30%', y: '18%', dur: '12s', delay: '-3s' },
                  ].map((b, i) => (
                    <span key={i} className="bubble-outline" style={vars({ width: b.s, height: b.s, left: b.x, top: b.y, '--dur': b.dur, '--delay': b.delay })} />
                  ))}
                </div>
                <div className="relative">
                  <p className="serif m-0 text-[24px] text-cream sm:text-[32px]">Gameplay preview coming soon</p>
                  <p className="m-0 mt-2 text-[13.5px] text-muted">The real clip is still being cooked. Meanwhile, enjoy these free-range bubbles.</p>
                </div>
                <span className="absolute bottom-3 right-3 rounded-full border border-line bg-bg/70 px-2.5 py-1 text-[11px] text-muted">
                  Visual demo, not gameplay
                </span>
              </div>
            )}
          </div>
          <figcaption className="mt-3 text-[13px] text-muted">
            {hasMedia ? m.caption : 'Placeholder panel. Footage can be added in src/config/site.ts.'}
          </figcaption>
        </figure>
      </Reveal>
      <NextLink to="/install" label="Want it? Installation" />
    </section>
  )
}

/* ---------------- Install ---------------- */

export function InstallPage() {
  return (
    <section className={`${page} max-w-[760px]`}>
      <PageHead eyebrow="Install" title={<>Five steps to <em className="text-accent">bubble time</em></>}>
        You need BepInEx for Gorilla Tag and a license key.
      </PageHead>
      <ol className="m-0 mt-12 list-none p-0">
        {site.steps.map((s, i) => (
          <Reveal as="li" key={s.title} className={`${hairline} grid grid-cols-[2.75rem_1fr] gap-x-2 py-6`}>
            <span className="serif pt-0.5 text-[30px] leading-none text-accent">{i + 1}</span>
            <div className="min-w-0">
              <h2 className="m-0 text-[15.5px] font-medium text-cream">{s.title}</h2>
              <p className="m-0 mt-1.5 text-[14px] text-muted">{s.body}</p>
              {s.code && (
                <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-line bg-side py-1.5 pl-4 pr-1.5">
                  <code className="min-w-0 overflow-x-auto whitespace-nowrap font-mono text-[12.5px] text-cream" tabIndex={0} aria-label={s.codeLabel}>
                    {s.code}
                  </code>
                  <CopyButton text={s.code} label={s.codeLabel ?? 'text'} />
                </div>
              )}
            </div>
          </Reveal>
        ))}
        <li className={hairline} aria-hidden="true" />
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
    <Reveal className="mt-10">
      <div id="download" className="rounded-2xl border border-line bg-raised/70 p-7 sm:p-9">
        <p className="eyebrow m-0">Download</p>
        <h2 className="serif m-0 mt-2 text-[34px] leading-tight">{release.fileName}</h2>
        <dl className="m-0 mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">{k}</dt>
              <dd className="m-0 mt-1 break-words text-[14px]">{v}</dd>
            </div>
          ))}
        </dl>
        <ul className="m-0 mt-6 list-none space-y-1.5 p-0 text-[13.5px] text-muted">
          {release.requirements.map((r) => (
            <li key={r} className="flex items-center gap-2">
              <Icon name="check" size={14} className="text-accent" />
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {links.download ? (
            <ExternalLink href={links.download} className="btn btn-primary" download>
              <Icon name="install" size={16} />
              Download {release.fileName}
            </ExternalLink>
          ) : (
            <>
              <span className="text-[13.5px] text-muted">The public download link is not out yet.</span>
              {links.tiktok && (
                <ExternalLink href={links.tiktok} className="btn btn-primary">
                  Ask {site.author.handle} on TikTok
                  <Icon name="external" size={14} />
                </ExternalLink>
              )}
            </>
          )}
        </div>
        <p className="m-0 mt-6 border-t border-line pt-5 text-[13px] text-muted">
          Early access needs a license key, entered once with TAB in game and tied to your PC. Keys come from the author.
        </p>
      </div>
    </Reveal>
  )
}

/* ---------------- FAQ ---------------- */

export function FaqPage() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className={`${page} max-w-[760px]`}>
      <PageHead eyebrow="FAQ" title={<>Questions? <em className="text-accent">Pop one in.</em></>} />
      <Reveal className="mt-10">
        <div className="border-b border-line">
          {site.faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={hairline}>
                <h2 className="m-0">
                  <button
                    type="button"
                    id={`faq-b-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-p-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-5 text-left text-[15.5px] font-medium text-cream transition-colors duration-200 hover:text-accent"
                  >
                    {f.q}
                    <span className="text-muted"><Icon name={isOpen ? 'minus' : 'plus'} size={16} /></span>
                  </button>
                </h2>
                <div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} className="faq-panel" data-open={isOpen}>
                  <div>
                    <p className="m-0 max-w-[40rem] pb-5 text-[14px] text-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

function NextLink({ to, label }: { to: string; label: string }) {
  return (
    <div className="mt-14">
      <Link to={to} className="btn">
        {label}
        <Icon name="arrow" size={15} />
      </Link>
    </div>
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
    <footer className="mx-auto max-w-[860px] px-6 pb-14 pt-6">
      <div className={`${hairline} flex flex-col gap-3 pt-6 text-[12.5px] text-muted sm:flex-row sm:items-center sm:justify-between`}>
        <div>
          <p className="m-0 text-cream">
            Hosted by {site.host.link ? <a href={site.host.link} className="underline underline-offset-4">{site.host.name}</a> : site.host.name}
            <span className="text-muted"> · Mod by {site.author.name}</span>
          </p>
          <p className="m-0 mt-1 max-w-md">{site.name} is an independent project, not affiliated with Gorilla Tag or TikTok.</p>
        </div>
        {items.length > 0 && (
          <ul className="m-0 flex list-none gap-5 p-0">
            {items.map(([l, h]) => (
              <li key={l}>
                <a href={h} target="_blank" rel="noopener noreferrer" className="text-muted underline-offset-4 transition-colors hover:text-cream hover:underline">
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
