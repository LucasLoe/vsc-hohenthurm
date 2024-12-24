'use client'
import { PortableText } from '@portabletext/react'
import { Roboto_Slab } from 'next/font/google'
import { cn } from '@/lib/utils'

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

export function Title({ title }: { title: string }) {
	return (
		<h1
			className={cn(
				robotoSlab.className,
				'w-fit gap-2.5 border-b-2 border-vsc-blue py-1 pl-0.5 pr-12 text-2xl text-vsc-blue',
			)}
		>
			{title}
		</h1>
	)
}

export function Content({ content }: { content: any }) {
	return (
		<div className="md:pr-2 md:text-left">
			<PortableText value={content} />
		</div>
	)
}
