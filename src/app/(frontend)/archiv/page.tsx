import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { ArchiveFilterBar } from './archive-filter-bar'
import { ArchivePost } from './archive-post'

async function getPosts(category?: Sanity.BlogCategory['title']) {
	const filter = category
		? `&& '${category}' in categories[]->slug.current`
		: ''

	return await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post' ${filter}]
    |order(featured desc, publishDate desc){
      _id,
      title,
      publishDate,
      excerpt,
      featured,
      categories[]->,
      metadata
    }`,
	)
}

type Props = {
	searchParams: { category?: Sanity.BlogCategory['title'] }
}

export default async function ArchivePage({ searchParams }: Props) {
	const posts = await getPosts(searchParams.category)

	return (
		<div className="container mx-auto px-4">
			<ArchiveFilterBar />
			<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<ArchivePost key={post._id} post={post} />
				))}
			</div>
		</div>
	)
}
