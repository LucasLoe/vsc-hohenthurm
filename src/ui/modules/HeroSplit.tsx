import { PortableText } from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import Reputation from '@/ui/Reputation'
import CTAList from '@/ui/CTAList'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function HeroSplit({
	pretitle,
	content,
	ctas,
	reputation,
	image,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	reputation: Sanity.Reputation
	image: Sanity.Image & {
		onRight?: boolean
		onBottom?: boolean
	}
}>) {
	return (
		<section className="section grid max-w-5xl items-center justify-between gap-8 px-8 py-8 md:grid-cols-2 md:gap-x-12">
			<figure
				className={cn(
					'',
					image?.onRight && 'md:order-1',
					image?.onBottom && 'max-md:order-last',
				)}
			>
				<Img
					className="mx-auto h-auto w-full max-w-80 rounded object-cover"
					image={image}
					imageWidth={800}
				/>
			</figure>

			<div className="richtext mx-auto w-full max-w-lg [&_:is(h1,h2)]:text-balance">
				<Pretitle>{pretitle}</Pretitle>
				<PortableText value={content} />
				<Reputation className="!mt-4" reputation={reputation} />
				<CTAList ctas={ctas} className="!mt-4" />
			</div>
		</section>
	)
}
