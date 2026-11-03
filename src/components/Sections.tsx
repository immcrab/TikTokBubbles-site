import { useState, type CSSProperties } from 'react'
import { site } from '../config/site'
import { BubbleMark, Icon } from './Icon'
import { CopyButton, ExternalLink, Reveal } from './ui'

const hairline = 'border-t border-line'

function Head({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <Reveal>
      <p className="eyebrow m-0">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {children && <p className="lead m-0">{children}</p>}
    </Reveal>
  )
}

const bubbles: { s: number; x: string; y: string; dur: string; delay: string; dx: string; dy: string }[] = [
  { s: 120, x: '8%', y: '12%', dur: '18s', delay: '0s', dx: '14px', dy: '-24px' },
  { s: 54, x: '82%', y: '18%', dur: '14s', delay: '-4s', dx: '-10px', dy: '-22px' },
  { s: 84, x: '90%', y: '56%', dur: '20s', delay: '-9s', dx: '-12px', dy: '-28px' },
  { s: 36, x: '16%', y: '64%', dur: '13s', delay: '-6s', dx: '10px', dy: '-18px' },
  { s: 160, x: '70%', y: '2%', dur: '19s', delay: '-11s', dx: '8px', dy: '-26px' },
]

export function Hero() {
  const { links } = site
  const facts = [
    ['Type', 'BepInEx plugin'],
    ['Status', site.status],
    ['Access', 'License key'],
    ['By', `${site.author.name}`],
  ]
  return (
    <section id="overview" className="relative isolate overflow-hidden px-6 pb-24 pt-24 text-center sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {bubbles.map((b, i) => (
          <span
            key={i}
            className="bubble-outline"
            style={
              {
                width: b.s,
                height: b.s,
                left: b.x,
                top: b.y,
                '--dur': b.dur,
                '--delay': b.delay,
                '--dx': b.dx,
                '--dy': b.dy,
              } as CSSProperties
            }
          />
        ))}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      <div className="mx-auto max-w-[760px]">
        <div className="enter mx-auto grid h-14 w-14 place-items-center rounded-full border border-line bg-raised/60" style={{ '--i': 0 } as CSSProperties}>
          <BubbleMark size={30} />
        </div>
        <h1 className="serif enter mb-0 mt-8 text-[clamp(3rem,8vw,5.25rem)] leading-[1.02]" style={{ '--i': 1 } as CSSProperties}>
          TikTok<em className="text-accent">Bubbles</em>
        </h1>
        <p className="enter mx-auto mb-0 mt-6 max-w-[34rem] text-[16px] text-muted" style={{ '--i': 2 } as CSSProperties}>
          {site.description}
        </p>
        <div className="enter mt-9 flex flex-wrap items-center justify-center gap-3" style={{ '--i': 3 } as CSSProperties}>
          {links.download ? (
            <ExternalLink href={links.download} className="btn btn-primary" download>
              <Icon name="install" size={16} />
              Download
            </ExternalLink>
          ) : (
            <a href="#installation" className="btn btn-primary">
              Get started
            </a>
          )}
          <a href="#features" className="btn">
            See features
          </a>
          {links.tiktok && (
            <ExternalLink href={links.tiktok}>
              {site.author.handle}
              <Icon name="external" size={14} />
            </ExternalLink>
          )}
        </div>

        <dl
          className="enter m-0 mt-16 grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-side/60 text-left sm:grid-cols-4"
          style={{ '--i': 4 } as CSSProperties}
        >
          {facts.map(([k, v], i) => (
            <div key={k} className={`px-5 py-4 ${i > 0 ? 'sm:border-l' : ''} ${i % 2 === 1 ? 'border-l sm:border-l' : ''} ${i > 1 ? 'border-t sm:border-t-0' : ''} border-line`}>
              <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">{k}</dt>
              <dd className="m-0 mt-1 text-[14px] text-cream">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-[860px] px-6 py-20">
      <Head eyebrow="Features" title={<>Built to stay <em className="text-accent">out of the way</em></>}>
        Everything below comes straight from the mod itself.
      </Head>
      <ul className={`m-0 mt-12 grid list-none gap-x-14 p-0 md:grid-cols-2`}>
        {site.features.map((f) => (
          <Reveal as="li" key={f.title} className={`${hairline} flex gap-4 py-6`}>
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-accent">
              <Icon name={f.icon} size={18} />
            </span>
            <div>
              <h3 className="m-0 text-[15px] font-medium text-cream">{f.title}</h3>
              <p className="m-0 mt-1.5 text-[14px] text-muted">{f.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export function Preview() {
  const m = site.media
  const hasMedia = m.kind !== 'none' && m.src
  return (
    <section id="preview" className="mx-auto max-w-[860px] px-6 py-20">
      <Head eyebrow="Preview" title={<>See it <em className="text-accent">in the game</em></>} />
      <Reveal className="mt-10">
        <figure className="m-0">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-side">
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
                  ].map((b, i) => (
                    <span
                      key={i}
                      className="bubble-outline"
                      style={{ width: b.s, height: b.s, left: b.x, top: b.y, '--dur': b.dur, '--delay': b.delay, borderColor: 'rgb(194 173 136 / 0.22)' } as CSSProperties}
                    />
                  ))}
                </div>
                <div className="relative">
                  <p className="serif m-0 text-[24px] text-cream sm:text-[30px]">Gameplay preview coming soon</p>
                  <p className="m-0 mt-2 text-[13.5px] text-muted">Real footage will appear here once it is added.</p>
                </div>
                <span className="absolute bottom-3 right-3 rounded-full border border-line bg-bg/70 px-2.5 py-1 text-[11px] text-muted">
                  Visual demo — not gameplay
                </span>
              </div>
            )}
          </div>
          <figcaption className="mt-3 text-[13px] text-muted">{hasMedia ? m.caption : 'Placeholder panel. Add footage in src/config/site.ts.'}</figcaption>
        </figure>
      </Reveal>
    </section>
  )
}

export function Installation() {
  return (
    <section id="installation" className="mx-auto max-w-[760px] px-6 py-20">
      <Head eyebrow="Installation" title={<>Up and running in <em className="text-accent">five steps</em></>}>
        You need BepInEx for Gorilla Tag and a license key.
      </Head>
      <ol className="m-0 mt-12 list-none p-0">
        {site.steps.map((s, i) => (
          <Reveal as="li" key={s.title} className={`${hairline} grid grid-cols-[2.5rem_1fr] gap-x-2 py-6`}>
            <span className="serif pt-0.5 text-[28px] leading-none text-accent/80">{String(i + 1).padStart(2, '0')}</span>
            <div className="min-w-0">
              <h3 className="m-0 text-[15px] font-medium text-cream">{s.title}</h3>
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
              <span className="text-[13.5px] text-muted">The public download link has not been published yet.</span>
              {links.tiktok && (
                <ExternalLink href={links.tiktok}>
                  Ask {site.author.handle} on TikTok
                  <Icon name="external" size={14} />
                </ExternalLink>
              )}
            </>
          )}
        </div>
        <p className="m-0 mt-6 border-t border-line pt-5 text-[13px] text-muted">
          Early access requires a license key, entered once with TAB in game and tied to your PC. Keys are issued by the author.
        </p>
      </div>
    </Reveal>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="mx-auto max-w-[760px] px-6 py-20">
      <Head eyebrow="FAQ" title={<>Good to <em className="text-accent">know</em></>} />
      <Reveal className="mt-10">
        <div className="border-b border-line">
          {site.faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={hairline}>
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`faq-b-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-p-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-5 text-left text-[15px] font-medium text-cream transition-colors duration-200 hover:text-white"
                  >
                    {f.q}
                    <span className="text-muted"><Icon name={isOpen ? 'minus' : 'plus'} size={16} /></span>
                  </button>
                </h3>
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

export function Footer() {
  const { links } = site
  const items = [
    links.tiktok && ['TikTok', links.tiktok],
    links.discord && ['Discord', links.discord],
    links.support && ['Support', links.support],
    links.source && ['Source', links.source],
  ].filter(Boolean) as [string, string][]
  return (
    <footer className="mx-auto max-w-[760px] px-6 pb-14 pt-6">
      <div className={`${hairline} flex flex-col gap-3 pt-6 text-[12.5px] text-muted sm:flex-row sm:items-center sm:justify-between`}>
        <p className="m-0 max-w-md">
          {site.name} is an independent project and is not affiliated with Gorilla Tag or TikTok.
        </p>
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
