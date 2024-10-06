import React from 'react'
import { roboto } from '@/ui/Fonts'
import { TriangleRightIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'

type HeadingProps = {
	title: string
	color: 'pink' | 'blue' | 'dark'
	type: 'h2' | 'h3'
}

const headingStyles = {
	h2: 'text-2xl my-2 sm:my-4',
	h3: 'text-xl my-2 sm:my-4',
	h4: 'text-lg my-2 sm:my-4',
}

const triangleStyles = (
	color: HeadingProps['color'],
	type: HeadingProps['type'],
) => {
	return {
		pink: {
			h2: 'text-vsc-pink  size-12',
			h3: 'text-vsc-pink size-10',
			h4: 'text-vsc-pink size-8',
		},
		blue: {
			h2: 'text-vsc-blue size-12',
			h3: 'text-vsc-blue size-10',
			h4: 'text-vsc-blue size-8',
		},
		dark: {
			h2: 'text-vsc-bg-dark size-12',
			h3: 'text-vsc-bg-dark size-10',
			h4: 'text-vsc-bg-dark size-8',
		},
	}[color][type]
}

const Heading = (props: HeadingProps) => {
	const title = props.title
	const color = stegaClean(props.color)
	const type = stegaClean(props.type)

	return (
		<div className="mx-auto max-w-5xl">
			<h2
				className={cn(
					`ml-0 mr-auto font-bold ${roboto.className} flex items-center`,
					headingStyles[type],
				)}
			>
				<TriangleRightIcon
					className={`${triangleStyles(color, type)} size-12`}
				/>
				{title}
			</h2>
		</div>
	)
}

export default Heading
