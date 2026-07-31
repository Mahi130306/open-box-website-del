'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Calendar,
  CalendarClock,
  HeartHandshake,
  MapPin,
  Ticket,
  Wifi,
  Globe,
  Zap,
  Users,
  Filter,
} from 'lucide-react'
import { events, type Event, type Sponsor } from '@/lib/community-data'

const serverFilters = ['All', 'Jn.', 'Dev', 'GG']
const typeFilters = ['all', 'online', 'offline']

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function getEventSupporters(event: Event) {
  return event.sponsors ?? (event.sponsor ? [event.sponsor] : [])
}

function getShortDate(dateStr: string) {
  const date = new Date(dateStr)
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: date.toLocaleDateString('en-US', { day: '2-digit' }),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
  }
}

function getSupportStripText(sponsors: Sponsor[]) {
  const sponsorCount = sponsors.filter((s) => (s.type ?? 'sponsor') === 'sponsor').length
  const partnerCount = sponsors.filter((s) => s.type === 'partner').length
  if (sponsorCount > 0 && partnerCount > 0) return 'Sponsored & Partnered'
  if (partnerCount > 1) return 'Partnered'
  if (partnerCount === 1)
    return (
      sponsors.find((s) => s.type === 'partner')?.tagline ??
      `In partnership with ${sponsors.find((s) => s.type === 'partner')?.name}`
    )
  if (sponsorCount > 1) return 'Sponsored'
  return sponsors[0].tagline ?? `Sponsored by ${sponsors[0].name}`
}

function getServerAccent(server: string): string {
  switch (server) {
    case 'Dev': return 'from-emerald-500 to-green-400'
    case 'GG': return 'from-rose-500 to-red-400'
    case 'Jn.': return 'from-amber-400 to-rose-400'
    default: return 'from-cyan-500 to-blue-500'
  }
}

function getServerShadow(server: string): string {
  switch (server) {
    case 'Dev': return 'hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20'
    case 'GG': return 'hover:shadow-rose-500/10 dark:hover:shadow-rose-500/20'
    case 'Jn.': return 'hover:shadow-amber-400/10 dark:hover:shadow-amber-400/20'
    default: return 'hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/20'
  }
}

