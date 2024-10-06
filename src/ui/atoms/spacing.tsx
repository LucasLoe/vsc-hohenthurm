import { cn } from '@/lib/utils'
import React from 'react'
import { stegaClean } from '@sanity/client/stega'

type SpacingProps = {
	value: 'sm' | 'md' | 'lg' | 'xl'
	responsive?: boolean
}

const getStyles = (value: SpacingProps['value'], responsive?: boolean) => {
	const baseStyles = { sm: 'h-8', md: 'h-12', lg: 'h-16', xl: 'h-24' }

	const responsiveStyles = {
		sm: 'sm:h-8',
		md: 'sm:h-16',
		lg: 'sm:h-24',
		xl: 'sm:h-32',
	}

	return cn(baseStyles[value], responsive && responsiveStyles[value])
}

const Spacing: React.FC<SpacingProps> = (props) => {
	const responsive = props.responsive
	const value = stegaClean(props.value) // string comparison needs to be done with stegaClean to clean up the CSM

	return <div className={cn(getStyles(value, responsive))}></div>
}

export default Spacing
