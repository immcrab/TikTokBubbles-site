/**
 * Single source of truth for all product copy, release info, media and links.
 * Facts come from the mod's GitHub repo/release notes and TikTokBubbles.dll.
 * Anything unknown is `null` and the matching UI is hidden.
 */

export interface Feature {
  title: string
  description: string
}

export interface Step {
  title: string
  body: string
  /** Optional copyable snippet (path or key). */
  code?: string
  codeLabel?: string
}

export interface Faq {
  q: string
  a: string
}

export const site = {
  name: 'TikTokBubbles',
  url: 'https://ttb.krox07.owenis.me',
  tagline: 'Your TikTok chat, floating in front of you.',
  description:
    'A Gorilla Tag PC mod that turns your TikTok live chat into bubbles in VR. Read chat without taking your headset off, and touch a bubble to pop it.',
  author: { name: 'Krox', handle: '@krox07' },
  host: { name: 'Owen', link: null as string | null },
  links: {
    /** Mod GitHub repo (also feeds the star counter). null hides it. */
    repo: 'https://github.com/kroxyraun-hub/tiktokbubbes',
    repoSlug: 'kroxyraun-hub/tiktokbubbes',
    tiktok: 'https://www.tiktok.com/@krox07',
    discord: null as string | null,
    support: null as string | null,
  },
  /** The free edition, which has a public download. */
  lite: {
    name: 'Lite',
    fileName: 'TikTokBubblesLite.dll',
    /** Direct download URL. null = not published. */
    download: 'https://github.com/kroxyraun-hub/tiktokbubbes/releases/download/mod/TikTokBubblesLite.dll' as string | null,
    date: 'Oct 28, 2026' as string | null,
    size: '35.2 MB' as string | null,
    price: 'Free',
    requirements: ['Gorilla Tag on PC with BepInEx', 'Private or modded lobbies', 'A live TikTok account'],
  },
  /** The paid/early-access edition, delivered by DM (no public download). */
  full: {
    name: 'Full',
    version: '2.15' as string | null,
    price: 'By DM',
  },
  media: {
    kind: 'none' as 'none' | 'video' | 'image', // 'video' | 'image' once files are in /public/media
    src: null as string | null, // e.g. '/media/gameplay.mp4'
    poster: null as string | null,
    alt: 'TikTokBubbles gameplay',
    caption: 'TikTokBubbles in Gorilla Tag.',
  },
  liteFeatures: [
    { title: 'Chat as bubbles', description: 'Your TikTok live chat floats in front of you in VR, so you can read it without leaving the game.' },
    { title: 'Touch to pop', description: 'Reach out and touch a bubble to pop it.' },
    { title: 'Fast reconnects', description: 'If your live drops, the mod reconnects almost instantly.' },
    { title: 'Dead simple setup', description: 'Type your username, press Connect, done.' },
    { title: 'Private lobbies only', description: 'It only runs in private codes and modded lobbies.' },
  ] as Feature[],
  fullFeatures: [
    { title: 'Gifts and big-gift moments', description: 'Gifts get their own bubbles, with a big-gift showcase. Hide small gifts under a value you choose.' },
    { title: 'Follower counter and alerts', description: 'A live follower count, a floating +1 for each new follower and a CONGRATS moment at every goal.' },
    { title: 'YouTube chat and Super Chats', description: 'Connect a YouTube live too, with Super Chats shown in their own style.' },
    { title: 'Wrist menu', description: 'Connect accounts, tune settings and send chat messages from a menu on your wrist.' },
    { title: 'Banned-word filters', description: 'Separate block lists for TikTok and YouTube. Terms match anywhere in a message, ignoring case.' },
    { title: 'Bubble settings', description: 'Choose color, lifetime and maximum count, keep bubbles centred or lock them to your view, and pause or clear any time.' },
  ] as Feature[],
  steps: [
    {
      title: 'Install BepInEx',
      body: 'Use MonkeModManager to install BepInEx, then start Gorilla Tag once so it sets itself up.',
    },
    {
      title: 'Download the mod',
      body: 'Grab TikTokBubblesLite.dll from the download panel below.',
    },
    {
      title: 'Put it in plugins',
      body: 'Drop the file into the BepInEx plugins folder in your Gorilla Tag install.',
      code: 'Gorilla Tag\\BepInEx\\plugins\\TikTokBubblesLite.dll',
      codeLabel: 'Destination path',
    },
    {
      title: 'Open the menu in game',
      body: 'Start Gorilla Tag and press Tab.',
      code: 'Tab',
      codeLabel: 'Menu key',
    },
    {
      title: 'Connect while you are live',
      body: 'Type your TikTok username and click Connect. If Windows asks about bridge.exe the first time, allow it.',
    },
  ] as Step[],
  faqs: [
    {
      q: 'Is it free?',
      a: 'The Lite edition is free and has a public download. The Full edition has extra features and is handed out by DM.',
    },
    {
      q: 'What is the difference between Lite and Full?',
      a: 'Lite shows your TikTok chat as bubbles you can pop. Full adds gifts with big-gift explosions, follow alerts, a follower counter, YouTube chat and Super Chats, a wrist menu, filters and bubble settings.',
    },
    {
      q: 'How do I get Full?',
      a: 'Send @krox07 a DM on TikTok. Full is in early access and needs a license key, entered once and tied to your PC.',
    },
    {
      q: 'Does it work in public lobbies?',
      a: 'No. It only works in private codes and modded lobbies.',
    },
    {
      q: 'Windows asks about bridge.exe. Is that normal?',
      a: 'Yes. The first time you connect, Windows may ask about bridge.exe. Allow it so the mod can reach your live.',
    },
    {
      q: 'Is this official?',
      a: 'No. TikTokBubbles is an independent project, not affiliated with Gorilla Tag or TikTok. The mod is made by Krox and this site is hosted by Owen.',
    },
  ] as Faq[],
}

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/preview', label: 'Preview' },
  { to: '/install', label: 'Install' },
  { to: '/faq', label: 'FAQ' },
] as const
