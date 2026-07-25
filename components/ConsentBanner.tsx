'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useConsent } from '@/lib/hooks/useConsent'

export function ConsentBanner() {
  const { isReady, hasConsented, accept, reject, dismiss } = useConsent()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (isReady && !hasConsented && !dismissed) {
      const t = setTimeout(() => setVisible(true), 600)
      return () => clearTimeout(t)
    }
  }, [isReady, hasConsented, dismissed])

  if (!visible || hasConsented || dismissed) return null

  function animateOut(callback: () => void) {
    setExiting(true)
    setTimeout(() => {
      setVisible(false)
      callback()
    }, 300)
  }

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[460px] z-[999] transition-all duration-300 ${
        exiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="rounded-xl border border-border bg-surface/95 backdrop-blur-md shadow-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          🍪 By using this site you agree to our{' '}
          <Link href="/legal/terms-and-conditions" target="_blank" className="underline hover:text-foreground transition-colors">
            Terms
          </Link>
          ,{' '}
          <Link href="/legal/privacy-policy" target="_blank" className="underline hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          , and{' '}
          <Link href="/legal/cookie-policy" target="_blank" className="underline hover:text-foreground transition-colors">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={() => animateOut(() => { accept(); window.dispatchEvent(new Event('cookie-consent-accepted')) })}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-foreground text-background hover:opacity-80 transition-opacity min-h-[36px] min-w-[70px]"
          >
            Accept
          </button>
          <button
            onClick={() => animateOut(() => reject())}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-surface transition-colors text-muted-foreground min-h-[36px]"
          >
            Reject
          </button>
          <button
            onClick={() => animateOut(() => setDismissed(true))}
            aria-label="Dismiss"
            className="text-muted-foreground hover:text-foreground transition-colors text-lg p-1 min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
