import React from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

import VSCPostPreview from '../VSCPostPreview'
import BlueGeometric from '@/ui/backgrounds/BlueGeometric'

type VSCPaginatedCarouselProps = {
	posts: Sanity.BlogPost[]
}

const VSCPaginatedCarousel = ({ posts }: VSCPaginatedCarouselProps) => {
	return (
		<section className="py-4">
			<BlueGeometric>
				<Carousel
					opts={{ align: 'start', loop: false }}
					className="mx-auto w-full max-w-screen-xl"
				>
					<CarouselContent className="-ml-2 md:-ml-4">
						{posts.map((post, index) => (
							<CarouselItem
								key={index}
								className="pl-2 sm:basis-1/2 md:pl-4 lg:basis-1/3"
							>
								<div className="p-1">
									<VSCPostPreview post={post} />
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden size-8 border-none bg-vsc-blue shadow-lg outline-none hover:bg-vsc-pink md:flex" />
					<CarouselNext className="hidden size-8 border-none bg-vsc-blue shadow-lg outline-none hover:bg-vsc-pink md:flex" />
				</Carousel>
			</BlueGeometric>
		</section>
	)
}

export default VSCPaginatedCarousel
