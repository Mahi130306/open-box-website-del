'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Calendar as CalendarIcon,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Filter,
  Globe,
  HeartHandshake,
  LayoutGrid,
  List,
  MapPin,
  Sparkles,
  Ticket,
  Users,
  Wifi,
  Zap,
} from 'lucide-react'
import { events, type Event, type Sponsor } from '@/lib/community-data'

const serverFilters = ['All', 'Jn.', 'Dev', 'GG']
const typeFilters = ['all', 'online', 'offline']

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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
    case 'Dev':
      return 'from-emerald-500 to-teal-400'
    case 'GG':
      return 'from-rose-500 to-red-400'
    case 'Jn.':
      return 'from-amber-400 to-rose-400'
    default:
      return 'from-cyan-500 to-blue-500'
  }
}

function getServerBadgeClass(server: string): string {
  switch (server) {
    case 'Dev':
      return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
    case 'GG':
      return 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
    case 'Jn.':
      return 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
    default:
      return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
  }
}

function getServerShadow(server: string): string {
  switch (server) {
    case 'Dev':
      return 'hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20'
    case 'GG':
      return 'hover:shadow-rose-500/10 dark:hover:shadow-rose-500/20'
    case 'Jn.':
      return 'hover:shadow-amber-400/10 dark:hover:shadow-amber-400/20'
    default:
      return 'hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/20'
  }
}

