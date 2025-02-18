'use client'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import React from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

const chartConfig = {
	under_18: {
		label: 'u18',
		color: '#262A2B',
	},
	age_18_to_25: {
		label: '18-25',
		color: '#262A2B',
	},
	age_25_to_35: {
		label: '25-35',
		color: '#262A2B',
	},
	age_35_to_45: {
		label: '35-45',
		color: '#262A2B',
	},
	age_45_to_60: {
		label: '45-60',
		color: '#262A2B',
	},
	over_60: {
		label: 'ü60',
		color: '#262A2B',
	},
} satisfies ChartConfig

const ageRangeOrder = [
	'under_18',
	'age_18_to_25',
	'age_25_to_35',
	'age_35_to_45',
	'age_45_to_60',
	'over_60',
] as const

const ChartAge = ({
	ageDistribution,
}: {
	ageDistribution: {
		under_18: number
		age_18_to_25: number
		age_25_to_35: number
		age_35_to_45: number
		age_45_to_60: number
		over_60: number
	}
}) => {
	const ageData = ageRangeOrder.map((key) => ({
		range: key,
		Mitglieder: ageDistribution[key as keyof typeof ageDistribution],
	}))

	return (
		<ChartContainer config={chartConfig} className="h-full w-full">
			<BarChart accessibilityLayer data={ageData}>
				<XAxis
					dataKey="range"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(Mitglieder) =>
						chartConfig[Mitglieder as keyof typeof chartConfig]?.label
					}
					fontSize={14}
				/>
				<Bar dataKey="Mitglieder" strokeWidth={2} radius={8}>
					<LabelList
						position="top"
						offset={12}
						className="fill-foreground"
						fontSize={14}
					/>
				</Bar>
			</BarChart>
		</ChartContainer>
	)
}

export default ChartAge
