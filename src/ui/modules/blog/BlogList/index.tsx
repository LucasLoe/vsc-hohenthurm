import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PortableText } from '@portabletext/react'
import Filtering from '@/ui/modules/blog/BlogList/Filtering'
import List from './List'
import { stegaClean } from '@sanity/client/stega'
import { cn } from '@/lib/utils'

export default async function BlogList({
	intro,
	layout,
	limit = 100,
	displayFilters,
	predefinedFilters,
}: Partial<{
	intro: any
	layout: 'grid' | 'carousel' | 'vsc-paginated'
	limit: number
	displayFilters: boolean
	predefinedFilters: Sanity.BlogCategory[]
}>) {
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post']|order(featured desc, publishDate desc)[0...$limit]{
			...,
			categories[]->
		}`,
		{
			params: { limit },
			tags: ['posts'],
		},
	)

	const currentLayout = stegaClean(layout) || 'vsc-paginated'

	return (
		<section className="section p-0">
			{intro && (
				<header className="richtext">
					<PortableText value={intro} />
				</header>
			)}
			{displayFilters && <Filtering predefinedFilters={predefinedFilters} />}

			<List
				layout={currentLayout}
				posts={posts}
				predefinedFilters={predefinedFilters}
			/>
		</section>
	)
}