export default function EventsPage() {
  const [filterServer, setFilterServer] = useState('All')
  const [filterType, setFilterType] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [mounted, setMounted] = useState(false)

  // Calendar states
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  useEffect(() => setMounted(true), [])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesServer = filterServer === 'All' || event.server === filterServer
      const matchesType =
        filterType === 'all' ||
        (filterType === 'online' && !event.isOffline) ||
        (filterType === 'offline' && event.isOffline)
      return matchesServer && matchesType
    })
  }, [filterServer, filterType])

  // Smart date initialization: default calendar to show month of first event in the filtered list
  const initialDate = useMemo(() => {
    if (filteredEvents.length > 0) {
      const sorted = [...filteredEvents].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      return new Date(sorted[0].date)
    }
    return null
  }, [filteredEvents])

  useEffect(() => {
    if (initialDate) {
      setCurrentMonth(initialDate.getMonth())
      setCurrentYear(initialDate.getFullYear())
    }
  }, [initialDate])

  // Select the first day with events automatically when month/year or filteredEvents changes
  useEffect(() => {
    const daysWithEvents = filteredEvents
      .filter((e) => {
        const d = new Date(e.date)
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear
      })
      .map((e) => new Date(e.date).getDate())

    if (daysWithEvents.length > 0) {
      setSelectedDay(daysWithEvents[0])
    } else {
      setSelectedDay(null)
    }
  }, [currentMonth, currentYear, filteredEvents])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit',
    })

  const totalEvents = events.length
  const onlineEvents = events.filter((e) => !e.isOffline).length
  const offlineEvents = events.filter((e) => e.isOffline).length

  // Calendar navigation helpers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((prev) => prev - 1)
    } else {
      setCurrentMonth((prev) => prev - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((prev) => prev + 1)
    } else {
      setCurrentMonth((prev) => prev + 1)
    }
  }

  const getEventsForDay = (day: number) => {
    return filteredEvents.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      )
    })
  }

  // Monthly Days calculation
  const calendarCells = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate()

    const cells = []

    // Prev month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      cells.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        monthOffset: -1
      })
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        day: d,
        isCurrentMonth: true,
        monthOffset: 0
      })
    }

    // Next month days to pad to multiple of 7
    const totalCells = Math.ceil(cells.length / 7) * 7
    const nextDaysCount = totalCells - cells.length
    for (let d = 1; d <= nextDaysCount; d++) {
      cells.push({
        day: d,
        isCurrentMonth: false,
        monthOffset: 1
      })
    }

    return cells
  }, [currentMonth, currentYear])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient glows - visible in dark, very subtle in light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[120px] dark:bg-cyan-500/8" />
        <div className="absolute top-60 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/4 blur-[100px] dark:bg-violet-500/6" />
        <div className="absolute -bottom-20 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/4 blur-[120px] dark:bg-emerald-500/6" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          {/* Label pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/8 px-4 py-1.5">
            <Calendar className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
              Community Calendar
            </span>
          </div>

          <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
            Events
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Workshops, tournaments, build nights, and community gatherings across all Open Box servers. Real humans, real fun.
          </p>

          {/* Stats row */}
          {totalEvents > 0 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: Zap, label: `${totalEvents} events`, sub: 'scheduled' },
                { icon: Wifi, label: `${onlineEvents} online`, sub: 'from anywhere' },
                { icon: Globe, label: `${offlineEvents} offline`, sub: 'in person' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/40 px-4 py-2.5"
                >
                  <stat.icon className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-foreground">{stat.label}</p>
                    <p className="text-[11px] text-muted-foreground">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Filters and View Toggle ─────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-border/60 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground/50" />
              <div className="flex flex-wrap gap-2">
                {serverFilters.map((server) => (
                  <button
                    key={server}
                    onClick={() => setFilterServer(server)}
                    className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 min-h-[44px] ${filterServer === server
                      ? 'bg-foreground text-background shadow-sm'
                      : 'border border-border bg-muted/40 text-muted-foreground hover:border-border/80 hover:bg-muted/70 hover:text-foreground'
                      }`}
                  >
                    {server}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {typeFilters.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold capitalize transition-all duration-200 min-h-[44px] ${filterType === type
                    ? 'bg-foreground text-background shadow-sm'
                    : 'border border-border bg-muted/40 text-muted-foreground hover:border-border/80 hover:bg-muted/70 hover:text-foreground'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex bg-muted/40 p-1 rounded-xl border border-border self-start lg:self-auto">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 min-h-[44px] ${viewMode === 'list'
                ? 'bg-foreground text-background shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 min-h-[44px] ${viewMode === 'calendar'
                ? 'bg-foreground text-background shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <Calendar className="h-4 w-4" />
              Calendar View
            </button>
          </div>
        </div>

        {/* Result count */}
        <p className="mb-6 text-sm text-muted-foreground/60">
          {filteredEvents.length === 0
            ? 'No events match'
            : `${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`}
        </p>

        {/* ── Content Panes ───────────────────────────────────────────── */}
        {viewMode === 'list' ? (
          /* List View */
          filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/20 py-24 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/40">
                <CalendarClock className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground/70">Coming soon</h2>
              <p className="max-w-sm text-sm text-muted-foreground">
                No events match this filter yet. New sessions will appear here once the calendar is updated.{' '}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event, index) => {
                const supporters = getEventSupporters(event)
                const dateBadge = getShortDate(event.date)
                const accent = getServerAccent(event.server)
                const shadowClass = getServerShadow(event.server)

                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${shadowClass} animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both`}
                    style={{ animationDelay: `${80 + index * 50}ms` }}
                  >
                    {/* Top gradient accent bar */}
                    <div
                      className={`h-0.5 w-full bg-gradient-to-r ${accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                    />

                    {/* Top strip - always rendered for visual consistency */}
                    <div className="flex items-center gap-3 border-b border-border px-5 py-3">
                      {supporters.length > 0 ? (
                        <>
                          <div className="flex shrink-0 -space-x-1.5">
                            {supporters.slice(0, 3).map((s) => (
                              <span
                                key={s.name}
                                className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background"
                                title={s.name}
                              >
                                <span className="relative h-3.5 w-3.5 shrink-0 block">
                                  <Image
                                    src={s.logo}
                                    alt={s.name}
                                    fill
                                    sizes="14px"
                                    className="object-contain grayscale transition-all group-hover:grayscale-0"
                                  />
                                </span>
                              </span>
                            ))}
                          </div>
                          <HeartHandshake className="h-3.5 w-3.5 shrink-0 text-yellow-500 dark:text-yellow-400" />
                          <p className="min-w-0 truncate text-xs text-muted-foreground">
                            {getSupportStripText(supporters)}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-muted-foreground/40">Community Event</p>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      {/* Date + Title */}
                      <div className="mb-4 flex items-start gap-4">
                        {/* Calendar widget */}
                        <div className="flex shrink-0 flex-col items-center overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                          <div className={`w-full bg-gradient-to-r ${accent} px-3 py-0.5 text-center`}>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-black/70">
                              {dateBadge.month}
                            </span>
                          </div>
                          <div className="px-4 py-2 text-center">
                            <span className="block text-2xl font-extrabold leading-none text-foreground">
                              {dateBadge.day}
                            </span>
                            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                              {dateBadge.weekday}
                            </span>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h2 className="mb-1 text-lg font-bold leading-tight text-foreground">
                            {event.name}
                          </h2>
                          <p className="text-xs text-muted-foreground">
                            {mounted ? formatDate(event.date) : <span className="opacity-0">–</span>}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>

                      {/* Meta */}
                      <div className="mt-auto space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                          <Ticket className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            {event.ticketStatus === 'free' ? 'Free to join' : `Paid · ${event.price}`}
                          </span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                            {event.server}
                          </span>
                          <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                            {event.isOffline ? 'Offline' : 'Online'}
                          </span>
                          {event.ticketStatus === 'free' && (
                            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                              Free
                            </span>
                          )}
                        </div>
                        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-muted-foreground transition-all group-hover:gap-1.5 group-hover:text-foreground">
                          Details
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )
        ) : (
          /* Calendar View */
          <div className="space-y-6">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-6 bg-card p-4 rounded-2xl border border-border">
              <button
                onClick={handlePrevMonth}
                className="flex items-center justify-center p-2 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all duration-200 min-h-[44px] min-w-[44px]"
                aria-label="Previous Month"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={handleNextMonth}
                className="flex items-center justify-center p-2 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all duration-200 min-h-[44px] min-w-[44px]"
                aria-label="Next Month"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="py-2">{d}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 bg-muted/20 p-2 sm:p-4 rounded-3xl border border-border">
              {calendarCells.map((cell, idx) => {
                const isCurrent = cell.isCurrentMonth
                const dayNum = cell.day
                const cellEvents = isCurrent ? getEventsForDay(dayNum) : []
                const hasEvents = cellEvents.length > 0

                const isToday =
                  new Date().getDate() === dayNum &&
                  new Date().getMonth() === currentMonth &&
                  new Date().getFullYear() === currentYear &&
                  isCurrent

                const isSelected = selectedDay === dayNum && isCurrent

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isCurrent) {
                        setSelectedDay(dayNum)
                      } else {
                        // Handle clicking adjacent month days to navigate directly
                        if (cell.monthOffset === -1) {
                          handlePrevMonth()
                          setSelectedDay(dayNum)
                        } else if (cell.monthOffset === 1) {
                          handleNextMonth()
                          setSelectedDay(dayNum)
                        }
                      }
                    }}
                    className={`group relative flex flex-col min-h-[70px] sm:min-h-[100px] p-1.5 sm:p-2.5 rounded-2xl border transition-all duration-200 text-left ${isCurrent
                        ? isSelected
                          ? 'bg-muted/80 border-cyan-500'
                          : 'bg-card border-border hover:border-muted-foreground/30'
                        : 'bg-muted/10 border-border/30 text-muted-foreground/40'
                      } ${isToday ? 'ring-2 ring-cyan-500' : ''}`}
                  >
                    <span className={`text-xs sm:text-sm font-bold ${isToday
                        ? 'bg-cyan-500 text-white rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-extrabold'
                        : isCurrent
                          ? isSelected
                            ? 'text-cyan-600 dark:text-cyan-400 font-extrabold'
                            : 'text-foreground'
                          : 'text-muted-foreground/30'
                      }`}>
                      {dayNum}
                    </span>

                    {/* Dots for Mobile, Event bars for Desktop */}
                    <div className="mt-1 sm:mt-2 w-full flex-1 flex flex-col justify-end">
                      {hasEvents && (
                        <>
                          {/* Dots on mobile */}
                          <div className="flex sm:hidden flex-wrap gap-0.5 mt-auto">
                            {cellEvents.map((ev) => (
                              <span
                                key={ev.id}
                                className={`h-1.5 w-1.5 rounded-full ${ev.server === 'Dev' ? 'bg-emerald-500' :
                                    ev.server === 'GG' ? 'bg-rose-500' :
                                      'bg-zinc-500 dark:bg-zinc-300'
                                  }`}
                              />
                            ))}
                          </div>

                          {/* Labels on desktop */}
                          <div className="hidden sm:flex flex-col gap-1 w-full mt-1">
                            {cellEvents.map((ev) => (
                              <span
                                key={ev.id}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold truncate block border ${ev.server === 'Dev' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' :
                                    ev.server === 'GG' ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400' :
                                      'bg-zinc-500/10 border-zinc-500/30 text-zinc-700 dark:text-zinc-300'
                                  }`}
                                title={ev.name}
                              >
                                {ev.name}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Selected Day's Events List */}
            {selectedDay !== null && (
              <div className="mt-8 border border-border bg-card p-6 rounded-3xl animate-in fade-in duration-300">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-cyan-500" />
                  Events on {MONTH_NAMES[currentMonth]} {selectedDay}, {currentYear}
                </h3>

                {getEventsForDay(selectedDay).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events scheduled for this day.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {getEventsForDay(selectedDay).map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.id}`}
                        className="flex items-center justify-between p-4 rounded-2xl border border-border hover:border-cyan-500/40 bg-muted/20 transition-all duration-200 min-h-[44px]"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <h4 className="font-bold text-sm truncate text-foreground">{event.name}</h4>
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${event.server === 'Dev' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                                event.server === 'GG' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                                  'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300'
                              }`}>
                              {event.server}
                            </span>
                            <span>{formatDate(event.date)}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
                          View
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <div className="mt-20 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-muted-foreground/60">
            <Users className="h-4 w-4" />
            <span className="text-sm">Have an event idea?</span>
          </div>
          <Link
            href="/help#suggestion-box"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:bg-muted/70 hover:text-foreground"
          >
            Suggest an event
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}