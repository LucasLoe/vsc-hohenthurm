import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

type backgroundProps = {
	colors: 'light-blue' | 'dark-blue' | 'light-pink' | 'light-grey'
	fullscreen: boolean
}

const backgroundColors = {
	'light-blue': 'bg-vsc-blue',
	'dark-blue': 'bg-vsc-blue-dark',
	'light-pink': 'bg-vsc-pink',
	'light-grey': 'bg-vsc-bg-light',
}

const BlueGeometric = ({ children }: { children: ReactNode }) => {
	return (
		<div className="relative">
			<svg
				className="h-16 w-full"
				viewBox="0 0 100 50"
				preserveAspectRatio="none"
			>
				<path
					d="M0 50 L30 0 L100 50 Z"
					fill="currentColor"
					className="text-vsc-bg-dark"
				/>
			</svg>
			<div className={cn(`relative w-full bg-vsc-bg-dark px-8 py-8 md:px-16`)}>
				{children}
			</div>
			<svg
				className="h-16 w-full"
				viewBox="0 0 100 50"
				preserveAspectRatio="none"
			>
				<path
					d="M0 0 L100 0 L70 50 Z"
					fill="currentColor"
					className="text-vsc-bg-dark"
				/>
			</svg>
		</div>
	)
}

export default BlueGeometric
