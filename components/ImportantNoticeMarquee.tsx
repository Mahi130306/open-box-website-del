'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Megaphone } from 'lucide-react'
import { importantNotice } from '@/lib/community-data'

export function ImportantNoticeMarquee() {
  const { text, linkText, linkUrl } = importantNotice
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem('ob-dismissed-wick-notice')
    if (!isDismissed) {
      setVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('ob-dismissed-wick-notice', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="relative w-full bg-zinc-950 border-b border-zinc-800 py-2.5 px-4 text-xs sm:text-sm font-medium text-zinc-300 select-none animate-in fade-in slide-in-from-top duration-300">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        {/* Center content */}
        <div className="flex-1 flex items-center justify-center gap-2">
          <Megaphone className="h-4 w-4 text-cyan-400 shrink-0 hidden sm:inline-block" />
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0 sm:hidden" />
          <span className="tracking-wide text-zinc-300 text-center text-xs sm:text-sm leading-snug">
            {text}{' '}
            <Link
              href={linkUrl}
              className="inline-block text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors font-semibold ml-1"
            >
              {linkText}
            </Link>
          </span>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
