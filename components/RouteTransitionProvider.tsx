'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { getSkeletonForPath } from '@/components/PageSkeletons'

type TransitionState = 'CURRENT_LOADER' | 'SKELETAL_LOADER' | 'CONTENT'

interface TransitionContextType {
  state: TransitionState
  skeletonPath: string
}

const TransitionContext = createContext<TransitionContextType>({
  state: 'CURRENT_LOADER',
  skeletonPath: '/',
})

export function useTransitionState() {
  return useContext(TransitionContext)
}

/**
 * Context Provider - handles the global state machine for the transition.
 * Sits high up in the tree so any descendant (like LoadingScreen) can consume its state.
 */
export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Default to CURRENT_LOADER so that during SSR and initial render, the Loading Screen is active
  const [state, setState] = useState<TransitionState>('CURRENT_LOADER')
  const [skeletonPath, setSkeletonPath] = useState(pathname)
  const isFirstLoad = useRef(true)

  // 1. Pathname sync for initial load or SSR hydration
  useEffect(() => {
    setSkeletonPath(pathname)
  }, [pathname])

  // 2. State transition runner
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false

      // Initial mount transition
      const timer1 = setTimeout(() => {
        setState('SKELETAL_LOADER')
        const timer2 = setTimeout(() => {
          setState('CONTENT')
        }, 500)
        return () => clearTimeout(timer2)
      }, 700)

      return () => clearTimeout(timer1)
    }

    // Dynamic navigation route changes
    setState('CURRENT_LOADER')
    setSkeletonPath(pathname)

    const timer1 = setTimeout(() => {
      setState('SKELETAL_LOADER')

      const timer2 = setTimeout(() => {
        setState('CONTENT')
      }, 500)

      return () => clearTimeout(timer2)
    }, 500)

    return () => clearTimeout(timer1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <TransitionContext.Provider value={{ state, skeletonPath }}>
      {children}
    </TransitionContext.Provider>
  )
}

/**
 * View Wrapper - specifically wraps the dynamic page content to show the skeleton
 * or actual page content based on the current transition state.
 */
export function RouteTransitionView({ children }: { children: React.ReactNode }) {
  const { state, skeletonPath } = useTransitionState()
  const [activeChildren, setActiveChildren] = useState(children)

  // Sync children if the state is CONTENT so HMR or inline state changes work
  useEffect(() => {
    if (state === 'CONTENT') {
      setActiveChildren(children)
    }
  }, [children, state])

  return (
    <div className="relative min-h-screen">
      {/* State: SKELETAL_LOADER - show page-specific skeleton screen */}
      <div
        className="transition-opacity duration-300 animate-fade-in"
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
          opacity: state === 'CONTENT' ? 1 : 0,
          display: state === 'CONTENT' ? 'block' : 'none',
        }}
      >
        {activeChildren}
      </div>
    </div>
  )
}
