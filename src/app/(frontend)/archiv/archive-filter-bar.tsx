'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const categories = [
	{ slug: 'volleyball', title: 'Volleyball' },
	{ slug: 'mixed', title: 'Mixed' },
	{ slug: 'herren', title: 'Herren' },
	{ slug: 'events', title: 'Events' },
]

export function ArchiveFilterBar() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const filter = searchParams.get('filter')

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return params.toString()
		},
		[searchParams],
	)

	return (
		<div className="w-full px-4 pt-4">
			<div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				<Link href={pathname}>
					<Button
						variant={filter === null ? 'secondary' : 'ghost'}
						className={'w-full active:bg-vsc-blue'}
					>
						Alle
					</Button>
				</Link>
				{categories.map((category) => (
					<Link
						href={pathname + '?' + createQueryString('filter', category.slug)}
					>
						<Button
							variant={filter === category.slug ? 'secondary' : 'ghost'}
							key={category.slug}
							className={'w-full active:bg-vsc-blue'}
						>
							{category.title}
						</Button>
					</Link>
				))}
			</div>
		</div>
	)
}
