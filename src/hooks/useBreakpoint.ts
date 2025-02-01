// hooks/useBreakpoint.ts
import { useState, useEffect } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
}

const useBreakpoint = (): Breakpoint => {
	const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs')

	useEffect(() => {
		// Handle window resize
		const handleResize = () => {
			const width = window.innerWidth

			if (width >= breakpoints['2xl']) {
				setBreakpoint('2xl')
			} else if (width >= breakpoints.xl) {
				setBreakpoint('xl')
			} else if (width >= breakpoints.lg) {
				setBreakpoint('lg')
			} else if (width >= breakpoints.md) {
				setBreakpoint('md')
			} else if (width >= breakpoints.sm) {
				setBreakpoint('sm')
			} else {
				setBreakpoint('xs')
			}
		}

		// Add event listener
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize)
			// Initial check
			handleResize()
		}

		// Cleanup
		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', handleResize)
			}
		}
	}, [])

	return breakpoint
}

export default useBreakpoint
