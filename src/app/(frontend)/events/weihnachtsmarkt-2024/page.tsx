import React, { ReactNode } from 'react'
import Snowfall from './snowfall'
import './snowfall.css'
import { Mountains_of_Christmas } from 'next/font/google'
import { cn } from '@/lib/utils'

const mountainsOfChristmas = Mountains_of_Christmas({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
})

const Entry = ({
	heading,
	children,
}: {
	heading: string
	children: ReactNode
}) => {
	return (
		<div className="py-2">
			<h3
				className={`pb-4 text-xl font-bold ${mountainsOfChristmas.className}`}
			>
				{heading}
			</h3>
			<div className="text-md ml-4 font-light">{children}</div>
		</div>
	)
}

const ORGANIZED_BY = [
	'Frauenverein',
	'Gartenverein Mölbitz',
	'Grundschule',
	'Hort',
	'Kita',
	'Regio Farmers',
	'Die lustigen Thurmgeister',
	'Kultur- und Heimatgeschichtsverein',
	'VSC Hohenthurm',
	'VfB Blau-Weiß Hohenthurm',
	'Fa. Siegfried Barth',
	'Verein für bezahlbare Kommunalabgaben',
	'Gemeindekirchenrat',
]

const page = () => {
	return (
		<div className="min-h-[calc(100vh-80px)] w-screen bg-vsc-bg-dark text-vsc-bg-light">
			<h3
				className={cn(
					'py-2 text-center text-2xl lg:py-4 lg:text-6xl',
					mountainsOfChristmas.className,
				)}
			>
				Ho Ho Ho!
			</h3>
			<h2
				className={cn(
					'py-2 text-center text-2xl lg:py-4 lg:text-5xl',
					mountainsOfChristmas.className,
				)}
			>
				Weihnachtsmarkt in Hohenthurm
			</h2>
			<h2
				className={cn(
					'pb-4 text-center text-2xl lg:text-4xl',
					mountainsOfChristmas.className,
				)}
			>
				Samstag 30.11.2024
			</h2>
			<section className="mx-auto max-w-prose px-4 pt-4 font-light lg:text-lg">
				<p>Liebe Freunde des gepflegten Weihnachtsmarkts oder Vereinsfreunde</p>
				<br />
				<p>
					Es ist wieder soweit und der jährliche Weihnachtsmarkt in Hohenthurm
					steht vor der Tür. Organisiert von fleißigen Vereinen, Institutionen
					oder Personen aus der Umgebung, werden euch auch in diesem Jahr warme
					Leckereien, Getränke und Programm zum Einklang in die kalte Jahreszeit
					serviert.
				</p>
				<br />
				<p>
					Anbei findet ihr eine kurze Übersicht, damit ihr wisst was euch
					erwarten wird:
				</p>
			</section>
			<section className="mx-auto flex max-w-prose flex-col gap-y-4 p-4 md:gap-y-8 lg:text-lg">
				<Entry heading="Wo und Wann?">
					{
						<>
							<p>15-21 Uhr</p>
							<p>Von-Wuthenau-Platz 5, 06118 Hohenthurm</p>
						</>
					}
				</Entry>
				<Entry heading="Programm">
					{
						<ul className="list-none">
							<li className='flex items-start gap-2 before:text-vsc-blue before:content-["❄"]'>
								Programm mit Musikschule Fröhlich, Schulchor und den lustigen
								Thurmgeistern
							</li>
							<li className='flex items-start gap-2 before:text-vsc-blue before:content-["❄"]'>
								Besuch vom Weihnachtsmann und der Märchentante
							</li>
							<li className='flex items-start gap-2 before:text-vsc-blue before:content-["❄"]'>
								Kinderbasteln, Tombola und Weihnachtsmusik
							</li>
							<li className='flex items-start gap-2 before:text-vsc-blue before:content-["❄"]'>
								Warme Getränke und warmes Essen gegen die kalte Jahreszeit
							</li>
						</ul>
					}
				</Entry>
				<Entry heading="Organisiert von:">
					<div className="align-items-center flex flex-wrap justify-start gap-2">
						{ORGANIZED_BY.map((org) => (
							<p
								key={org}
								className="rounded-full border-[1px] border-dashed border-white px-2 py-0.5 text-sm font-light"
							>
								{org}
							</p>
						))}
					</div>
				</Entry>
			</section>
			<Snowfall />
		</div>
	)
}

export default page
