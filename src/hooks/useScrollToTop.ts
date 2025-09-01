import { useEffect } from 'react'

/**
 * Custom hook to scroll to top of the page
 * @param dependencies - Array of dependencies that trigger scroll to top when changed
 * @param smooth - Whether to use smooth scrolling (default: true)
 */
export const useScrollToTop = (dependencies: any[] = [], smooth: boolean = true) => {
  useEffect(() => {
    if (smooth && 'scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, dependencies)
}

/**
 * Utility function to scroll to top immediately
 * @param smooth - Whether to use smooth scrolling (default: true)
 */
export const scrollToTop = (smooth: boolean = true) => {
  if (smooth && 'scrollBehavior' in document.documentElement.style) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollTo(0, 0)
  }
}
