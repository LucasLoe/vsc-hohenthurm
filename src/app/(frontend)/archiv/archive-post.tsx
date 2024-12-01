import Img from '@/ui/Img'
import Link from 'next/link'
import {
	Card,
	CardContent,
	CardHeader,
	CardFooter,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import processUrl from '@/lib/processUrl'
import { Roboto_Slab } from 'next/font/google'

const roboto = Roboto_Slab({ subsets: ['latin'], display: 'swap' })

type PostProps = {
	post: Sanity.BlogPost
}

const FormattedDate = ({ value }: { value: string }) => {
	const _date = new Date(value)
	const formatter = new Intl.DateTimeFormat('de-DE', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})

	return <span>{formatter.format(_date)}</span>
}

export function ArchivePost({ post }: PostProps) {
	console.log(processUrl(post, { base: true }))
	return (
		<Link
			className="group block space-y-2"
			href={'/blog/' + processUrl(post, { base: false })}
		>
			<Card className="mx-auto flex max-w-96 flex-col justify-between rounded-sm border-0 shadow-lg">
				<CardHeader className="p-4 shadow-inner">
					<figure className="relative aspect-[1.3/1] overflow-hidden rounded-t-sm bg-ink/5">
						<Img
							className="h-full w-full object-cover transition-[filter,transform] group-hover:scale-105 group-hover:brightness-110"
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
					<p className="line-clamp-2">{post.metadata.description}</p>
				</CardContent>
				<CardFooter className="flex place-items-center justify-between pb-4 pl-6 pr-4">
					<p className="text-sm font-light text-gray-400">
						<FormattedDate value={post.publishDate} />
					</p>
					<Button
						variant="outline"
						size="sm"
						className="flex place-items-center gap-1 rounded-sm border-[1px] border-vsc-bg-dark px-2 text-vsc-bg-dark"
					>
						<ArrowRightIcon />
						Weiterlesen
					</Button>
				</CardFooter>
			</Card>
		</Link>
	)
}
