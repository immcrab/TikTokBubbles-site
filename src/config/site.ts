/**
 * Single source of truth for all product copy, release info, media and links.
 * Facts were read from the TikTokBubbles.dll itself (UI strings, plugin
 * metadata). Anything unknown is `null` and the matching UI is hidden.
 */

export type IconName =
  | 'bubble'
  | 'gift'
  | 'follower'
  | 'wrist'
  | 'filter'
  | 'sliders'
  | 'pause'
  | 'key'

export interface Feature {
  icon: IconName
  title: string
  description: string
}

export interface Step {
  title: string
  body: string
  /** Optional copyable snippet (path or command). */
  code?: string
  codeLabel?: string
}

export interface Faq {
  q: string
  a: string
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  /** Public URL of the site (used for social metadata). */
  url: string
  /** Real version string from the DLL, or null to hide the badge. */
  version: string | null
  status: string
  author: { name: string; handle: string }
  host: { name: string; link: string | null }
  links: {
    /** Direct download URL for the mod. null = no download published yet. */
    download: string | null
    tiktok: string | null
    discord: string | null
    support: string | null
    source: string | null
  }
  release: {
    fileName: string
    /** ISO date or display string. null hides the row. */
    date: string | null
    /** e.g. "36.9 MB". null hides the row. */
    size: string | null
    requirements: string[]
  }
  media: {
    kind: 'none' | 'video' | 'image'
    src: string | null
    poster: string | null
    alt: string
    caption: string
  }
  features: Feature[]
  steps: Step[]
  faqs: Faq[]
}

export const site: SiteConfig = {
  name: 'TikTokBubbles',
  tagline: 'Pop your stream into Gorilla Tag.',
  description:
    'A BepInEx mod for Gorilla Tag that turns your live TikTok and YouTube followers, gifts and chat into floating bubbles right in front of you. Your chat, but make it bubbly.',
  url: 'https://ttb.krox07.owenis.me',
  version: '2.15',
  status: 'Early access',
  author: { name: 'Krox', handle: '@krox07' },
  host: { name: 'Owen', link: null },
  links: {
    download: null, // e.g. 'https://github.com/you/repo/releases/latest/download/TikTokBubbles.dll'
    tiktok: 'https://www.tiktok.com/@krox07',
    discord: null,
    support: null,
    source: 'https://github.com/immcrab/TikTokBubbles-site',
  },
  release: {
    fileName: 'TikTokBubbles.dll',
    date: null,
    size: null,
    requirements: ['Gorilla Tag with BepInEx', 'A license key (early access)', 'Windows PC'],
  },
  media: {
    kind: 'none', // 'video' | 'image' once you add files to /public/media
    src: null, // e.g. '/media/gameplay.mp4'
    poster: null, // e.g. '/media/gameplay-poster.jpg'
    alt: 'TikTokBubbles gameplay',
    caption: 'TikTokBubbles in Gorilla Tag.',
  },
  features: [
    {
      icon: 'bubble',
      title: 'Stream, but bubbly',
      description:
        'TikTok and YouTube activity floats up as bubbles in front of you, with an optional platform label so you know who is who.',
    },
    {
      icon: 'gift',
      title: 'Gifts and Super Chats',
      description:
        'Gifts and Super Chats get their own moment, including a big-gift showcase. Tired of tiny gifts? Set a threshold to hide them.',
    },
    {
      icon: 'follower',
      title: 'Follower counter',
      description:
        'A live follower count, a floating +1 for every new follower, and a big CONGRATS when you hit a goal.',
    },
    {
      icon: 'wrist',
      title: 'Wrist menu',
      description:
        'Connect accounts, tweak settings and even send chat messages from a menu on your wrist. No taking the headset off.',
    },
    {
      icon: 'filter',
      title: 'Banned-word filters',
      description:
        'Separate block lists for TikTok and YouTube. A term gets caught anywhere in a message, and capital letters do not sneak past.',
    },
    {
      icon: 'sliders',
      title: 'Bubbles your way',
      description:
        'Pick a color (default, gold, purple, green or rainbow), set how long bubbles stay, cap how many appear, keep them centred or lock them to your view. Pause or clear whenever.',
    },
    {
      icon: 'pause',
      title: 'Behaves in public lobbies',
      description:
        'The mod checks the lobby and pauses itself in public ones, so the bubbles only show up where modded play belongs.',
    },
    {
      icon: 'key',
      title: 'One-time activation',
      description:
        'Enter your license key once. Your PC remembers it and the mod accepts it automatically next time.',
    },
  ],
  steps: [
    {
      title: 'Get BepInEx on Gorilla Tag',
      body: 'TikTokBubbles is a BepInEx plugin, so Gorilla Tag needs BepInEx installed and launched at least once.',
    },
    {
      title: 'Grab the mod file',
      body: 'Download TikTokBubbles.dll from the release panel below.',
    },
    {
      title: 'Drop it in plugins',
      body: 'Copy the file into the BepInEx plugins folder inside your Gorilla Tag install.',
      code: 'Gorilla Tag\\BepInEx\\plugins\\TikTokBubbles.dll',
      codeLabel: 'Destination path',
    },
    {
      title: 'Unlock it with your key',
      body: 'Launch the game and press TAB to open the license dialog. Enter your key once and your PC remembers it.',
      code: 'TAB',
      codeLabel: 'Open license dialog',
    },
    {
      title: 'Go live and connect',
      body: 'Open the wrist menu, type your TikTok username (no @) or YouTube handle, and connect while you are live. Bubbles incoming.',
    },
  ],
  faqs: [
    {
      q: 'What does TikTokBubbles actually do?',
      a: 'It watches your live TikTok and YouTube activity and shows it in Gorilla Tag as floating bubbles: chat, gifts, Super Chats and a live follower counter.',
    },
    {
      q: 'Do I need a license key?',
      a: 'Yes. The mod is in early access and asks for a license key through KeyAuth. The key is tied to your PC, entered once with TAB, and remembered after that. No key yet? Ask the author.',
    },
    {
      q: 'Will it work in public lobbies?',
      a: 'Nope. The mod spots public lobbies and pauses itself. It is meant for modded or private play.',
    },
    {
      q: 'How do I connect my account?',
      a: 'Open the wrist menu, enter your TikTok username without the @ (or your YouTube handle or live link) and hit connect. Do it while you are live.',
    },
    {
      q: 'Can I block certain words?',
      a: 'Yes. The wrist menu has separate banned-word lists for TikTok and YouTube. Separate terms with commas or new lines. Capitals do not matter.',
    },
    {
      q: 'Is this official?',
      a: 'Not at all. TikTokBubbles is an independent project, not affiliated with or endorsed by Gorilla Tag or TikTok. The mod is made by Krox and this site is hosted by Owen.',
    },
  ],
}

export const navItems = [
  { to: '/', label: 'Home', icon: 'overview' },
  { to: '/features', label: 'Features', icon: 'features' },
  { to: '/preview', label: 'Preview', icon: 'preview' },
  { to: '/install', label: 'Install', icon: 'install' },
  { to: '/faq', label: 'FAQ', icon: 'faq' },
] as const

export type NavIcon = (typeof navItems)[number]['icon']
