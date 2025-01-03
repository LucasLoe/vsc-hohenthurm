'use client'
import { PortableText } from '@portabletext/react'
import { Roboto_Slab } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

export function Title({ title }: { title: string }) {
	return (
		<h1
			className={cn(
				robotoSlab.className,
				'w-fit gap-2.5 text-2xl font-bold tracking-wider text-vsc-blue',
			)}
		>
			{title}
		</h1>
	)
}

export function Content({ content }: { content: any }) {
	return (
		<div className="md:pr-2 md:text-left">
			<PortableText value={content} />
		</div>
	)
}

export const DateCountdown = ({ date = '2025-06-06' }) => {
	const [totalMilliseconds, setTotalMilliseconds] = useState(
		new Date(date).getTime() - new Date().getTime(),
	)

	useEffect(() => {
		const timer = setInterval(() => {
			setTotalMilliseconds(new Date(date).getTime() - new Date().getTime())
		}, 1000)

		return () => clearInterval(timer)
	}, [date])

	// Calculate days, hours, minutes, and seconds
	const remainingDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24))

	const remainingHoursTotal = totalMilliseconds % (1000 * 60 * 60 * 24)
	const remainingHours = Math.floor(remainingHoursTotal / (1000 * 60 * 60))

	const remainingMinutesTotal = remainingHoursTotal % (1000 * 60 * 60)
	const remainingMinutes = Math.floor(remainingMinutesTotal / (1000 * 60))

	const remainingSecondsTotal = remainingMinutesTotal % (1000 * 60)
	const remainingSeconds = Math.floor(remainingSecondsTotal / 1000)

	// Rest of your component remains the same...
	const Item = ({ value, label }: { value: String; label: String }) => {
		return (
			<div className="flex aspect-square h-full flex-col place-items-center justify-center rounded-sm bg-white bg-gradient-to-b from-vsc-bg-light to-vsc-pink/20 p-1 shadow-lg">
				<p className="text-2xl font-bold">{value}</p>
				<p className="text-sm font-light">{label}</p>
			</div>
		)
	}

	if (totalMilliseconds <= 1000) return null

	return (
		<div className="w-full text-vsc-bg-dark">
			<p className="mb-4 w-full bg-gradient-to-r from-vsc-blue to-emerald-300 p-2 text-center text-lg tracking-wider">
				Bald geht es los! Unser Turnier startet in:
			</p>
			<div className="flex h-20 w-full place-items-center justify-center gap-x-4 p-1 text-vsc-bg-dark">
				<Item
					value={remainingDays.toString()}
					label={remainingDays === 1 ? 'Tag' : 'Tagen'}
				/>
				<Item
					value={remainingHours.toString()}
					label={remainingHours === 1 ? 'Stunde' : 'Stunden'}
				/>
				<Item value={remainingMinutes.toString()} label={'Minuten'} />
				<div className="hidden sm:block">
					<Item value={remainingSeconds.toString()} label={'Sekunden'} />
				</div>
			</div>
		</div>
	)
}
