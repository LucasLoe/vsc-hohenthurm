import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import Img from '@/ui/Img'
import Date from '@/ui/Date'
import Categories from './Categories'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export default function VSCPostPreview({ post }: { post: Sanity.BlogPost }) {
	return (
		<Link
			className="group block space-y-2"
			href={processUrl(post, { base: false })}
		>
			<Card className="h-[450px] rounded-none shadow-lg">
				<CardHeader className="p-0">
					<figure className="relative aspect-video overflow-hidden bg-ink/5">
						<Img
							className="aspect-video w-full object-cover transition-[filter,transform] group-hover:scale-105 group-hover:brightness-110"
							image={post.metadata.image}
							imageWidth={800}
							alt={post.metadata.title}
						/>

						{post.featured && (
							<span className="action absolute right-4 top-0 rounded-t-none py-1 text-xs shadow-md">
								Featured
							</span>
						)}
					</figure>
				</CardHeader>
				<CardContent>
					<CardTitle className="h3 mt-4">{post.metadata.title}</CardTitle>
				</CardContent>
				<CardFooter>
					<Date value={post.publishDate} />
					<Categories
						className="flex flex-wrap gap-x-2"
						categories={post.categories}
					/>
				</CardFooter>
			</Card>
		</Link>
	)
}
