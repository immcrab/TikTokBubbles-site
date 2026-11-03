/**
 * Single source of truth for all product copy, release info, media and links.
 * Everything here was read from the TikTokBubbles.dll itself (UI strings, plugin
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
  tagline: 'Your live stream, floating in front of you.',
  description:
    'A BepInEx mod for Gorilla Tag that turns live TikTok and YouTube activity — followers, gifts and chat — into calm, readable bubbles in your field of view.',
  url: 'https://ttb.krox07.owenis.me',
  version: '2.15',
  status: 'Early access',
  author: { name: 'Krox', handle: '@krox07' },
  links: {
    download: null, // e.g. 'https://github.com/you/repo/releases/latest/download/TikTokBubbles.dll'
    tiktok: 'https://www.tiktok.com/@krox07',
    discord: null,
    support: null,
    source: null,
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
      title: 'Live stream bubbles',
      description:
        'TikTok and YouTube activity appears as floating bubbles, with an optional platform label on each one.',
    },
    {
      icon: 'gift',
      title: 'Gifts and Super Chats',
      description:
        'Gifts and YouTube Super Chats get their own treatment, with a big-gift showcase and a threshold to hide small gifts.',
    },
    {
      icon: 'follower',
      title: 'Follower counter',
      description:
        'A live follower count with a floating +1 for each new follower and a CONGRATS moment at every goal.',
    },
    {
      icon: 'wrist',
      title: 'Wrist menu',
      description:
        'Connect your accounts, tune settings and send chat messages from a menu on your wrist, without leaving VR.',
    },
    {
      icon: 'filter',
      title: 'Banned-word filters',
      description:
        'Separate block lists for TikTok and YouTube. Terms match anywhere in a message, ignoring case.',
    },
    {
      icon: 'sliders',
      title: 'Bubble controls',
      description:
        'Choose a bubble color, lifetime and maximum count, keep bubbles centred, or lock them to your view. Pause or clear at any time.',
    },
    {
      icon: 'pause',
      title: 'Pauses in public lobbies',
      description:
        'The mod checks the lobby type and pauses itself in public lobbies, so bubbles only run where modded play is expected.',
    },
    {
      icon: 'key',
      title: 'Simple activation',
      description:
        'Enter your license key once. It is remembered on your PC and accepted automatically on later launches.',
    },
  ],
  steps: [
    {
      title: 'Set up BepInEx',
      body: 'TikTokBubbles is a BepInEx plugin, so Gorilla Tag needs BepInEx installed and run at least once.',
    },
    {
      title: 'Get the mod file',
      body: 'Download TikTokBubbles.dll from the release panel below.',
    },
    {
      title: 'Place it in plugins',
      body: 'Copy the file into the BepInEx plugins folder inside your Gorilla Tag install.',
      code: 'Gorilla Tag\\BepInEx\\plugins\\TikTokBubbles.dll',
      codeLabel: 'Destination path',
    },
    {
      title: 'Activate your license',
      body: 'Launch the game and press TAB to open the license dialog. Enter your key; it is remembered on your PC afterwards.',
      code: 'TAB',
      codeLabel: 'Open license dialog',
    },
    {
      title: 'Connect your stream',
      body: 'Open the wrist menu, type your TikTok username (without @) or YouTube handle, and connect while you are live.',
    },
  ],
  faqs: [
    {
      q: 'What does TikTokBubbles do?',
      a: 'It reads your live TikTok and YouTube activity and shows it in Gorilla Tag as floating bubbles — chat, gifts, Super Chats and a live follower counter.',
    },
    {
      q: 'Do I need a license key?',
      a: 'Yes. The mod is in early access and asks for a license key through KeyAuth. The key is bound to your PC, entered once from the TAB dialog, and remembered afterwards. If you do not have one yet, contact the author.',
    },
    {
      q: 'Does it work in public lobbies?',
      a: 'No. The mod detects public lobbies and pauses itself there. It is meant for modded or private play.',
    },
    {
      q: 'How do I connect my account?',
      a: 'Open the wrist menu, enter your TikTok username without the @ (or your YouTube handle or live link), and press connect. Connect while you are live.',
    },
    {
      q: 'Can I block words from showing up?',
      a: 'Yes. The wrist menu has separate banned-word lists for TikTok and YouTube. Separate terms with commas or new lines; matching ignores case.',
    },
    {
      q: 'Is this affiliated with Gorilla Tag or TikTok?',
      a: 'No. TikTokBubbles is an independent project and is not affiliated with, endorsed by, or sponsored by Gorilla Tag or TikTok.',
    },
  ],
}

export const navItems = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'features', label: 'Features', icon: 'features' },
  { id: 'preview', label: 'Preview', icon: 'preview' },
  { id: 'installation', label: 'Installation', icon: 'install' },
  { id: 'faq', label: 'FAQ', icon: 'faq' },
] as const

export type NavIcon = (typeof navItems)[number]['icon']
