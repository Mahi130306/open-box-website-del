'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gift,
  Sparkles,
  Crown,
  Trophy,
  Bot,
  Flame,
  CheckCircle2,
  Star,
  ChevronDown,
  Info,
  Check,
  Zap,
  ShieldCheck,
  Heart,
  ExternalLink,
  MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const PATREON_URL = process.env.NEXT_PUBLIC_PATREON_URL || 'https://patreon.com/OpenBoxComm'

// Discord custom SVG icon matching the site footer
const DiscordIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

export default function SupportClient() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)
  const [compareOpen, setCompareOpen] = useState(false)
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null)
  const [syncStep, setSyncStep] = useState(0)

  const tiers = [
    {
      id: 'npc',
      name: 'NPC',
      monthlyPrice: 0.99,
      annualPrice: 9.99,
      icon: Bot,
      description: 'Get in the game. Basic supporter perks and community recognition.',
      perks: ['Supporter badge', 'Early event announcements', 'Includes Discord benefits'],
      badge: 'Entry Tier',
      theme: {
        glow: 'rgba(113, 113, 122, 0.15)',
        accentColor: 'text-zinc-450 dark:text-zinc-500',
        card: 'border-zinc-200 bg-white/70 hover:border-zinc-400 dark:bg-zinc-950/40 dark:border-zinc-800/80 dark:hover:border-zinc-700/80',
        badge: 'bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800',
        button: 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100',
        title: 'text-zinc-900 dark:text-zinc-100',
      }
    },
    {
      id: 'rookie',
      name: 'Rookie',
      monthlyPrice: 1.99,
      annualPrice: 19.99,
      icon: Flame,
      description: 'You are playing for real now. Expanded perks with a 7-day trial.',
      perks: ['Everything in NPC (All 3)', 'Monthly supporter shoutout', 'Members-only behind the scenes'],
      badge: '7-Day Free Trial',
      theme: {
        glow: 'rgba(249, 115, 22, 0.25)',
        accentColor: 'text-orange-500 dark:text-orange-400',
        card: 'border-orange-200 bg-orange-50/20 hover:border-orange-400 dark:bg-orange-950/5 dark:border-orange-500/20 dark:hover:border-orange-500/50',
        badge: 'bg-orange-100/60 text-orange-800 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-500/30',
        button: 'bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-500 dark:text-white',
        title: 'text-orange-850 dark:text-orange-350',
      }
    },
    {
      id: 'goat',
      name: 'GOAT',
      monthlyPrice: 5.99,
      annualPrice: 59.99,
      icon: Trophy,
      description: 'Reserved for the ones who go above and beyond. Exclusive access.',
      perks: [
        'Everything in Rookie (All 5)',
        'Voting rights on community decisions',
        'Direct feedback channel with admins',
        'Early access to OpenBox events',
        'Discount on next membership'
      ],
      badge: 'Most Popular',
      theme: {
        glow: 'rgba(16, 185, 129, 0.35)',
        accentColor: 'text-emerald-500 dark:text-emerald-400',
        card: 'border-emerald-200 bg-emerald-50/20 hover:border-emerald-400 dark:bg-emerald-950/5 dark:border-emerald-500/20 dark:hover:border-emerald-500/50 shadow-md shadow-emerald-500/5',
        badge: 'bg-emerald-100/60 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-350 dark:border-emerald-500/30 font-bold animate-pulse',
        button: 'bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:text-white',
        title: 'text-emerald-850 dark:text-emerald-350',
      }
    },
    {
      id: 'legend',
      name: 'Legend',
      monthlyPrice: 7.99,
      annualPrice: 79.99,
      icon: Crown,
      description: 'The highest tier. You are literally holding OpenBox up.',
      perks: [
        'Everything in GOAT (All 9)',
        'Priority consideration for staff recruitment',
        'Direct line to core team via private channel',
        'Name in OpenBox credits on supporter page*'
      ],
      badge: 'Elite Supporter',
      theme: {
        glow: 'rgba(245, 158, 11, 0.45)',
        accentColor: 'text-amber-500 dark:text-amber-400',
        card: 'border-amber-200 bg-amber-50/20 hover:border-amber-400 dark:bg-amber-950/5 dark:border-amber-500/20 dark:hover:border-amber-500/50',
        badge: 'bg-amber-100/60 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-355 dark:border-amber-500/30',
        button: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-none',
        title: 'text-amber-850 dark:text-amber-355',
      }
    }
  ]

  const phantomPerks = [
    'Everything in Legend (All 13)',
    'Exclusive OP Supporter role — rare, visible on supporter wall',
    '12–16% off paid OB events + priority spot',
    'Monthly voice hangout with OB ',
    'First dibs + discount when OB merch drops',
    'Namedropped in DBW every week*',
  ]

  const faqData = [
    {
      question: 'How do I sync my Discord perks?',
      answer: 'Once you join a tier on Patreon, go to your Patreon account settings, select "Apps", and connect your Discord account. The Patreon bot will automatically sync your roles inside our Discord server within a few minutes!'
    },
    {
      question: 'Can I change or cancel my tier at any time?',
      answer: 'Yes! You can upgrade, downgrade, or cancel your subscription directly through Patreon at any time with no questions asked.'
    },
    {
      question: 'Is there a discount for annual billing?',
      answer: 'Absolutely! Selecting the annual billing option grants you 2 months free (about 16% discount) compared to monthly billing.'
    },
    {
      question: 'Where do my contributions go?',
      answer: 'Your contributions directly fund the essential infrastructure of Open Box. This includes server hosting, custom bot development, domain licensing, game/event servers, and tournament prize pools.'
    },
    {
      question: 'Can I support using local currency or UPI?',
      answer: 'Patreon supports multiple global currencies and payment options (Credit/Debit Card, PayPal, Apple Pay). For local options, Patreon automatically converts rates based on your regional currency.'
    }
  ]

  const metrics = [
    { label: 'Server Infrastructures', value: 55, desc: 'High-availability hosting, web server nodes, DBs, and bot engines' },
    { label: 'Event Prize Pools & Giveaways', value: 25, desc: 'Cash rewards, gaming setups, merchandise, and tournament financing' },
    { label: 'Creative Tools & Doc Development', value: 20, desc: 'Developer compensation, documentation portal, API services, and assets' }
  ]

  const comparisonFeatures = [
    { name: 'Discord Supporter Badge & Role', npc: true, rookie: true, goat: true, legend: true, op: true },
    { name: 'Early Event Announcements', npc: true, rookie: true, goat: true, legend: true, op: true },
    { name: 'Members-Only Behind the Scenes', npc: false, rookie: true, goat: true, legend: true, op: true },
    { name: 'Monthly Supporter Shoutout', npc: false, rookie: true, goat: true, legend: true, op: true },
    { name: 'Voting Rights on Community Decisions', npc: false, rookie: false, goat: true, legend: true, op: true },
    { name: 'Direct Feedback Channel with Admins', npc: false, rookie: false, goat: true, legend: true, op: true },
    { name: 'Early Event Registration Access', npc: false, rookie: false, goat: true, legend: true, op: true },
    { name: 'Priority Consideration for Staff Teams', npc: false, rookie: false, goat: false, legend: true, op: true },
    { name: 'Direct Line to Core ', npc: false, rookie: false, goat: false, legend: true, op: true },
    { name: 'Name on Website Credits Section', npc: false, rookie: false, goat: false, legend: true, op: true },
    { name: 'Exclusive OP Supporter Discord Badge', npc: false, rookie: false, goat: false, legend: false, op: true },
    { name: '12-16% Off All Ticketed OpenBox Events', npc: false, rookie: false, goat: false, legend: false, op: true },
    { name: 'Monthly Face-to-Face Voice Hangout', npc: false, rookie: false, goat: false, legend: false, op: true },
    { name: 'DBW Show Credit Namedropped Weekly', npc: false, rookie: false, goat: false, legend: false, op: true },
  ]

  const wallOfFame = [
    { name: 'Rohith', role: 'Co-Founder ', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', tier: 'Founder' },
    { name: 'Mahi', role: 'Founder', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', tier: 'Founder' },
    { name: 'Zenith', role: 'OP Supporter', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', tier: 'OP Supporter' },
    { name: 'Alex', role: 'Legend Supporter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', tier: 'Legend' },
    { name: 'PixelQueen', role: 'GOAT Supporter', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', tier: 'GOAT' },
    { name: 'NullPointer', role: 'Rookie Supporter', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', tier: 'Rookie' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 font-body">
      {/* ── Background Elements ── */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] rounded-full bg-amber-500/10 blur-[120px] dark:bg-amber-600/15" />
        <div className="absolute top-[20%] right-[-10%] w-[45%] h-[50%] rounded-full bg-purple-500/10 blur-[130px] dark:bg-purple-600/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,hsl(var(--background)))]" />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* ── Hero Banner Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-20 rounded-3xl border overflow-hidden p-8 sm:p-12 lg:p-16
          bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 border-amber-200/50
          dark:from-zinc-950/60 dark:via-zinc-950/30 dark:to-zinc-900/40 dark:border-white/[0.05]
          shadow-2xl shadow-amber-500/[0.02] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md"
      >
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full pointer-events-none opacity-20 filter blur-[100px] bg-gradient-to-br from-amber-500 to-orange-600" />

        <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-amber-200 bg-amber-500/10 dark:border-amber-500/20">
              <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 font-heading">
                Empower the Community
              </p>
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-heading leading-none">
              Support <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 dark:from-yellow-300 dark:via-amber-400 dark:to-orange-400 bg-clip-text text-transparent">Open Box</span>.
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-zinc-650 dark:text-zinc-300 leading-relaxed mb-8">
              Open Box is completely community-run, ad-free, and open to all. Your support keeps the servers fast, events running, and documentation fresh. Choose a tier that works for you.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold rounded-xl shadow-lg shadow-amber-500/20 border-none transition-all duration-200 hover:scale-[1.02]"
              >
                <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">
                  Become a Supporter
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const target = document.getElementById('sync-section')
                  target?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="rounded-xl border-zinc-350 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <DiscordIcon className="h-4 w-4 mr-2" />
                How to Sync Perks
              </Button>
            </div>
          </div>

          {/* Interactive Transparency Budget Chart */}
          {/* <div className="w-full lg:w-[420px] shrink-0">
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-xl dark:border-zinc-800/80 dark:bg-zinc-950/80 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <Info size={16} className="text-amber-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                  Fund Allocation transparency
                </h3>
              </div>
              <p className="text-xs text-zinc-550 dark:text-zinc-400 mb-6">
                We distribute 100% of Patreon funds directly into hosting, developer tools, and tournament cash prizes.
              </p>

              <div className="space-y-5">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{metric.label}</span>
                      <span className="text-sm font-black text-amber-600 dark:text-amber-400">{metric.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      />
                    </div>
                    <p className="text-[10px] text-zinc-450 dark:text-zinc-500 mt-1">
                      {metric.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </motion.div>

      {/* ── Billing Toggle Selector ── */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-heading text-center mb-6">
          Choose Your Supporter Journey
        </h2>

        <div className="inline-flex items-center p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${billingCycle === 'monthly'
              ? 'bg-white text-zinc-950 shadow-md dark:bg-zinc-800 dark:text-white'
              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${billingCycle === 'annual'
              ? 'bg-white text-zinc-950 shadow-md dark:bg-zinc-800 dark:text-white'
              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
          >
            Annual Billing
            <span className="absolute -top-3.5 -right-3.5 bg-amber-500 text-zinc-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
              Save 16%
            </span>
          </button>
        </div>
      </div>

      {/* ── Supporter Tiers Grid ── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {tiers.map((tier) => {
          const Icon = tier.icon
          const price = billingCycle === 'monthly' ? tier.monthlyPrice : tier.annualPrice
          const period = billingCycle === 'monthly' ? '/mo' : '/yr'
          const isHovered = hoveredTier === tier.id

          return (
            <motion.div
              key={tier.id}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative overflow-hidden rounded-3xl border p-6 flex flex-col justify-between h-full transition-all duration-300 backdrop-blur-md ${tier.theme.card}`}
            >
              {/* Dynamic Gradient Radial Glow Orb */}
              <div
                className="absolute -right-16 -top-16 w-36 h-36 rounded-full pointer-events-none transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle, ${tier.theme.glow} 0%, transparent 70%)`,
                  opacity: isHovered ? 1 : 0.4
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                    <Icon className={`h-6 w-6 ${tier.theme.accentColor}`} />
                  </div>
                  {tier.badge && (
                    <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-wider ${tier.theme.badge}`}>
                      {tier.badge}
                    </Badge>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className={`text-2xl font-black font-heading ${tier.theme.title}`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-2.5">
                    <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">${price}</span>
                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{period}</span>
                  </div>
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-2 min-h-[38px] leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="w-full h-px bg-zinc-200/80 dark:bg-zinc-800/50 my-5" />

                <ul className="space-y-3.5 mb-8">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-650 dark:text-zinc-350">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${tier.theme.accentColor}`} />
                      <span className="leading-tight">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <Button
                  asChild
                  className={`w-full py-5 rounded-2xl font-extrabold text-xs transition-all duration-300 hover:scale-[1.01] ${tier.theme.button}`}
                >
                  <a href={PATREON_URL} target="_blank" rel="noopener noreferrer">
                    Get {tier.name} Perks
                  </a>
                </Button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── OP SUPPORTER (Phantom / Rare Tier) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl p-[1px] bg-gradient-to-r from-purple-500/30 via-violet-500/20 to-indigo-500/30 dark:from-purple-500/60 dark:via-violet-600/30 dark:to-indigo-500/40 shadow-xl shadow-purple-500/[0.03] dark:shadow-[0_0_50px_-5px_rgba(139,92,246,0.25)] mb-20 overflow-hidden"
      >
        <div className="rounded-[23px] bg-gradient-to-br from-purple-50/40 via-violet-50/10 to-indigo-50/30 dark:from-[#080512] dark:via-[#0c0818] dark:to-[#05030c] p-6 sm:p-8 lg:p-10 relative overflow-hidden backdrop-blur-md">
          {/* Ambient Glows */}
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full pointer-events-none opacity-20 filter blur-3xl bg-purple-500 dark:bg-purple-600" />
          <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full pointer-events-none opacity-10 filter blur-3xl bg-indigo-500 dark:bg-indigo-600" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_auto_1.8fr] gap-8 items-center">
            {/* Info Section */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/30 dark:bg-purple-950/40 dark:border-purple-500/40 shadow-md">
                    <Zap size={24} className="text-purple-600 dark:text-purple-400 animate-bounce" />
                  </div>
                  <Badge className="bg-purple-600/15 text-purple-700 border-purple-400/50 dark:bg-gradient-to-r dark:from-purple-500/30 dark:to-indigo-500/30 dark:text-purple-300 dark:border-purple-500/50 font-black tracking-widest text-[9px] hover:bg-purple-600/25">
                    RARE SPECIAL
                  </Badge>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-purple-800 via-violet-700 to-indigo-800 dark:from-white dark:via-purple-250 dark:to-indigo-400 bg-clip-text text-transparent font-heading">
                  OP SUPPORTER
                </h3>
                <p className="text-[10px] font-black tracking-wider text-purple-600/80 dark:text-purple-400/80 uppercase mb-5">
                  Exclusive premium tier for real fans
                </p>

                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-5xl font-extrabold text-zinc-950 dark:text-white">
                    ${billingCycle === 'monthly' ? 9.99 : 99.99}
                  </span>
                  <span className="text-xs font-semibold text-purple-600/70 dark:text-purple-400/60">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-550 dark:text-zinc-400 max-w-sm leading-relaxed">
                This tier is still not available. We are working on it.
              </p>
            </div>

            {/* Custom Divider */}
            <div className="hidden lg:block w-px h-64 bg-gradient-to-b from-transparent via-purple-300 dark:via-purple-500/20 to-transparent" />

            {/* Perks & CTA Section */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-[10px] font-black tracking-widest text-purple-600/80 dark:text-purple-400/80 uppercase mb-4 font-heading">
                  What you receive
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-8">
                  {phantomPerks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ShieldCheck size={16} className="text-purple-500 dark:text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-white-700 dark:text-white-350 leading-normal">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Button
                  asChild
                  className="w-full sm:w-auto px-8 py-6 rounded-2xl text-sm font-extrabold bg-purple-600 text-white dark:bg-purple-500 dark:text-zinc-950 shadow-lg shadow-purple-500/20 hover:opacity-95 transition-all hover:scale-[1.01] border-none"
                >
                  <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 justify-center">
                    Notify when available
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Interactive Compare Toggle Matrix ── */}
      <div className="flex flex-col items-center mb-20">
        <Button
          variant="outline"
          onClick={() => setCompareOpen(!compareOpen)}
          className="group rounded-2xl border-zinc-250 bg-white shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/50 px-6 py-5 font-bold transition-all text-xs"
        >
          Compare All Features
          <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${compareOpen ? 'rotate-180' : ''}`} />
        </Button>

        <AnimatePresence>
          {compareOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl mt-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md shadow-2xl"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px] text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                      <th className="p-4 font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">Features</th>
                      <th className="p-4 font-black text-zinc-700 dark:text-zinc-300 text-center">NPC</th>
                      <th className="p-4 font-black text-orange-600 dark:text-orange-400 text-center">Rookie</th>
                      <th className="p-4 font-black text-emerald-600 dark:text-emerald-400 text-center">GOAT</th>
                      <th className="p-4 font-black text-amber-600 dark:text-amber-400 text-center">Legend</th>
                      <th className="p-4 font-black text-purple-600 dark:text-purple-400 text-center">OP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feat, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-zinc-100 dark:border-zinc-800/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20"
                      >
                        <td className="p-4 font-bold text-zinc-800 dark:text-zinc-200">{feat.name}</td>
                        <td className="p-4 text-center">
                          {feat.npc ? <Check className="mx-auto h-4 w-4 text-zinc-500" /> : <span className="text-zinc-300 dark:text-zinc-700">—</span>}
                        </td>
                        <td className="p-4 text-center">
                          {feat.rookie ? <Check className="mx-auto h-4 w-4 text-orange-500" /> : <span className="text-zinc-300 dark:text-zinc-700">—</span>}
                        </td>
                        <td className="p-4 text-center">
                          {feat.goat ? <Check className="mx-auto h-4 w-4 text-emerald-500" /> : <span className="text-zinc-300 dark:text-zinc-700">—</span>}
                        </td>
                        <td className="p-4 text-center">
                          {feat.legend ? <Check className="mx-auto h-4 w-4 text-amber-500" /> : <span className="text-zinc-300 dark:text-zinc-700">—</span>}
                        </td>
                        <td className="p-4 text-center">
                          {feat.op ? <Check className="mx-auto h-4 w-4 text-purple-500" /> : <span className="text-zinc-300 dark:text-zinc-700">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Patreon & Discord Sync Guide Section ── */}
      <section id="sync-section" className="mb-20">
        <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/20 p-8 sm:p-12 overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none opacity-10 bg-indigo-500 filter blur-3xl rounded-full" />

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-extrabold text-[10px] uppercase tracking-wider font-heading">
                Step-by-Step Setup
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-heading mb-4">
                Instant Discord Synchronization
              </h2>
              <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed mb-6">
                Your supporter role is synchronized instantly with Discord using our automated Patreon linking system. No manual request needed.
              </p>

              <div className="grid gap-4">
                {[
                  { title: '1. Select Your Tier on Patreon', desc: 'Click "Become a Supporter" or head to Patreon to secure your tier.' },
                  { title: '2. Connect Discord to Patreon', desc: 'Visit Patreon Profile settings > Connected Apps and authorize Discord.' },
                  { title: '3. Unlock Roles Automatically', desc: 'Our sync engine verifies your support status and updates your server permissions.' }
                ].map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSyncStep(idx)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${syncStep === idx
                      ? 'border-indigo-450 bg-white dark:border-indigo-500/40 dark:bg-zinc-900/50 shadow-md'
                      : 'border-transparent hover:bg-white/40 dark:hover:bg-zinc-900/20'
                      }`}
                  >
                    <h3 className={`text-sm font-bold ${syncStep === idx ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-800 dark:text-zinc-200'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Diagram Representation */}
            <div className="w-full lg:w-[380px] flex justify-center items-center">
              <div className="relative w-full aspect-square max-w-[300px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-3xl p-6 flex flex-col justify-around items-center shadow-xl">
                <div className="flex justify-between items-center w-full relative">
                  {/* Connecting lines */}
                  <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-orange-500 via-indigo-500 to-purple-600 -translate-y-1/2 -z-10" />

                  {/* Patreon Logo Ball */}
                  <div className="h-14 w-14 rounded-full bg-orange-100 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-500/30 flex items-center justify-center shadow-lg relative">
                    <span className="text-orange-600 font-extrabold text-lg select-none">P</span>
                    <div className="absolute -bottom-6 text-[9px] font-bold text-zinc-500">Patreon</div>
                  </div>

                  {/* Flow arrow */}
                  <div className="flex flex-col items-center">
                    <div className="text-[10px] font-black text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
                      Auto
                    </div>
                    <Zap className="h-4 w-4 text-indigo-500 animate-pulse" />
                  </div>

                  {/* Discord Logo Ball */}
                  <div className="h-14 w-14 rounded-full bg-indigo-100 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center shadow-lg relative">
                    <DiscordIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <div className="absolute -bottom-6 text-[9px] font-bold text-zinc-500">Discord</div>
                  </div>
                </div>

                <div className="w-full text-center border-t border-zinc-100 dark:border-zinc-800/80 pt-4 mt-6">
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    Secure Integration Sync
                  </h4>
                  <p className="text-[10px] text-zinc-450 dark:text-zinc-500 mt-1 leading-relaxed">
                    Uses Patreon OAuth 2.0 API. We do not store credit card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Supporter Wall of Fame ── */}
      <section className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 mb-3 border border-amber-500/20">
            <Heart size={18} className="fill-amber-500 text-amber-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-heading">
            Our Wall of Fame
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
            A massive thank you to the awesome contributors keeping our community vibrant and operating.
          </p>
        </div>

        {/* <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {wallOfFame.map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.03 }}
              className="p-5 rounded-2xl border border-zinc-200/80 bg-white/50 text-center hover:border-amber-400 transition-all dark:border-zinc-800/80 dark:bg-zinc-950/20 backdrop-blur-md"
            >
              <div className="relative h-16 w-16 mx-auto mb-4 overflow-hidden rounded-full border-2 border-zinc-200 dark:border-zinc-800">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="object-cover h-full w-full"
                />
              </div>
              <h3 className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200 truncate">{member.name}</h3>
              <p className="text-[10px] text-zinc-450 dark:text-zinc-500 truncate mt-0.5">{member.role}</p>

              <Badge
                variant="outline"
                className={`mt-3 rounded-full text-[9px] font-black uppercase tracking-wider py-0.5 ${
                  member.tier === 'Founder' || member.tier === 'Core'
                    ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-500/30'
                    : member.tier === 'OP Supporter'
                    ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-500/30'
                    : member.tier === 'Legend'
                    ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-450 dark:border-amber-500/30'
                    : 'bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-850'
                }`}
              >
                {member.tier}
              </Badge>
            </motion.div>
          ))}
        </div> */}
      </section>

      {/* ── FAQ Section ── */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-heading text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = activeFAQ === idx

            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/20 backdrop-blur-md overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFAQ(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-sm text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <MessageSquare size={16} className="text-amber-500 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="text-center text-[10px] text-zinc-450 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-900 pt-8 mt-16 max-w-3xl mx-auto">
        * Discord role sync is automatic. Supporter benefits do not exempt members from server rules and moderation actions. Terms apply.
      </div>
    </div>
  )
}
