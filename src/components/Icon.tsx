import type { SVGProps } from 'react'

const paths: Record<string, string> = {
  overview: 'M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1z',
  features: 'M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v4H4zM14 15h6v4h-6z',
  preview: 'M5 6.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 5 6.5z',
  install: 'M12 4v11m0 0-4-4m4 4 4-4M5 19h14',
  faq: 'M9.5 9a2.5 2.5 0 1 1 3.6 2.25c-.7.35-1.1.9-1.1 1.75M12 17h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
  bubble: 'M12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.5 11a3.5 3.5 0 0 1 3-3',
  gift: 'M4 9h16v4H4zM6 13v7h12v-7M12 9v11M12 9c-1-3-5-3.5-5-1.5S10 9 12 9zm0 0c1-3 5-3.5 5-1.5S14 9 12 9z',
  follower: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M18 8v6M15 11h6',
  wrist: 'M8 3h8l1 4H7zM8 21h8l1-4H7zM7 7h10v10H7zM12 10v2.5l1.5 1',
  filter: 'M4 5h16l-6 7.5V19l-4 1.5v-8z',
  sliders: 'M5 7h9m4 0h1M5 17h1m4 0h9M14 5v4m-4 6v4',
  pause: 'M8 5v14M16 5v14',
  key: 'M14.5 9.5a4 4 0 1 1-1 2.6L5 20.5V18h-2v-2h2v-2h2.5l5-5',
  copy: 'M9 9h10v11H9zM5 15V4h10',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'm6 6 12 12M18 6 6 18',
  external: 'M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  tiktok: 'M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.3 2.3 1.8 4 4.5 4.2',
}

export type IconKey = keyof typeof paths

export function Icon({
  name,
  size = 18,
  ...rest
}: { name: IconKey; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  )
}

export function BubbleMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="30" cy="35" r="17" stroke="#E6EDFF" strokeWidth="2.5" />
      <path d="M21 31a10 10 0 0 1 8-8" stroke="#6FB0FF" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="47" cy="18" r="6" stroke="#6FB0FF" strokeWidth="2.2" />
    </svg>
  )
}
