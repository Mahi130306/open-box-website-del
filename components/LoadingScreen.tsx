'use client'

import Image from 'next/image'
import { useTransitionState } from '@/components/RouteTransitionProvider'

export function LoadingScreen() {
  const { state } = useTransitionState()

  // The loader is visible only during CURRENT_LOADER state
  const isVisible = state === 'CURRENT_LOADER'

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-background"
      style={{
        opacity: 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Scanline texture, CLI feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Glow ring behind the gif */}
      <div className="relative flex items-center justify-center">
        <div />
        <Image
          src="/images/OB72loader.gif"
          alt="Open Box loading"
          width={72}
          height={72}
          priority
          unoptimized
          className="relative rounded-xl"
        />
      </div>

      {/* Terminal-style wordmark */}
      <p
        className="mt-5 font-mono text-sm tracking-[0.3em] text-foreground/60"
        style={{ animation: 'ob-fade-in 0.6s ease 0.2s both' }}
      >
        OPEN BOX
        <span style={{ animation: 'ob-blink 1s step-end infinite' }}>_</span>
      </p>

      <style>{`
        @keyframes ob-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes ob-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 0.6; transform: translateY(0); }
        }
        @keyframes ob-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
