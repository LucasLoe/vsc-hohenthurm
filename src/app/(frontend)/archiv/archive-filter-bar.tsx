'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const categories = [
	{ slug: 'volleyball', title: 'Volleyball' },
	{ slug: 'basketball', title: 'Basketball' },
]

export function ArchiveFilterBar() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const currentCategory = searchParams.get('category')

	return (
		<div className="flex h-16 w-full items-center bg-vsc-blue px-4">
			<div className="flex gap-4">
				<button
					onClick={() => router.push('/archive')}
					className={`rounded-full px-4 py-2 ${
						!currentCategory ? 'bg-white text-vsc-blue' : 'text-white'
					}`}
				>
					All
				</button>
				{categories.map((category) => (
					<button
						key={category.slug}
						onClick={() => router.push(`/archive?category=${category.slug}`)}
						className={`rounded-full px-4 py-2 ${
							currentCategory === category.slug
								? 'bg-white text-vsc-blue'
								: 'text-white'
						}`}
					>
						{category.title}
					</button>
				))}
			</div>
		</div>
	)
}
