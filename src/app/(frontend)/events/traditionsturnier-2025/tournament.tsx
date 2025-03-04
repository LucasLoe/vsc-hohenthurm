import React from 'react'
import RegistrationFormTournament2024 from './form'
import client from '@/lib/sanity/client'
import Img from '@/ui/Img'
import { Content, DateCountdown, Title } from './client'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

type VolleyballPage = {
	heading: string
	identifier: string
	images: any[]
	content: any[]
}

const getVolleyballPage = async () => {
	const query = `*[_type == "tournament" && identifier == "turnier-2025"][0]`
	return await client.fetch<VolleyballPage>(query)
}

const TournamentPage = async () => {
	const pageData = await getVolleyballPage()

	return (
		<div className="relative min-h-[calc(100vh-2000px)] w-full border-t-2 border-white bg-vsc-bg-dark text-vsc-bg-light">
			<Image
				src={'/images/background.jpg'}
				alt="Background"
				fill
				priority
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-black/40" />
			<div className="container relative mx-auto max-w-6xl px-4 py-8 md:px-8">
				<div className="grid grid-cols-1 items-stretch gap-8 md:grid-flow-row-dense md:grid-cols-2">
					<div className="space-y-6 text-white">
						<h2 className="text-3xl font-bold leading-tight drop-shadow-xl md:text-3xl lg:text-5xl">
							Volleyballturnier des VSC Hohenthurm
						</h2>

						<div className="space-y-4 rounded-xl border border-white/20 bg-black/50 p-6 text-sm backdrop-blur-md">
							<Content content={pageData?.content} />
						</div>
					</div>

					<div className="flex flex-col space-y-4">
						<RegistrationFormTournament2024 />
					</div>
				</div>
			</div>
		</div>
	)
}

export default TournamentPage
