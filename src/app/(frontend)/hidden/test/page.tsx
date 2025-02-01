'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import ChartAge from '@/ui/member-charts/chart-age'
import ChartLocation from '@/ui/member-charts/chart-location'
import React from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

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
