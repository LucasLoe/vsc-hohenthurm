import React, { useEffect, useState } from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from '@/components/ui/carousel'

import VSCPostPreview from '../VSCPostPreview'
import BlueGeometric from '@/ui/backgrounds/BlueGeometric'
import { ComponentInstanceIcon } from '@radix-ui/react-icons'
import { FaVolleyball } from 'react-icons/fa6'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type VSCPaginatedCarouselProps = {
	posts: Sanity.BlogPost[]
}

const PageIndicator = ({
	onClickFn,
	active = false,
}: {
	onClickFn: (args: any) => void
	active: boolean
}) => {
	return active ? (
		<FaVolleyball className="size-4 text-white" />
	) : (
		<ComponentInstanceIcon
			onClick={onClickFn}
			className="size-4 cursor-pointer bg-none text-white"
		/>
	)
}

const VSCPaginatedCarousel = ({ posts }: VSCPaginatedCarouselProps) => {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!api) {
			return
		}

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap())

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap())
		})
	}, [api])

	const handleIndicatorClick = (index: number) => {
		api?.scrollTo(index)
	}

	return (
		<div className="w-screen px-0 py-6 md:py-12">
			<BlueGeometric>
				<Carousel
					setApi={setApi}
					opts={{ align: 'start', loop: false }}
					className="mx-auto w-full max-w-5xl"
				>
					<CarouselContent className="-ml-2 sm:-ml-4">
						{posts.map((post, index) => (
							<CarouselItem
								key={index}
								className="pl-2 sm:basis-1/2 sm:pl-4 lg:basis-1/3 2xl:basis-1/4"
							>
								<VSCPostPreview post={post} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden size-8 border-none bg-vsc-blue shadow-lg outline-none hover:bg-vsc-pink md:flex" />
					<CarouselNext className="hidden size-8 border-none bg-vsc-blue shadow-lg outline-none hover:bg-vsc-pink md:flex" />
				</Carousel>
				<div className="mt-8 flex w-full justify-center gap-2">
					{Array.from({ length: count }, (_, i) => (
						<PageIndicator
							onClickFn={() => handleIndicatorClick(i)}
							key={i}
							active={i === current}
						/>
					))}
				</div>
				<div className="flex w-full items-center justify-end gap-x-2 text-white">
					<ArrowRight className="size-5" />
					<Link href="/archiv">Zum Archiv</Link>
				</div>
			</BlueGeometric>
		</div>
	)
}

export default VSCPaginatedCarousel
