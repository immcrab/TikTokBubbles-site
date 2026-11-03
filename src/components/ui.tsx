import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Icon } from './Icon'

export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'li'
}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    // Never leave content hidden if something goes wrong.
    const t = window.setTimeout(() => el.classList.add('in'), 4000)
    return () => {
      io.disconnect()
      window.clearTimeout(t)
    }
  }, [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T = Tag as any
  return (
    <T ref={ref} className={`reveal ${className}`}>
      {children}
    </T>
  )
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    ta.remove()
    return ok
  }
}

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle')
  const timer = useRef<number>(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line px-2.5 text-xs text-muted transition-colors duration-200 hover:bg-raised hover:text-cream active:scale-95"
      aria-label={`Copy ${label}`}
      onClick={async () => {
        const ok = await copyText(text)
        setState(ok ? 'ok' : 'fail')
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setState('idle'), 1800)
      }}
    >
      <Icon name={state === 'ok' ? 'check' : 'copy'} size={14} />
      <span aria-live="polite">{state === 'ok' ? 'Copied' : state === 'fail' ? 'Press Ctrl+C' : 'Copy'}</span>
    </button>
  )
}

export function ExternalLink({
  href,
  children,
  className = 'btn',
  download,
}: {
  href: string
  children: ReactNode
  className?: string
  download?: boolean
}) {
  return (
    <a
      href={href}
      className={className}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download ? '' : undefined}
    >
      {children}
    </a>
  )
}