export default function EventsPage() {
  const [filterServer, setFilterServer] = useState('All')
  const [filterType, setFilterType] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [mounted, setMounted] = useState(false)

  // Calendar states
  const today = useMemo(() => new Date(), [])
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
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
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
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

  const handleResetToToday = () => {
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
    setSelectedDay(today.getDate())
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
        monthOffset: -1,
      })
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        day: d,
        isCurrentMonth: true,
        monthOffset: 0,
      })
    }

    // Next month days to pad to multiple of 7
    const totalCells = Math.ceil(cells.length / 7) * 7
    const nextDaysCount = totalCells - cells.length
    for (let d = 1; d <= nextDaysCount; d++) {
      cells.push({
        day: d,
        isCurrentMonth: false,
        monthOffset: 1,
      })
    }

    return cells
  }, [currentMonth, currentYear])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[120px] dark:bg-cyan-500/8" />
        <div className="absolute top-60 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/4 blur-[100px] dark:bg-violet-500/6" />
        <div className="absolute -bottom-20 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/4 blur-[120px] dark:bg-emerald-500/6" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* ── Hero Section ───────────────────────────────────────────── */}
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-cyan-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              OpenBox Events & Gatherings
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Community Calendar
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Workshops, gaming sessions, build labs, and community hangouts across all OpenBox servers.
          </p>

          {/* Stats Bar */}
          {totalEvents > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {[
                { icon: Zap, label: `${totalEvents} Events`, sub: 'Scheduled' },
                { icon: Wifi, label: `${onlineEvents} Online`, sub: 'Virtual Calls' },
                { icon: Globe, label: `${offlineEvents} Offline`, sub: 'In Person' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 shadow-sm"
                >
                  <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-600 dark:text-cyan-400">
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-foreground">{stat.label}</p>
                    <p className="text-[11px] text-muted-foreground">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Controls, Filters & Mode Switcher ─────────────────────── */}
        <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Server & Type Filter Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Server:</span>
              <div className="flex flex-wrap gap-1.5">
                {serverFilters.map((server) => (
                  <button
                    key={server}
                    onClick={() => setFilterServer(server)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all min-h-[36px] ${
                      filterServer === server
                        ? 'bg-foreground text-background shadow-sm'
                        : 'border border-border bg-background text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    }`}
                  >
                    {server}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Format:</span>
              <div className="flex flex-wrap gap-1.5">
                {typeFilters.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all min-h-[36px] ${
                      filterType === type
                        ? 'bg-foreground text-background shadow-sm'
                        : 'border border-border bg-background text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 rounded-xl border border-border bg-background p-1 self-stretch sm:self-auto justify-stretch">
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all min-h-[38px] ${
                viewMode === 'list'
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List className="h-4 w-4" />
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all min-h-[38px] ${
                viewMode === 'calendar'
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <CalendarIcon className="h-4 w-4" />
              Calendar View
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing <strong className="text-foreground">{filteredEvents.length}</strong> {filteredEvents.length === 1 ? 'event' : 'events'}
          </span>
          {filterServer !== 'All' || filterType !== 'all' ? (
            <button
              onClick={() => {
                setFilterServer('All')
                setFilterType('all')
              }}
              className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
            >
              Reset filters
            </button>
          ) : null}
        </div>

        {/* ── Main View Container ────────────────────────────────────── */}
        {viewMode === 'list' ? (
          /* ========================================================= */
          /* LIST VIEW                                                 */
          /* ========================================================= */
          filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background">
                <CalendarClock className="h-7 w-7 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-foreground">No events found</h2>
              <p className="max-w-sm text-xs text-muted-foreground">
                No scheduled events match your selected filters. Try switching filters or check back later!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event, index) => {
                const supporters = getEventSupporters(event)
                const dateBadge = getShortDate(event.date)
                const accent = getServerAccent(event.server)
                const shadowClass = getServerShadow(event.server)

                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${shadowClass}`}
                  >
                    {/* Top gradient accent line */}
                    <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />

                    {/* Supporter Header Strip */}
                    <div className="flex items-center gap-2.5 border-b border-border/80 px-5 py-3">
                      {supporters.length > 0 ? (
                        <>
                          <div className="flex shrink-0 -space-x-1.5">
                            {supporters.slice(0, 3).map((s) => (
                              <span
                                key={s.name}
                                className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background shadow-xs"
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
                          <HeartHandshake className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                          <p className="min-w-0 truncate text-xs text-muted-foreground">
                            {getSupportStripText(supporters)}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-muted-foreground/60">Community Event</p>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      {/* Date Widget + Title */}
                      <div className="mb-4 flex items-start gap-4">
                        <div className="flex shrink-0 flex-col items-center overflow-hidden rounded-xl border border-border bg-background shadow-xs">
                          <div className={`w-full bg-gradient-to-r ${accent} px-3 py-0.5 text-center`}>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-black/75">
                              {dateBadge.month}
                            </span>
                          </div>
                          <div className="px-3.5 py-1.5 text-center">
                            <span className="block text-xl font-extrabold leading-none text-foreground">
                              {dateBadge.day}
                            </span>
                            <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                              {dateBadge.weekday}
                            </span>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h2 className="mb-1 text-base font-bold leading-snug text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {event.name}
                          </h2>
                          <p className="text-xs text-muted-foreground">
                            {mounted ? formatDate(event.date) : <span>Loading...</span>}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>

                      {/* Meta Pills */}
                      <div className="mt-auto space-y-2 pt-2 border-t border-border/60">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-cyan-500" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Ticket className="h-3.5 w-3.5 shrink-0 text-cyan-500" />
                          <span>{event.ticketStatus === 'free' ? 'Free to join' : `Paid · ${event.price}`}</span>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-4 flex items-center justify-between gap-2 pt-3">
                        <div className="flex flex-wrap gap-1.5">
                          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${getServerBadgeClass(event.server)}`}>
                            {event.server}
                          </span>
                          <span className="rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {event.isOffline ? 'Offline' : 'Online'}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-foreground">
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
          /* ========================================================= */
          /* CALENDAR VIEW (Responsive Mobile & Wide Screens)           */
          /* ========================================================= */
          <div className="space-y-8">
            {/* Calendar Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
                  aria-label="Next Month"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <h2 className="ml-2 text-lg font-bold text-foreground sm:text-xl">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </h2>
              </div>

              <button
                onClick={handleResetToToday}
                className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all min-h-[38px]"
              >
                Go to Today
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground sm:gap-2">
              {DAYS_OF_WEEK.map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Monthly Days Grid */}
            <div className="grid grid-cols-7 gap-1 rounded-2xl border border-border bg-surface p-2 sm:gap-2 sm:p-4 shadow-sm">
              {calendarCells.map((cell, idx) => {
                const isCurrent = cell.isCurrentMonth
                const dayNum = cell.day
                const cellEvents = isCurrent ? getEventsForDay(dayNum) : []
                const hasEvents = cellEvents.length > 0

                const isToday =
                  today.getDate() === dayNum &&
                  today.getMonth() === currentMonth &&
                  today.getFullYear() === currentYear &&
                  isCurrent

                const isSelected = selectedDay === dayNum && isCurrent

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isCurrent) {
                        setSelectedDay(dayNum)
                      } else {
                        if (cell.monthOffset === -1) {
                          handlePrevMonth()
                          setSelectedDay(dayNum)
                        } else if (cell.monthOffset === 1) {
                          handleNextMonth()
                          setSelectedDay(dayNum)
                        }
                      }
                    }}
                    className={`group relative flex flex-col justify-between rounded-xl border transition-all duration-200 text-left aspect-square sm:aspect-auto sm:min-h-[105px] p-1.5 sm:p-2.5 ${
                      isCurrent
                        ? isSelected
                          ? 'border-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/15 shadow-sm'
                          : 'border-border/60 bg-background hover:border-cyan-500/40 hover:bg-muted/40'
                        : 'border-transparent bg-transparent text-muted-foreground/30'
                    } ${isToday ? 'ring-2 ring-cyan-500' : ''}`}
                  >
                    {/* Top Row: Day Number & Event Count Badge */}
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs font-bold sm:text-sm ${
                          isToday
                            ? 'flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-white font-extrabold sm:h-6 sm:w-6'
                            : isCurrent
                            ? isSelected
                              ? 'font-extrabold text-cyan-600 dark:text-cyan-400'
                              : 'text-foreground'
                            : 'text-muted-foreground/30'
                        }`}
                      >
                        {dayNum}
                      </span>

                      {/* Mobile Event Count Pill */}
                      {hasEvents && (
                        <span className="flex sm:hidden items-center justify-center rounded-full bg-cyan-500 px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                          {cellEvents.length}
                        </span>
                      )}
                    </div>

                    {/* Events Display */}
                    <div className="mt-1 w-full flex-1 flex flex-col justify-end">
                      {hasEvents && (
                        <>
                          {/* Mobile Dots Indicator */}
                          <div className="flex sm:hidden flex-wrap items-center justify-center gap-1 mt-auto">
                            {cellEvents.map((ev) => (
                              <span
                                key={ev.id}
                                className={`h-2 w-2 rounded-full shadow-xs ${
                                  ev.server === 'Dev'
                                    ? 'bg-emerald-500'
                                    : ev.server === 'GG'
                                    ? 'bg-rose-500'
                                    : 'bg-cyan-500'
                                }`}
                              />
                            ))}
                          </div>

                          {/* Desktop Event Title Chips */}
                          <div className="hidden sm:flex flex-col gap-1 w-full mt-1">
                            {cellEvents.slice(0, 3).map((ev) => (
                              <span
                                key={ev.id}
                                className={`px-2 py-1 rounded-md text-[10px] font-bold truncate block border shadow-2xs ${getServerBadgeClass(
                                  ev.server
                                )}`}
                                title={ev.name}
                              >
                                {ev.name}
                              </span>
                            ))}
                            {cellEvents.length > 3 && (
                              <span className="text-[9px] font-semibold text-muted-foreground pl-1">
                                +{cellEvents.length - 3} more
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* ── Selected Day Events Panel ───────────────────────────── */}
            {selectedDay !== null && (
              <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm transition-all">
                <div className="flex items-center justify-between mb-4 border-b border-border/80 pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-cyan-500" />
                    Events for {MONTH_NAMES[currentMonth]} {selectedDay}, {currentYear}
                  </h3>
                  <span className="text-xs font-semibold text-muted-foreground bg-background px-2.5 py-1 rounded-lg border border-border">
                    {getEventsForDay(selectedDay).length} scheduled
                  </span>
                </div>

                {getEventsForDay(selectedDay).length === 0 ? (
                  <p className="py-4 text-xs text-muted-foreground text-center">
                    No events scheduled for this day. Select another date or browse in List View!
                  </p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {getEventsForDay(selectedDay).map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.id}`}
                        className="group flex flex-col justify-between rounded-xl border border-border bg-background p-4 shadow-2xs transition-all hover:border-cyan-500/50 hover:shadow-md"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${getServerBadgeClass(event.server)}`}>
                              {event.server}
                            </span>
                            <span className="text-[11px] font-medium text-muted-foreground">
                              {event.isOffline ? 'Offline' : 'Online'}
                            </span>
                          </div>

                          <h4 className="font-bold text-sm text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {event.name}
                          </h4>

                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            {event.description}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60 text-xs">
                          <span className="text-muted-foreground font-medium">
                            {mounted ? formatDate(event.date) : 'Loading...'}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-foreground group-hover:text-cyan-500">
                            Details <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Bottom Suggestion CTA ──────────────────────────────────── */}
        <div className="mt-16 text-center pt-8 border-t border-border/60">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Users className="h-4 w-4 text-cyan-500" />
              <span>Want to host or suggest an event?</span>
            </div>
            <Link
              href="/help#suggestion-box"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-xs font-bold text-foreground shadow-xs transition-all hover:border-cyan-500/40 hover:bg-muted/40"
            >
              Suggest an event idea
              <ArrowRight className="h-4 w-4 text-cyan-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}