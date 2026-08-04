import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Quiz } from '@/components/Quiz'
import { DirectorySearch } from '@/components/DirectorySearch'
import { MasterCalendar } from '@/components/MasterCalendar'
import { CTASection } from '@/components/CTASection'
import { ImportantNoticeMarquee } from '@/components/ImportantNoticeMarquee'
import {
  ArrowRight,
  Sparkles,
  Users,
  Server,
  Calendar,
  Clock,
  Code2,
  Gamepad2,
  GraduationCap,
  ShieldCheck,
  Compass,
  MessageSquarePlus,
  UserCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Discord Community for Developers & Gamers in India',
  description:
    'Join OpenBox, a free multi-server Discord community for developers, gamers, and students in India. Explore our servers, attend events, and connect with peers.',
  keywords: [
    'OpenBox',
    'Open Box',
    'Discord community India',
    'developer community',
    'gaming server India',
    'student tech community',
    'free Discord server',
    'peer connections',
  ],
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://openboxcomm.in/#webpage',
      url: 'https://openboxcomm.in',
      name: 'Free Discord Community for Developers & Gamers in India',
      description:
        'OpenBox is a free multi-server Discord community for developers, gamers, and students in India.',
      isPartOf: { '@id': 'https://openboxcomm.in/#website' },
      about: { '@id': 'https://openboxcomm.in/#organization' },
      publisher: { '@id': 'https://openboxcomm.in/#organization' },
      datePublished: '2021-01-01',
      dateModified: '2026-07-31',
      inLanguage: 'en-IN',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://openboxcomm.in/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is OpenBox?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OpenBox is a free multi-server Discord community platform for developers, gamers, and students in India. It offers specialized servers for coding collaboration, gaming sessions, and study groups.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to join OpenBox?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can join OpenBox by visiting openboxcomm.in/join or choosing a server from our directory. Click any server invite link to connect with our Discord community instantly.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is OpenBox free to join?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, OpenBox is 100% free to join with no subscription fees, hidden charges, or gatekeeping for developers, gamers, and students.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is OpenBox for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OpenBox is built for developers, coders, gamers, students, and tech enthusiasts in India looking to collaborate, play together, and grow their skills.',
          },
        },
      ],
    },
  ],
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImportantNoticeMarquee />

      {/* Hero Section */}
      <section id="herosection" className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(244,114,182,0.1),transparent_30%),linear-gradient(135deg,rgba(255,255,255,1),rgba(245,245,250,1))] dark:hidden" />
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(244,114,182,0.16),transparent_30%),linear-gradient(135deg,rgba(17,17,17,0.2),rgba(10,10,10,1))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col max-w-4xl">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-cyan-500" />
              Pick Your World.
            </div>

            <h1 className="max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              Open Box: Free Discord Community for Developers & Gamers in India
            </h1>
            <p className="mt-3 text-xl font-bold text-cyan-600 dark:text-cyan-400">
              Open Doors. Pick Yours.
            </p>

            {/* AEO/GEO Key Takeaway & Summary Box */}
            <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6 backdrop-blur-sm dark:bg-cyan-950/20" aria-label="At a Glance">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
                <Sparkles className="h-4 w-4" />
                At a Glance / Key Takeaways
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                <strong>Open Box</strong> is India's premier 100% free, multi-server Discord platform designed specifically for <strong>developers, gamers, and students</strong>. It provides specialized server hubs for real-time coding collaboration, competitive/casual gaming (LFG), and peer-to-peer study sessions with zero paywalls or gatekeeping. Join 5,000+ members to build open-source projects, team up for tournaments, and accelerate your tech career.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/join">Join the Community</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/servers">
                  Explore Servers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Real Experience Signals & Metrics */}
            {/* <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 border-t border-border/70 pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/10 p-2.5 text-cyan-600 dark:text-cyan-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-foreground">5,000+</div>
                  <div className="text-xs text-muted-foreground">Active Members</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-pink-500/10 p-2.5 text-pink-600 dark:text-pink-400">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-foreground">6</div>
                  <div className="text-xs text-muted-foreground">Specialized Servers</div>
                </div>
              </div>
              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="rounded-lg bg-amber-500/10 p-2.5 text-amber-600 dark:text-amber-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-foreground">50+</div>
                  <div className="text-xs text-muted-foreground">Community Events</div>
                </div>
              </div>
            </div> */}

            {/* Freshness Signal */}
            {/* <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-emerald-500" />
              <span>Community updated: July 31, 2026</span>
            </div> */}
          </div>
        </div>
      </section>

      {/* Overview & Feature Pillars (What is OpenBox?) */}
      <section className="border-b border-border bg-surface/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">What is OpenBox?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              OpenBox is a free multi-server Discord community for developers, gamers, and students in India. We bring together passionate builders, competitive gamers, and ambitious learners across dedicated server hubs. Members get access to active project collaboration, gaming voice channels, peer mentorship, and regular community events.
            </p>
          </div>

          {/* Bento Feature Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-background p-6 transition-all hover:border-cyan-500/30">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Tech & Dev Hubs</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Share code, showcase project repos, and get real-time feedback from fellow developers.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 transition-all hover:border-pink-500/30">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-500">
                <Gamepad2 className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Gaming & LFG</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Connect with gamers across India for casual multiplayer sessions, competitive squads, and tournaments.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 transition-all hover:border-purple-500/30">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Study & Skill Growth</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Study in silent voice rooms, exchange learning materials, and boost career progress together.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 transition-all hover:border-emerald-500/30">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">100% Free Access</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Enjoy an inclusive community space with zero membership fees, paywalls, or gatekeeping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Flow (How to join OpenBox?) */}
      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">How to join OpenBox?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Joining OpenBox is simple, free, and takes less than a minute. Explore our server directory below, choose the community hub that matches your interests, and click the invite link to join our Discord server. Once inside, introduce yourself in the welcome channel and start chatting with fellow members right away.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="relative rounded-xl border border-border bg-surface p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500 font-extrabold text-sm">
                <Compass className="h-5 w-5" />
              </div>
              <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">Step 1</div>
              <h3 className="font-bold text-lg text-foreground mb-2">Browse Server Hubs</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Explore our specialized Discord servers tailored for tech, gaming, and study groups.
              </p>
            </div>

            <div className="relative rounded-xl border border-border bg-surface p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/10 text-pink-500 font-extrabold text-sm">
                <UserCheck className="h-5 w-5" />
              </div>
              <div className="text-xs font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wider mb-1">Step 2</div>
              <h3 className="font-bold text-lg text-foreground mb-2">Connect via Discord</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Click any server invite link to join instantly through your existing Discord account.
              </p>
            </div>

            <div className="relative rounded-xl border border-border bg-surface p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 font-extrabold text-sm">
                <MessageSquarePlus className="h-5 w-5" />
              </div>
              <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">Step 3</div>
              <h3 className="font-bold text-lg text-foreground mb-2">Start Engaging</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Introduce yourself in welcome channels, join live voice calls, and collaborate with peers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* First-Hand Experience & Community Proof (GEO Signals) */}
      {/* <section className="border-b border-border bg-background py-16 sm:py-20" id="community-proof">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Community Impact
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              First-Hand Experience & Community Proof
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Open Box isn't just another server directory—it's an active, hands-on ecosystem powered by real developers, gamers, and students across India. Here is a look at our live community activities and verifiable outcomes.
            </p>
          </div>*/}

      {/* Metric Badges */}
      {/* <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-5 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-cyan-600 dark:text-cyan-400">5,000+</div>
          <div className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Indian Members</div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-pink-600 dark:text-pink-400">6 Hubs</div>
          <div className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Specialized Servers</div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400">50+</div>
          <div className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Monthly Live Events</div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">120+</div>
          <div className="mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Open-Source Projects</div>
        </div>
      </div> */}

      {/* Real Experience Pillars */}
      {/* <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface/60 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
          <div>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500 font-bold">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Weekly Live Code Sprints</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every weekend, developers gather in voice channels for 2-hour live pair programming, Git code reviews, and open-source project building. Members receive real feedback on Pull Requests from senior peers.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            ✓ Verified Outcome: 40+ members landed tech internships via peer recommendations.
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/60 p-6 flex flex-col justify-between hover:border-pink-500/40 transition-colors">
          <div>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-500 font-bold">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Daily LFG & Esports Matches</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Looking for a squad? Our instant LFG roles match Valorant, BGMI, and League of Legends players within minutes. We host monthly community tournaments with custom leaderboards.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-pink-600 dark:text-pink-400">
            ✓ Verified Outcome: 1,200+ gaming squads formed with non-toxic moderation.
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/60 p-6 flex flex-col justify-between hover:border-purple-500/40 transition-colors">
          <div>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 font-bold">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">24/7 Silent Study & Resume Teardowns</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Students join screen-share study lounges using Pomodoro timers. Community mentors host monthly resume teardowns and mock technical interview sessions.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-purple-600 dark:text-purple-400">
            ✓ Verified Outcome: 200+ resume reviews completed by industry professionals.
          </div>
        </div>
      </div>
    </div>
      </section >  
}*/}

      {/* Structured Comparison & Decision Support (AEO Table) */}
      {/* <section className="border-b border-border bg-surface/30 py-16 sm:py-20" id="comparison">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Community Decision Support & Feature Comparison
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Compare how Open Box specialized server hubs serve different member profiles and how our structured platform differs from standard Discord servers in India.
            </p>
          </div>*/}

      {/* Table 1: Category Matrix */}
      {/* <div className="mb-12 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            <div className="p-4 bg-muted/40 font-bold text-lg text-foreground border-b border-border">
              Table 1: Open Box Server Category Breakdown
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/70 text-xs uppercase font-semibold text-muted-foreground border-b border-border">
                  <tr>
                    <th scope="col" className="px-6 py-4">Community Category</th>
                    <th scope="col" className="px-6 py-4">Target Audience</th>
                    <th scope="col" className="px-6 py-4">Key Discord Channels & Voice Hubs</th>
                    <th scope="col" className="px-6 py-4">Core Member Benefits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">Developers & Coders</td>
                    <td className="px-6 py-4 text-muted-foreground">Software engineers, web devs, open-source contributors</td>
                    <td className="px-6 py-4 text-muted-foreground">#code-help, #showcase, #pair-programming, voice code-rooms</td>
                    <td className="px-6 py-4 text-muted-foreground">Code reviews, project co-founders, tech career advice</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">Gamers & Esports</td>
                    <td className="px-6 py-4 text-muted-foreground">Casual gamers, competitive squads, streamers</td>
                    <td className="px-6 py-4 text-muted-foreground">#lfg-valorant, #lfg-bgmi, #tournaments, low-latency VC</td>
                    <td className="px-6 py-4 text-muted-foreground">Instant team matchmaking, custom scrims, non-toxic environment</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">Students & Learners</td>
                    <td className="px-6 py-4 text-muted-foreground">College students, self-taught coders, exam aspirants</td>
                    <td className="px-6 py-4 text-muted-foreground">#study-resources, #resume-review, 24/7 silent study VCs</td>
                    <td className="px-6 py-4 text-muted-foreground">Peer study accountability, mock interviews, mentorship</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}

      {/* Table 2: Open Box vs Generic Servers */}
      {/* <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            <div className="p-4 bg-muted/40 font-bold text-lg text-foreground border-b border-border">
              Table 2: Open Box vs. Standard Discord Servers
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/70 text-xs uppercase font-semibold text-muted-foreground border-b border-border">
                  <tr>
                    <th scope="col" className="px-6 py-4">Feature / Criterion</th>
                    <th scope="col" className="px-6 py-4">Standard Discord Servers</th>
                    <th scope="col" className="px-6 py-4 text-cyan-600 dark:text-cyan-400 font-bold">Open Box Community Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">Community Structure</td>
                    <td className="px-6 py-4 text-muted-foreground">Single generic server with cluttered channels</td>
                    <td className="px-6 py-4 font-semibold text-foreground">Multi-server hub ecosystem tailored by interest</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">Access & Cost</td>
                    <td className="px-6 py-4 text-muted-foreground">Often paywalled roles or premium tiers</td>
                    <td className="px-6 py-4 font-semibold text-emerald-600 dark:text-emerald-400">100% Free with zero paywalls or hidden fees</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">Moderation & Safety</td>
                    <td className="px-6 py-4 text-muted-foreground">Inconsistent rules, spam, unmoderated VCs</td>
                    <td className="px-6 py-4 font-semibold text-foreground">Strict safety guidelines, active moderators, inclusive vibe</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">Structured Events</td>
                    <td className="px-6 py-4 text-muted-foreground">Rare or unorganized events</td>
                    <td className="px-6 py-4 font-semibold text-foreground">50+ monthly events (Hackathons, LFG scrims, Study Sprints)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>   */}

      {/* Find Your Fit - Quiz */}
      <Quiz />

      {/* Directory + Search */}
      <DirectorySearch />

      {/* Master Calendar */}
      <MasterCalendar />

      {/* Compact FAQ Section */}
      <section className="border-b border-border bg-surface/30 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-muted-foreground text-base max-w-2xl mx-auto">
              Quick answers to common questions about the OpenBox Discord community in India.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-bold text-lg text-foreground mb-2">What is OpenBox?</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                OpenBox is a free multi-server Discord community platform for developers, gamers, and students in India. It offers specialized servers for coding collaboration, gaming sessions, and study groups.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-bold text-lg text-foreground mb-2">How to join OpenBox?</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                You can join OpenBox by visiting openboxcomm.in/join or choosing a server from our directory. Click any server invite link to connect with our Discord community instantly.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-bold text-lg text-foreground mb-2">Is OpenBox free to join?</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Yes, OpenBox is 100% free to join with no subscription fees, hidden charges, or gatekeeping for developers, gamers, and students.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-bold text-lg text-foreground mb-2">Who is OpenBox for?</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                OpenBox is built for developers, coders, gamers, students, and tech enthusiasts in India looking to collaborate, play together, and grow their skills.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 text-center mt-8">
            <p className='text-foreground'>Didn't find what you were looking for?</p>
            <Link href="/help/faq" className="text-cyan-700 dark:text-cyan-400 hover:underline">Visit our FAQ</Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTASection />
    </div >
  )
}