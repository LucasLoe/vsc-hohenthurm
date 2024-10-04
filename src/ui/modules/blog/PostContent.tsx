import uid from '@/lib/uid'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import Content from '@/ui/modules/RichtextModule/Content'
import { cn } from '@/lib/utils'
import css from './PostContent.module.css'
import { Categories, DateBadge } from './vsc-post-content-components'

export default function PostContent({
	post,
	...props
}: { post?: Sanity.BlogPost } & Sanity.Module) {
	if (!post) return null

	const showTOC = !post.hideTableOfContents || !!post.headings?.length

	return (
		<article id={uid(props)}>
			<header className="section space-y-6 text-center">
				<h1 className="h1 text-balance">{post.metadata.title}</h1>
				<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
					<DateBadge value={post.publishDate} />
					<Categories categories={post.categories} />
				</div>
			</header>

			<div className={cn('section grid max-w-4xl gap-8')}>
				<Content
					value={post.body}
					className={cn(css.body, 'grid max-w-screen-md')}
				></Content>
			</div>
		</article>
	)
}
