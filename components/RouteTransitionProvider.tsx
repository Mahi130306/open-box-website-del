'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getSkeletonForPath } from '@/components/PageSkeletons'

type TransitionState = 'IDLE' | 'CURRENT_LOADER' | 'SKELETAL_LOADER' | 'CONTENT'

interface TransitionContextType {
  state: TransitionState
  skeletonPath: string
}

const TransitionContext = createContext<TransitionContextType>({
  state: 'IDLE',
  skeletonPath: '/',
})

export function useTransitionState() {
  return useContext(TransitionContext)
}

export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [state, setState] = useState<TransitionState>('IDLE')
  const [skeletonPath, setSkeletonPath] = useState(pathname)
  const [activeChildren, setActiveChildren] = useState(children)

  // Track page navigation changes
  useEffect(() => {
    // If it's the initial page load, run the sequence
    if (state === 'IDLE') {
      setSkeletonPath(pathname)
      setState('CURRENT_LOADER')

      const timer1 = setTimeout(() => {
        setState('SKELETAL_LOADER')
        const timer2 = setTimeout(() => {
          setState('CONTENT')
        }, 500)
        return () => clearTimeout(timer2)
      }, 600)

      return () => clearTimeout(timer1)
    }

    // On dynamic route changes
    setState('CURRENT_LOADER')
    setSkeletonPath(pathname)

    const timer1 = setTimeout(() => {
      setState('SKELETAL_LOADER')
      // Swap out the old children only once we hit skeletal loading state
      setActiveChildren(children)

      const timer2 = setTimeout(() => {
        setState('CONTENT')
      }, 500)

      return () => clearTimeout(timer2)
    }, 500)

    return () => clearTimeout(timer1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Sync children changes if state is CONTENT or IDLE (for hot reloads / client interactions)
  useEffect(() => {
    if (state === 'CONTENT' || state === 'IDLE') {
      setActiveChildren(children)
    }
  }, [children, state])

  return (
    <TransitionContext.Provider value={{ state, skeletonPath }}>
      <div className="relative min-h-screen">
        {/* State: SKELETAL_LOADER - show page-specific skeleton screen */}
        <div
          className="transition-opacity duration-300"
          style={{
            opacity: state === 'SKELETAL_LOADER' ? 1 : 0,
            display: state === 'SKELETAL_LOADER' ? 'block' : 'none',
          }}
        >
          {getSkeletonForPath(skeletonPath)}
        </div>

        {/* State: CONTENT - show actual page children */}
        <div
          className="transition-opacity duration-400"
          style={{
            opacity: state === 'CONTENT' || state === 'IDLE' ? 1 : 0,
            display: state === 'SKELETAL_LOADER' ? 'none' : 'block',
          }}
        >
          {activeChildren}
        </div>
      </div>
    </TransitionContext.Provider>
  )
}
