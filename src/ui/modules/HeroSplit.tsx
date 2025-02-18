import { PortableText } from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import Reputation from '@/ui/Reputation'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'
import CTA from '../CTA'

export default function HeroSplit({
	pretitle,
	content,
	ctas,
	reputation,
	image,
	colorOnMobile,
}: Partial<{
	pretitle: string
	content: any
	colorOnMobile: boolean
	ctas: Sanity.CTA[]
	reputation: Sanity.Reputation
	image: Sanity.Image & {
		onRight?: boolean
		onBottom?: boolean
	}
}>) {
	return (
		<section className="section grid max-w-5xl items-start justify-center gap-y-8 px-0 py-4 md:grid-cols-2 md:justify-between md:gap-6 md:gap-x-12 md:px-8">
			<figure
				className={cn(
					'',
					image?.onRight && 'md:order-1',
					image?.onBottom && 'max-md:order-last',
				)}
			>
				<Img
					className="mx-auto h-auto w-full max-w-64 rounded object-cover md:max-w-80"
					image={image}
					imageWidth={800}
				/>
			</figure>

			<div
				className={cn(
					'flex w-full flex-col justify-center p-8 md:block md:max-w-lg md:p-0 [&_:is(h1,h2)]:text-balance',
					colorOnMobile
						? 'bg-vsc-bg-dark shadow-lg md:bg-inherit md:shadow-none'
						: 'bg-inherit',
				)}
			>
				{pretitle ? (
					<div
						className={
							colorOnMobile ? 'text-white md:text-inherit' : 'text-inherit'
						}
					>
						<Pretitle>{pretitle}</Pretitle>
					</div>
				) : null}
				<div
					className={cn(
						'text-sm md:text-base',
						colorOnMobile ? 'text-white md:text-inherit' : 'text-inherit',
					)}
				>
					<PortableText value={content} />
				</div>
				<Reputation
					className={cn(
						'!mt-4',
						colorOnMobile ? 'text-white md:text-inherit' : 'text-inherit',
					)}
					reputation={reputation}
				/>
				<div className="flex flex-wrap place-items-center justify-center gap-[.5em] md:hidden md:justify-start">
					{ctas?.map((cta, key) => (
						<CTA key={key} {...cta} style={'default'} />
					))}
				</div>
				<div className="hidden flex-wrap place-items-center justify-center gap-[.5em] md:flex md:justify-start">
					{ctas?.map((cta, key) => <CTA key={key} {...cta} />)}
				</div>
			</div>
		</section>
	)
}
