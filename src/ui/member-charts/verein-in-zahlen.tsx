import { cn } from '@/lib/utils'
import React from 'react'
import Pretitle from '../Pretitle'
import { PortableText } from '@portabletext/react'
import VereinInZahlenChart from './verein-in-zahlen-charts'

const VereinInZahlenHero = ({
	layoutOptions: { onRight, onBottom, colorOnMobile },
	pretitle,
	content,
	ageDistribution,
	geographicDistribution,
}: {
	layoutOptions: {
		onRight: boolean
		onBottom: boolean
		colorOnMobile: boolean
	}
	pretitle: string
	content: any
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
		<section className="section grid max-w-5xl items-start justify-center gap-y-8 px-0 py-4 md:grid-cols-2 md:justify-between md:gap-6 md:gap-x-12 md:px-8">
			<div
				className={cn(
					'h-80 w-full px-8',
					onRight && 'md:order-1',
					onBottom && 'max-md:order-last',
				)}
			>
				<VereinInZahlenChart
					ageDistribution={ageDistribution}
					geographicDistribution={geographicDistribution}
				/>
			</div>

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
						colorOnMobile ? 'text-white md:text-black' : 'text-black',
					)}
				>
					<PortableText value={content} />
				</div>
			</div>
		</section>
	)
}

export default VereinInZahlenHero
