import dynamic from 'next/dynamic'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React from 'react'

const ChartAge = dynamic(() => import('@/ui/member-charts/chart-age'), {
	ssr: false,
})
const ChartLocation = dynamic(
	() => import('@/ui/member-charts/chart-location'),
	{
		ssr: false,
	},
)
const Carousel = dynamic(
	() => import('@/components/ui/carousel').then((mod) => mod.Carousel),
	{ ssr: false },
)
const CarouselContent = dynamic(
	() => import('@/components/ui/carousel').then((mod) => mod.CarouselContent),
	{ ssr: false },
)
const CarouselItem = dynamic(
	() => import('@/components/ui/carousel').then((mod) => mod.CarouselItem),
	{ ssr: false },
)
const CarouselNext = dynamic(
	() => import('@/components/ui/carousel').then((mod) => mod.CarouselNext),
	{ ssr: false },
)
const CarouselPrevious = dynamic(
	() => import('@/components/ui/carousel').then((mod) => mod.CarouselPrevious),
	{ ssr: false },
)

const Page = () => {
	return (
		<div className="min-h-[calc(100vh-220px)] w-screen border-t-2 border-white bg-vsc-bg-dark text-vsc-bg-light">
			<div className="flex w-full flex-col place-items-center justify-center gap-2 bg-white p-4">
				<Carousel className="w-full max-w-[500px]">
					<CarouselContent>
						<CarouselItem>
							<Card></Card>
						</CarouselItem>
						<CarouselItem>
							<Card>
								<CardContent className="h-[400px] w-full">
									<CardTitle className="my-4 text-xl font-light">
										Wie alt sind wir?
									</CardTitle>
									<ChartAge />
								</CardContent>
							</Card>
						</CarouselItem>
						<CarouselItem>
							<Card>
								<CardContent className="h-[400px] w-full">
									<CardTitle className="my-4 text-xl font-light">
										Wo kommen wir her?
									</CardTitle>
									<ChartLocation />
								</CardContent>
							</Card>
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious className="bg-vsc-bg-dark" />
					<CarouselNext className="bg-vsc-bg-dark" />
				</Carousel>
			</div>
		</div>
	)
}

export default Page
