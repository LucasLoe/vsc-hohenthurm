'use client'

import { categoryStore } from '../store'
import PostPreview from '../PostPreview'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import VSCPaginatedCarousel from './VSCPaginatedCarousel'

const listStyles = {
	grid: 'grid gap-x-6 gap-y-12 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
	carousel:
		'carousel max-xl:full-bleed md:overflow-fade-r pb-4 [--size:320px] max-xl:px-4',
	'vsc-paginated':
		'carousel max-xl:full-bleed md:overflow-fade-r pb-4 [--size:320px] max-xl:px-4',
}

export default function List({
	posts,
	predefinedFilters,
	layout,
	...props
}: {
	posts: Sanity.BlogPost[]
	predefinedFilters?: Sanity.BlogCategory[]
	layout: 'grid' | 'carousel' | 'vsc-paginated'
} & React.ComponentProps<'ul'>) {
	const { selected, reset } = categoryStore()

	useEffect(reset, [usePathname()])

	const filtered = posts
		// filter by predefined filters
		.filter(
			(post) =>
				!predefinedFilters?.length ||
				post.categories?.some((category) =>
					predefinedFilters.some((filter) => filter._id === category._id),
				),
		)
		// filter by selected category
		.filter(
			(post) =>
				selected === 'All' ||
				post.categories?.some((category) => category._id === selected),
		)

	if (!filtered.length) {
		return <div>No posts found...</div>
	}

	return layout === 'vsc-paginated' ? (
		<VSCPaginatedCarousel posts={filtered} />
	) : (
		<ul className={listStyles[layout]}>
			{filtered?.map((post) => (
				<li className="anim-fade" key={post._id}>
					<PostPreview post={post} />
				</li>
			))}
		</ul>
	)
}
