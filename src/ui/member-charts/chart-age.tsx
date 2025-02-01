import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import React from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

const ageRange = [
	{ range: 'under_18', Mitglieder: 0 },
	{ range: '18_to_25', Mitglieder: 3 },
	{ range: '25_to_35', Mitglieder: 13 },
	{ range: '35_to_45', Mitglieder: 8 },
	{ range: '45_to_60', Mitglieder: 5 },
	{ range: 'over_60', Mitglieder: 4 },
]

const chartConfig = {
	under_18: {
		label: 'u18',
		color: '#262A2B',
	},
	'18_to_25': {
		label: '18-25',
		color: '#262A2B',
	},
	'25_to_35': {
		label: '25-35',
		color: '#262A2B',
	},
	'35_to_45': {
		label: '35-45',
		color: '#262A2B',
	},
	'45_to_60': {
		label: '45-60',
		color: '#262A2B',
	},
	over_60: {
		label: 'ü60',
		color: '#262A2B',
	},
} satisfies ChartConfig

const ChartAge = () => {
	return (
		<ChartContainer
			config={chartConfig}
			className="h-[320px] w-full max-w-[600px]"
		>
			<BarChart accessibilityLayer data={ageRange}>
				<CartesianGrid vertical={false} />
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
