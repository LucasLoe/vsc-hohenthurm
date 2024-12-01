import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'

export const Categories = ({
	categories,
	className,
}: {
	categories?: Sanity.BlogCategory[]
	className?: string
}) => {
	return (
		<div className={cn('flex items-center gap-x-1', className || 'selection:')}>
			{categories?.map((category) => (
				<Link
					href={`/archiv?filter=${stegaClean(category.title).toLowerCase()}`}
				>
					<Badge
						key={category._id}
						className="bg-vsc-blue/50 text-vsc-bg-dark shadow-sm"
					>
						{category.title}
					</Badge>
				</Link>
			))}
		</div>
	)
}

export const DateBadge = ({ value }: { value: string }) => {
	return (
		<time dateTime={value} className="text-vsc-bg-dark/50">
			{new Date(value).toLocaleDateString('de', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})}
		</time>
	)
}
