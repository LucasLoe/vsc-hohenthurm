import { cn } from '@/lib/utils'
import CTA from './CTA'

export default function CTAList({
	ctas,
	className,
}: {
	ctas?: Sanity.CTA[]
} & React.ComponentProps<'div'>) {
	if (!ctas?.length) return null

	return (
		<div
			className={cn(
				'flex flex-wrap place-items-center justify-center gap-[.5em] md:justify-start',
				className,
			)}
		>
			{ctas?.map((cta, key) => (
				<CTA className={cn('max-sm:mx-auto max-sm:w-64')} {...cta} key={key} />
			))}
		</div>
	)
}
