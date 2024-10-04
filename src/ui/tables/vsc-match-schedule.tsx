import React from 'react'
import { Roboto_Slab } from 'next/font/google'
import { TriangleRightIcon } from '@radix-ui/react-icons'
import { LuMapPin } from 'react-icons/lu'

const roboto = Roboto_Slab({ subsets: ['latin'] })

export type MatchSchedule = {
	title: string
	matches: {
		date: string // Format: YYYY-MM-DD
		time: string // Format: HH:mm
		homeTeam: string
		guestTeam: string
		location: string
		result?: string
	}[]
}

const germanMonthAbbreviations: string[] = [
	'Jan',
	'Feb',
	'Mär',
	'Apr',
	'Mai',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Okt',
	'Nov',
	'Dez',
]

const VSCMatchSchedule = (props: MatchSchedule) => {
	const { title, matches } = props
	return (
		<section className="mx-auto flex w-full max-w-6xl flex-col place-items-center px-4 py-8 sm:px-12">
			<h2
				className={`mb-6 ml-0 mr-auto text-2xl font-bold text-vsc-bg-dark sm:mb-12 ${roboto.className} flex w-fit items-center`}
			>
				<TriangleRightIcon className="size-12 text-vsc-pink" />
				{title}
			</h2>
			<div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
				{matches
					? matches.map((match, index) => <MatchEntry key={index} {...match} />)
					: null}
			</div>
		</section>
	)
}

const MatchEntry = (props: MatchSchedule['matches'][0]) => {
	return (
		<div className="flex w-full">
			<DateField date={props.date} />
			<InfoField matches={props} />
		</div>
	)
}

const DateField = (props: { date: string }) => {
	const day = props.date.split('-')[2].padStart(2, '0')
	const monthAsNumber = parseInt(props.date.split('-')[1])

	return (
		<div className="relative z-10 flex size-24 flex-col items-center justify-center rounded bg-vsc-bg-dark shadow-xl">
			<p className="text-4xl font-black text-vsc-pink">{day}</p>
			<p className="text-2xl font-light text-vsc-pink">
				{germanMonthAbbreviations[monthAsNumber - 1]}
			</p>
		</div>
	)
}

const InfoField = (props: { matches: MatchSchedule['matches'][0] }) => {
	return (
		<div className="relative z-0 -ml-4 mt-2 h-20 grow rounded bg-vsc-bg-dark/10 py-2 pl-8 shadow">
			<p className="sm:text-md truncate pr-2 text-sm font-medium text-vsc-bg-dark xl:text-lg">
				{props.matches.homeTeam} vs. {props.matches.guestTeam}
			</p>
			<p className="flex items-center gap-1 truncate pr-2 text-sm font-light text-gray-500">
				<LuMapPin size={12} /> {props.matches.location}
			</p>
			<p className="flex items-center gap-1 truncate pr-2 text-sm font-light text-gray-500">
				{props.matches.time}
			</p>
			{props.matches.result ? (
				<ResultField result={props.matches.result} />
			) : null}
		</div>
	)
}

const ResultField = (props: { result: string }) => {
	return (
		<p className="absolute -bottom-2 -right-2 z-10 h-10 w-fit rounded bg-vsc-blue px-2 py-2 text-lg font-medium text-vsc-bg-dark shadow-lg sm:-bottom-4 sm:-right-4">
			{props.result}
		</p>
	)
}

export default VSCMatchSchedule
