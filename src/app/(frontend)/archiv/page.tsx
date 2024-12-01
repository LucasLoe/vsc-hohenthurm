import { fetchSanity, groq } from '@/lib/sanity/fetch'
import Archive from './archive'
import { Suspense } from 'react'

async function getPosts() {
	return await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post']
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

async function getCategories() {
	return await fetchSanity<Sanity.BlogCategory[]>(
		groq`*[_type == 'blog.category']{
      _id,
      title,
      "slug": slug.current
    }`,
	)
}

export default async function ArchivePage() {
	const posts = await getPosts()
	const categories = await getCategories()

	return (
		<div className="container mx-auto flex w-full flex-col place-items-center px-4">
			<Suspense fallback={<p>Wird geladen ... </p>}>
				<Archive posts={posts} categories={[]} />
			</Suspense>
		</div>
	)
}
