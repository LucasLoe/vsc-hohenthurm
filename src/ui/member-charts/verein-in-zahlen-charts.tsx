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

const VereinInZahlenChart = ({
	ageDistribution,
	geographicDistribution,
}: {
	ageDistribution: {
		under_18: number
		age_18_to_25: number
		age_25_to_35: number
		age_35_to_45: number
		age_45_to_60: number
		over_60: number
	}
	geographicDistribution: {
		halleSaale: number
		landsberg: number
		kabelsketal: number
		merseburg: number
		leipzig: number
		anderes: number
	}
}) => {
	return (
		<div className="h-full w-full">
			<Carousel className="h-full w-full">
				<CarouselContent>
					<CarouselItem>
						<Card className="">
							<CardContent className="h-72 w-full pb-12 pt-4">
								<CardTitle className="pb-4 text-xl font-light">
									Wie alt sind wir?
								</CardTitle>
								<ChartAge ageDistribution={ageDistribution} />
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem>
						<Card>
							<CardContent className="h-72 w-full py-4">
								<CardTitle className="pb-4 text-xl font-light">
									Wo kommen wir her?
								</CardTitle>
								<ChartLocation
									geographicDistribution={geographicDistribution}
								/>
							</CardContent>
						</Card>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious className="left-4 top-20 bg-vsc-bg-dark text-white md:-left-12 md:top-1/2" />
				<CarouselNext className="right-4 top-20 bg-vsc-bg-dark text-white md:-right-12 md:top-1/2" />
			</Carousel>
		</div>
	)
}

export default VereinInZahlenChart
