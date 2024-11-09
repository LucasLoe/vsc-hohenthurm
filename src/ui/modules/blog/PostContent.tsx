import uid from '@/lib/uid'
import Content from '@/ui/modules/RichtextModule/Content'
import { cn } from '@/lib/utils'
import css from './PostContent.module.css'
import { Categories, DateBadge } from './vsc-post-content-components'
import ImageGallery from '../ImageGallery'
import { stegaClean } from '@sanity/client/stega'

export default function PostContent({
	post,
	...props
}: { post?: Sanity.BlogPost } & Sanity.Module) {
	if (!post) return null

	console.log(post.gallery && stegaClean(post.gallery.position) === 'top')

	return (
		<article id={uid(props)}>
			<header className="section space-y-6 text-center">
				<h1 className="h1 text-balance">{post.metadata.title}</h1>
				<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
					<DateBadge value={post.publishDate} />
					<Categories categories={post.categories} />
				</div>
			</header>

			{post.gallery && stegaClean(post.gallery.position) === 'top' ? (
				<ImageGallery images={post.gallery.images} />
			) : null}

			<section className="mx-auto max-w-5xl px-4 py-4 sm:px-12 sm:py-6">
				<Content
					value={post.body}
					className={cn(css.body, 'grid max-w-screen-md')}
				></Content>
			</section>

			{post.gallery && stegaClean(post.gallery.position) === 'bottom' ? (
				<ImageGallery images={post.gallery.images} />
			) : null}
		</article>
	)
}
