import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import Img from '@/ui/Img'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Roboto_Slab } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons'

const roboto = Roboto_Slab({ subsets: ['latin'], display: 'swap' })

const FormattedDate = ({ value }: { value: string }) => {
	const _date = new Date(value)
	const formatter = new Intl.DateTimeFormat('de-DE', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})

	return <span>{formatter.format(_date)}</span>
}

const Categories = ({ categories }: { categories: Sanity.BlogCategory[] }) => {
	console.log(categories)
	if (!categories) return null

	return (
		<div className="flex place-items-center gap-x-1">
			{categories.map((cat, idc) => (
				<Badge
					className="rounded-full border-gray-400 font-light text-gray-500"
					key={idc}
					variant="outline"
				>
					{cat.title}
				</Badge>
			))}
		</div>
	)
}

export default function VSCPostPreview({ post }: { post: Sanity.BlogPost }) {
	return (
		<Link
			className="group block space-y-2"
			href={processUrl(post, { base: false })}
		>
			<Card className="flex h-[450px] flex-col justify-between rounded-sm border-0 shadow-lg">
				<CardHeader className="p-4 shadow-inner">
					<figure className="relative aspect-video overflow-hidden rounded-t-sm bg-ink/5">
						<Img
							className="w-full object-cover transition-[filter,transform] group-hover:scale-105 group-hover:brightness-110"
							image={post.metadata.image}
							imageWidth={800}
							alt={post.metadata.title}
						/>
					</figure>
				</CardHeader>
				<CardContent className="flex grow flex-col justify-between">
					<CardTitle className={cn('mb-2 text-xl', roboto.className)}>
						{post.metadata.title}
					</CardTitle>
					<p>{post.metadata.description}</p>
					<Button
						variant="secondary"
						size="sm"
						className="mx-auto mb-0 mt-auto flex place-items-center gap-1 px-2 shadow"
					>
						<ArrowRightIcon />
						Weiterlesen
					</Button>
				</CardContent>
				<CardFooter className="flex place-items-center justify-between pb-4">
					<p className="text-sm font-light text-gray-400">
						<FormattedDate value={post.publishDate} />
					</p>
					<Categories categories={post.categories} />
				</CardFooter>
			</Card>
		</Link>
	)
}
