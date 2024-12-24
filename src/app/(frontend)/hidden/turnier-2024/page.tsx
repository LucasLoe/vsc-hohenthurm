import React from 'react'
import RegistrationFormTournament2024 from './form'
import client from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import Img from '@/ui/Img'
import { Roboto_Slab } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Content, Title } from './client'

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

type VolleyballPage = {
	heading: string
	identifier: string
	images: any[]
	content: any[]
}

export const getVolleyballPage = async () => {
	const query = `*[_type == "tournament" && identifier == "turnier-2025"][0]`
	return await client.fetch<VolleyballPage>(query)
}

const page = async () => {
	const pageData = await getVolleyballPage()

	return (
		<div className="min-h-[calc(100vh-229px)] w-screen border-t-2 border-white bg-vsc-bg-dark text-vsc-bg-light">
			<div className="container mx-auto flex max-w-5xl flex-col gap-4 px-8 py-4 md:py-8">
				<Title title={pageData?.heading} />
				<div className="flex w-full flex-col items-stretch gap-y-4 py-4 md:flex-row">
					<div className="flex w-full flex-col gap-y-8 sm:pt-4 md:w-1/2">
						<div className="relative mx-auto h-40 w-full max-w-md">
							<div className="absolute left-0 top-2 -rotate-6">
								<div className="aspect-[4/3] w-48 bg-vsc-bg-light p-2 shadow-2xl">
									<Img
										image={pageData?.images[0]}
										imageWidth={500}
										className="h-full w-full self-center bg-vsc-grey object-cover"
									/>
								</div>
							</div>
							<div className="absolute left-24 rotate-12">
								<div className="aspect-[4/3] w-48 bg-vsc-bg-light p-2 shadow-2xl">
									<Img
										image={pageData?.images[1]}
										imageWidth={500}
										className="h-full w-full self-center bg-vsc-grey object-cover"
									/>
								</div>
							</div>
							<div className="absolute left-40 hidden rotate-6 sm:block">
								<div className="aspect-[4/3] w-48 bg-vsc-bg-light p-2 shadow-2xl">
									<Img
										image={pageData?.images[2]}
										imageWidth={500}
										className="h-full w-full self-center bg-vsc-grey object-cover"
									/>
								</div>
							</div>
						</div>
						<Content content={pageData?.content} />
					</div>
					<div className="mx-auto flex w-full place-items-center md:w-1/2">
						<RegistrationFormTournament2024 />
					</div>
				</div>
			</div>
		</div>
	)
}

export default page
