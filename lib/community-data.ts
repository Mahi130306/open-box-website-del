// ─── Types ────────────────────────────────────────────────────────────────────

export type TicketStatus = 'free' | 'paid'

export interface Sponsor {
  name: string
  logo: string
  url: string
  type?: 'sponsor' | 'partner'
  tagline?: string
  socials?: {
    x?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
}

export interface Event {
  id: string
  name: string
  server: string
  serverSlug: string
  date: string
  deadline?: string
  description: string
  ticketStatus: TicketStatus
  price?: string
  isOffline: boolean
  location: string
  agenda: string[]
  sponsors?: Sponsor[]
  sponsor?: Sponsor
}

export interface Servers {
  slug: string
  name: string
  description: string
  longDescription?: string
  tags: string[]
  memberCount: number
  isLive: boolean
  accent: string
  channels?: string[]
  rules?: string[]
  inviteEnv?: string
  inviteCode?: string
}

export interface Blog {
  slug: string
  title: string
  server: string
  date: string
  excerpt: string
  readTime: string
  category?: 'dbw'
  authorId?: string
  hasImage?: boolean
  imageAlt?: string
}

export interface TeamMember {
  slug: string
  name: string
  role: string
  bio: string
  avatar: string
  aboutSection: string
  socials?: {
    github?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
}

// ─── Servers ──────────────────────────────────────────────────────────────────

export const servers: Servers[] = [
  {
    slug: 'jn',
    name: 'Junction [Jn.]',
    description: 'The main hub for founders, students, and curious people.',
    longDescription:
      'Jn. is the friendly front door of Open Box. Bring a rough idea, ask for feedback, share your wins, or find people who want to build alongside you.',
    tags: ['community', 'showcase', 'feedback'],
    memberCount: 99,
    isLive: true,
    accent: 'bg-black/90',
    channels: ['OB Jn FEEDs', 'Notification', 'Forms', 'System'],
    rules: ['Be respectful and welcoming', 'Share context when asking for help', 'Use the right channel', 'Celebrate work in progress'],
    inviteEnv: 'NEXT_PUBLIC_DISCORD_JN_INVITE',
    inviteCode: '7ZWckKU89J',
  },
  {
    slug: 'dev',
    name: 'OB Dev',
    description: 'Technical deep dives, coding help, open source, and project reviews.',
    longDescription:
      'Dev is for bringing devs together. Pair on bugs, review architecture, share resources, and turn scattered notes into working projects.',
    tags: ['development', 'open-source', 'Showoff'],
    memberCount: 99,
    isLive: true,
    accent: 'bg-emerald-950',
    channels: ['Dev & Projects', 'Knowledge Base', 'Events', 'Career'],
    rules: ['Be helpful', 'Use code blocks', 'Respect others work', 'No spam or low-context promotion'],
    inviteEnv: 'NEXT_PUBLIC_DISCORD_DEV_INVITE',
    inviteCode: 'nF48vqYwEk',
  },
  {
    slug: 'gg',
    name: 'OB GG (Beta)',
    description: 'Gaming nights, tournaments, and team finding.',
    longDescription:
      'GG is where play and building meet. Join casual sessions, organize tournament squads, talk game design, and find collaborators for prototypes.',
    tags: ['gaming', 'tournaments', 'fun', 'flex'],
    memberCount: 99,
    isLive: true,
    accent: 'bg-red-950',
    channels: ['Battle Royal', 'Open world', 'Story line', 'Competitive', 'Casual'],
    rules: ['No cheating', 'Keep matches friendly', 'Follow event rules', 'No toxicity'],
    inviteEnv: 'NEXT_PUBLIC_DISCORD_GG_INVITE',
    inviteCode: 'etnc7ZpDKT',
  },
]
// ─── Events ───────────────────────────────────────────────────────────────────

export const events: Event[] = [
  // {
  //   id: 'open-build-night',
  //   name: 'Open Build Night',
  //   server: 'Dev',
  //   serverSlug: 'dev',
  //   date: '2026-06-22T14:00:00+05:30',
  //   deadline: '2026-06-22T14:00:00+05:30',
  //   description: 'Bring a half-built project, get momentum, and leave with a tiny shipped improvement.',
  //   ticketStatus: 'free',
  //   isOffline: false,
  //   location: 'Discord voice stage',
  //   agenda: ['Quick intros', '45 minute build sprint', 'Feedback rounds', 'Show-and-tell'],
  //   sponsors: [
  //     {
  //       name: 'Devfolio',
  //       logo: 'https://devfolio.co/img/logo.png',
  //       url: 'https://devfolio.co',
  //       type: 'sponsor',
  //       tagline: 'Powered by Devfolio',
  //       socials: {
  //         x: 'devfolio',
  //         instagram: 'devfolio',
  //       },
  //     },
  //   ],
  //   sponsor: {
  //     name: 'Devfolio',
  //     logo: 'https://devfolio.co/img/logo.png',
  //     url: 'https://devfolio.co',
  //     tagline: 'Powered by Devfolio',
  //     socials: {
  //       x: 'devfolio',
  //       instagram: 'devfolio',
  //     },
  //   },
  // },
  // {
  //   id: 'gg-community-cup',
  //   name: 'GG Community Cup',
  //   server: 'GG',
  //   serverSlug: 'gg',
  //   date: '2026-08-02T18:00:00+05:30',
  //   description: 'A friendly tournament night with squads, brackets, and post-match hangout rooms.',
  //   ticketStatus: 'paid',
  //   price: '₹299',
  //   isOffline: false,
  //   location: 'GG Discord tournament channels',
  //   agenda: ['Check-in', 'Qualifier matches', 'Final lobby', 'Highlights and prizes'],
  //   sponsors: [
  //     {
  //       name: 'Discord',
  //       logo: 'https://logo.clearbit.com/discord.com',
  //       url: 'https://discord.com',
  //       type: 'partner',
  //       tagline: 'Community platform partner',
  //       socials: {
  //         x: 'discord',
  //         instagram: 'discord',
  //       },
  //     },
  //     {
  //       name: 'Razer',
  //       logo: 'https://logo.clearbit.com/razer.com',
  //       url: 'https://razer.com',
  //       type: 'sponsor',
  //       tagline: 'Gear partner for community play',
  //       socials: {
  //         x: 'razer',
  //         instagram: 'razer',
  //         youtube: 'razer',
  //       },
  //     },
  //     {
  //       name: 'Challonge',
  //       logo: 'https://logo.clearbit.com/challonge.com',
  //       url: 'https://challonge.com',
  //       type: 'partner',
  //       tagline: 'Tournament bracket partner',
  //       socials: {
  //         x: 'challonge',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'jn-town-hall',
  //   name: 'JN Town Hall',
  //   server: 'Jn.',
  //   serverSlug: 'jn',
  //   date: '2026-08-16T17:00:00+05:30',
  //   description: 'Community updates, open questions, and a look at what Open Box is building next.',
  //   ticketStatus: 'free',
  //   isOffline: false,
  //   location: 'Main Discord stage',
  //   agenda: ['Roadmap update', 'Community questions', 'Server spotlight', 'Open mic'],
  // },
  // {
  //   id: 'founder-feedback-circle',
  //   name: 'Founder Feedback Circle',
  //   server: 'Jn.',
  //   serverSlug: 'jn',
  //   date: '2026-09-06T16:00:00+05:30',
  //   deadline: '2026-09-06T15:30:00+05:30',
  //   description: 'A small-room review session for rough ideas, landing pages, prototypes, and pitch drafts.',
  //   ticketStatus: 'free',
  //   isOffline: false,
  //   location: 'Jn. Discord roundtable',
  //   agenda: ['Founder intros', 'Three-minute idea walkthroughs', 'Peer feedback', 'Next-step commitments'],
  //   sponsors: [
  //     {
  //       name: 'Notion',
  //       logo: 'https://logo.clearbit.com/notion.so',
  //       url: 'https://notion.so',
  //       type: 'partner',
  //       tagline: 'Workspace partner for builders',
  //       socials: {
  //         x: 'notionhq',
  //         instagram: 'notionhq',
  //         linkedin: 'notionhq',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'api-debugging-lab',
  //   name: 'API Debugging Lab',
  //   server: 'Dev',
  //   serverSlug: 'dev',
  //   date: '2026-09-13T20:00:00+05:30',
  //   description: 'Bring a broken endpoint, auth issue, webhook bug, or confusing stack trace and debug it live.',
  //   ticketStatus: 'free',
  //   isOffline: false,
  //   location: 'Dev Discord voice stage',
  //   agenda: ['Bug intake', 'Live debugging slots', 'Tooling tips', 'Shared notes and fixes'],
  //   sponsors: [
  //     {
  //       name: 'Postman',
  //       logo: 'https://logo.clearbit.com/postman.com',
  //       url: 'https://postman.com',
  //       type: 'partner',
  //       tagline: 'API tooling partner',
  //       socials: {
  //         x: 'postmanclient',
  //         linkedin: 'postman-platform',
  //         youtube: 'postman',
  //       },
  //     },
  //     {
  //       name: 'Sentry',
  //       logo: 'https://logo.clearbit.com/sentry.io',
  //       url: 'https://sentry.io',
  //       type: 'partner',
  //       tagline: 'Error monitoring partner',
  //       socials: {
  //         x: 'getsentry',
  //         linkedin: 'sentry',
  //         youtube: 'sentry-monitoring',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'campus-build-jam',
  //   name: 'Campus Build Jam',
  //   server: 'Dev',
  //   serverSlug: 'dev',
  //   date: '2026-09-27T10:00:00+05:30',
  //   deadline: '2026-09-24T23:59:00+05:30',
  //   description: 'A focused offline build day for students shipping one useful mini-product before sunset.',
  //   ticketStatus: 'paid',
  //   price: '₹499',
  //   isOffline: true,
  //   location: 'Open Box pop-up lab, Bengaluru',
  //   agenda: ['Check-in and team matching', 'Build sprint one', 'Mentor reviews', 'Demo hour', 'Community dinner'],
  //   sponsors: [
  //     {
  //       name: 'GitHub',
  //       logo: 'https://logo.clearbit.com/github.com',
  //       url: 'https://github.com',
  //       type: 'sponsor',
  //       tagline: 'Developer platform partner',
  //       socials: {
  //         x: 'github',
  //         instagram: 'github',
  //         linkedin: 'github',
  //         youtube: 'github',
  //       },
  //     },
  //     {
  //       name: 'Figma',
  //       logo: 'https://logo.clearbit.com/figma.com',
  //       url: 'https://figma.com',
  //       type: 'partner',
  //       tagline: 'Design collaboration partner',
  //       socials: {
  //         x: 'figma',
  //         instagram: 'figma',
  //         linkedin: 'figma',
  //         youtube: 'figmadesign',
  //       },
  //     },
  //     {
  //       name: 'Vercel',
  //       logo: 'https://logo.clearbit.com/vercel.com',
  //       url: 'https://vercel.com',
  //       type: 'sponsor',
  //       tagline: 'Deployment partner',
  //       socials: {
  //         x: 'vercel',
  //         instagram: 'vercel',
  //         linkedin: 'vercel',
  //         youtube: 'vercel',
  //       },
  //     },
  //     {
  //       name: 'Supabase',
  //       logo: 'https://logo.clearbit.com/supabase.com',
  //       url: 'https://supabase.com',
  //       type: 'partner',
  //       tagline: 'Backend partner',
  //       socials: {
  //         x: 'supabase',
  //         linkedin: 'supabase',
  //         youtube: 'supabase',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'indie-game-playtest-night',
  //   name: 'Indie Game Playtest Night',
  //   server: 'GG',
  //   serverSlug: 'gg',
  //   date: '2026-10-04T19:30:00+05:30',
  //   description: 'Prototype makers share playable builds and get structured feedback from the GG community.',
  //   ticketStatus: 'free',
  //   isOffline: false,
  //   location: 'GG Discord playtest rooms',
  //   agenda: ['Build lineup', 'Playtest rotations', 'Feedback forms', 'Creator Q&A'],
  //   sponsors: [
  //     {
  //       name: 'itch.io',
  //       logo: 'https://logo.clearbit.com/itch.io',
  //       url: 'https://itch.io',
  //       type: 'partner',
  //       tagline: 'Indie game distribution partner',
  //       socials: {
  //         x: 'itchio',
  //       },
  //     },
  //     {
  //       name: 'Unity',
  //       logo: 'https://logo.clearbit.com/unity.com',
  //       url: 'https://unity.com',
  //       type: 'partner',
  //       tagline: 'Game engine partner',
  //       socials: {
  //         x: 'unity',
  //         instagram: 'unitytechnologies',
  //         youtube: 'unity',
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: 'open-mic-showcase',
  //   name: 'Open Mic Showcase',
  //   server: 'Jn.',
  //   serverSlug: 'jn',
  //   date: '2026-10-18T18:00:00+05:30',
  //   description: 'A casual community stage for demos, writing, design experiments, music, and unfinished ideas.',
  //   ticketStatus: 'free',
  //   isOffline: false,
  //   location: 'Main Discord stage',
  //   agenda: ['Sign-up roll call', 'Five-minute showcases', 'Community reactions', 'After-stage hangout'],
  // },
  // {
  //   id: 'retro-lan-evening',
  //   name: 'Retro LAN Evening',
  //   server: 'GG',
  //   serverSlug: 'gg',
  //   date: '2026-11-07T17:00:00+05:30',
  //   deadline: '2026-11-04T23:59:00+05:30',
  //   description: 'An offline throwback gaming evening with local matches, snacks, and community scoreboards.',
  //   ticketStatus: 'paid',
  //   price: '₹199',
  //   isOffline: true,
  //   location: 'Open Box arcade pop-up, Bengaluru',
  //   agenda: ['Setup and warmups', 'Classic match rotations', 'Leaderboard finals', 'Photo wall'],
  //   sponsors: [
  //     {
  //       name: 'Red Bull',
  //       logo: 'https://logo.clearbit.com/redbull.com',
  //       url: 'https://redbull.com',
  //       type: 'sponsor',
  //       tagline: 'Energy partner',
  //       socials: {
  //         x: 'redbull',
  //         instagram: 'redbull',
  //         youtube: 'redbull',
  //       },
  //     },
  //   ],
  // },
]

// ─── Blogs ────────────────────────────────────────────────────────────────────

export const blogs: Blog[] = [
  {
    slug: 'why-we-removed-wick',
    title: 'Why We Removed Wick',
    server: 'OB Team',
    date: '2026-07-20',
    excerpt: 'Wick was kicking members for having their DMs disabled and punishing people without a real reason. Here is what we found and why we pulled it.',
    readTime: '2 min read',
    hasImage: true,
    imageAlt: 'Wick bot log showing a member kicked for DMs disabled',
    authorId: 'mahi-hh',
  },
  {
    slug: 'why-we-kept-it-free',
    title: 'Why We Kept It Free',
    server: 'OB Team',
    date: '2026-07-19',
    excerpt: 'Open Box has been free since day one. Not free with a catch. Here is the actual reasoning behind that decision and what it means for how we build.',
    readTime: '2 min read',
    authorId: 'rohith',
  },

  {
    slug: 'what-is-dbw',
    title: 'What Is DBW',
    server: 'OB JN',
    date: '2026-07-19',
    excerpt: 'Every Friday we put out a weekly update called DBW — Day Before Weekend. Here is what it covers, why it exists, and where to find it.',
    readTime: '2 min read',
    authorId: 'rohith',
  },
  {
    slug: 'where-we-go-from-here',
    title: 'Where We Go From Here',
    server: 'OB Team',
    date: '2026-06-29',
    excerpt: 'OpenBox has gone from a club side-project to its own independent community. Here is what we are focused on next and what we want to build with you.',
    readTime: '2 min read',
    authorId: 'mahi-hh',
  },
  {
    slug: 'ob-gg-gaming-server-beta',
    title: 'OB GG Is in Beta',
    server: 'OB GG',
    date: '2026-06-29',
    excerpt: 'OB GG is our gaming server. We built it to bring more people into the OpenBox world and give gamers in the community a dedicated home. It is live now in beta.',
    readTime: '2 min read',
    authorId: 'mahi-hh',
  },
  {
    slug: 'the-new-website',
    title: 'The New Website',
    server: 'Dev Log',
    date: '2026-06-29',
    excerpt: 'We rebuilt openboxcomm.in from the ground up on Next.js and Vercel. Here is what it does now and what is coming next, including a dedicated ticketing site with Discord login.',
    readTime: '2 min read',
    authorId: 'rohith',
  },
  {
    slug: 'the-first-website-broke',
    title: 'The First Website Broke',
    server: 'Dev Log',
    date: '2026-06-29',
    excerpt: 'We shipped our first website fast, felt good about it, and then watched it break in production. A build failure we did not catch for way too long.',
    readTime: '2 min read',
    authorId: 'rohith',
  },
  {
    slug: 'how-we-started',
    title: 'How We Started',
    server: 'Story',
    date: '2026-06-29',
    excerpt: 'OpenBox started as part of a college club. Then things changed, we split off, and built something of our own. Here is the honest version of that story.',
    readTime: '2 min read',
    authorId: 'mahi-hh',
  },
  {
    slug: 'dbw-june-week-2',
    title: 'DBW: June Week 2 Update',
    server: 'Weekly Update',
    date: '2026-06-29',
    excerpt: 'Day Before Weekend (dbw) — our weekly Friday update. This week we fixed bugs on the website, prepared for the GG beta expansion, and more.',
    readTime: '3 min read',
    category: 'dbw',
    authorId: 'mahi-hh',
  },
]

// ─── Docs ─────────────────────────────────────────────────────────────────────

export const docs = [
  // ─── Core ───────────────────────────────────────────────
  { slug: 'getting-started', title: 'Getting Started', description: 'New to Open Box? Start here. Everything you need to join, settle in, and find your place.', section: 'Core' },
  { slug: 'account-setup', title: 'Account Setup & Profile', description: 'How to join our Discord, complete onboarding, get your roles, and set up your profile the right way.', section: 'Core' },
  { slug: 'rules', title: 'Community Rules', description: 'The shared expectations that keep Open Box friendly, useful, and safe.', section: 'Core' },
  { slug: 'glossary', title: 'Glossary', description: 'Terms, abbreviations, and shorthand used across Open Box servers and the website.', section: 'Core' },

  // ─── Community ──────────────────────────────────────────
  { slug: 'discord-boosts', title: 'Discord Boosts', description: 'How Server Boosts work, what they unlock for Open Box, and perks for members who boost.', section: 'Community' },
  { slug: 'jn-guide', title: 'Jn. Community Guide', description: 'Start here for introductions, sharing projects, and community norms.', section: 'Community' },
  { slug: 'dev-handbook', title: 'Dev Server Handbook', description: 'How to ask for coding help, request reviews, and use project channels.', section: 'Community' },
  { slug: 'gg-event-guide', title: 'GG Event Guide', description: 'Tournament expectations, gaming channels, and collaboration notes.', section: 'Community' },
  { slug: 'groups', title: 'Groups & Sub-Communities', description: 'How the Open Box servers connect — Dev, GG, Study, and Connect as extensions of Junction.', section: 'Community' },
  { slug: 'content-standards', title: 'Content Standards', description: 'What good content looks like in Open Box — and what crosses the line.', section: 'Community' },
  { slug: 'privacy-community', title: 'Privacy in the Community', description: 'What to share, what to keep private, display name norms, and how to stay safe in the servers.', section: 'Community' },

  // ─── Platform ───────────────────────────────────────────
  { slug: 'features', title: 'Features Overview', description: 'A tour of what Open Box offers — Discord servers, the website, events, and what is coming next.', section: 'Platform' },
  { slug: 'roles', title: 'Roles & Permissions', description: 'How roles work across Open Box servers, how to earn them, and what they unlock.', section: 'Platform' },
  { slug: 'events-tickets', title: 'Events & Tickets', description: 'How Open Box events work, how to register, and how to use tickets.openboxcomm.in.', section: 'Platform' },
  { slug: 'tos-summary', title: 'Terms of Service Summary', description: 'A plain-English summary of the Open Box Terms & Conditions.', section: 'Platform' },

  // ─── Support ────────────────────────────────────────────
  { slug: 'moderation-policy', title: 'Moderation Policy', description: 'How moderation works at Open Box — what moderators do, how decisions are made, and how to appeal.', section: 'Support' },
  { slug: 'reporting', title: 'Reporting & Enforcement', description: 'How to report rule violations, what happens after a report, and how enforcement works.', section: 'Support' },
  { slug: 'troubleshooting', title: 'Troubleshooting', description: 'Common issues and how to fix them. When in doubt, reach the team at support@openboxcomm.in.', section: 'Support' },
  { slug: 'contact', title: 'Contact & Support', description: 'Every way to reach the Open Box team — email, Discord, and what to expect when you do.', section: 'Support' },

  // ─── Contributing ───────────────────────────────────────
  { slug: 'contributing', title: 'Contributing to the Community', description: 'How to submit suggestions, build tools, contribute bots, and help make Open Box better.', section: 'Contributing' },
]

// ─── Team ─────────────────────────────────────────────────────────────────────

export const teamMembers: TeamMember[] = [
  {
    slug: 'mahi-hh',
    name: 'Mahi HH',
    role: 'Founder',
    bio: 'The Founder of Open Box.',
    avatar: 'https://api.dicebear.com/10.x/initials/svg?seed=Mahi',
    aboutSection: 'From building a community in school to hosting coding bootcamps and game tournaments for thousands of students, Mahi leads Open Box with a simple belief: everyone deserves a place to belong, learn, and grow. He is a builder at heart, and he loves bringing people together. Whether it’s coding, gaming, creating, or just hanging out — there is a spot for you here.',
    socials: {
      instagram: 'https://instagram.com/openboxcomm',
      github: 'https://github.com/mahi130306',
      twitter: 'https://x.com/mahihh1212',
      linkedin: 'https://www.linkedin.com/in/mahi-hh-59001831b/',
    },
  },
  {
    slug: 'rohith',
    name: 'Rohith',
    role: 'Founder',
    bio: 'The Co - Founder of Open Box.',
    avatar: 'https://api.dicebear.com/10.x/initials/svg?seed=Rohith',
    aboutSection: 'Rohith is a Co-Founder of Open Box, a community for developers, builders, gamers, and students. He is passionate about creating spaces where people can connect, learn, and grow together.',
    socials: {
      github: 'https://github.com/knsorrigie',
    },
  },
  // {
  //   slug: 'arjun',
  //   name: 'Arjun',
  //   role: 'Lead Developer',
  //   bio: 'Arjun architects the technical backbone of Open Box — from bots to dashboards. He thrives on clean code and late-night deploys.',
  //   avatar: 'https://api.dicebear.com/10.x/initials/svg?seed=Arjun',
  //   socials: {
  //     github: 'https://github.com/openboxcomm',
  //     twitter: 'https://x.com/openboxcomm',
  //   },
  // },
  // {
  //   slug: 'priya',
  //   name: 'Priya',
  //   role: 'Community Manager',
  //   bio: 'Priya keeps the vibe alive across every server. From onboarding newcomers to running events, she makes sure everyone feels at home.',
  //   avatar: 'https://api.dicebear.com/10.x/initials/svg?seed=Priya',
  //   socials: {
  //     instagram: 'https://instagram.com/openboxcomm',
  //     twitter: 'https://x.com/openboxcomm',
  //   },
  // },
  // {
  //   slug: 'rohan',
  //   name: 'Rohan',
  //   role: 'Events Lead',
  //   bio: 'Rohan plans and executes every tournament, workshop, and meetup. If there is an event on the calendar, Rohan probably built it.',
  //   avatar: 'https://api.dicebear.com/10.x/initials/svg?seed=Rohan',
  //   socials: {
  //     github: 'https://github.com/openboxcomm',
  //     instagram: 'https://instagram.com/openboxcomm',
  //   },
  // },
  // {
  //   slug: 'neha',
  //   name: 'Neha',
  //   role: 'Content & Design',
  //   bio: 'Neha crafts the visuals, writes the copy, and shapes how Open Box looks and feels. Every banner and blog post has her fingerprint on it.',
  //   avatar: 'https://api.dicebear.com/10.x/initials/svg?seed=Neha',
  //   socials: {
  //     instagram: 'https://instagram.com/openboxcomm',
  //     twitter: 'https://x.com/openboxcomm',
  //   },
  // },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getServer(slug: string) {
  return servers.find((server) => server.slug === slug)
}

export function getEvent(id: string): Event | undefined {
  return events.find((e) => e.id === id)
}

export function getBlog(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug)
}

export function getTeamMember(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug)
}

// ─── Important Notice ──────────────────────────────────────────────────────────

export interface ImportantNotice {
  text: string
  linkText: string
  linkUrl: string
}

export const importantNotice: ImportantNotice = {
  text: 'important notice: we removed a bot named wick from the servers. 20-07-2026.',
  linkText: 'for more click.',
  linkUrl: '/blogs/why-we-removed-wick',
}
