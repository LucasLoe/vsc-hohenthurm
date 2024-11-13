import Image from 'next/image'
import Link from 'next/link'

type PostProps = {
	post: Sanity.BlogPost
}

export function ArchivePost({ post }: PostProps) {
	return (
		<article className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
			{post.metadata.ogimage && (
				<div className="relative h-48">
					<Image
						src={post.metadata.ogimage}
						alt={post.title!}
						fill
						className="object-cover"
					/>
				</div>
			)}
			<div className="p-4">
				<h2 className="text-xl font-bold">{post.title}</h2>
				<div className="mt-2 flex gap-2">
					{post.categories.map((category) => (
						<span
							key={category._id}
							className="rounded-full bg-vsc-blue px-2 py-1 text-sm text-white"
						>
							{category.title}
						</span>
					))}
				</div>
				{
					// post.excerpt && <p className="mt-2 text-gray-600">{post.excerpt}</p>
				}
				<time className="mt-2 text-sm text-gray-500">
					{new Date(post.publishDate).toLocaleDateString()}
				</time>
			</div>
		</article>
	)
}
