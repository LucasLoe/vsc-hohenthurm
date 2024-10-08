'use client'
import React, { Fragment, useRef } from 'react'
import { Roboto_Slab } from 'next/font/google'
import Img, { Source } from '../Img'
import { ArrowDownIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

const FullscreenHero = ({
	textLines,
	image,
	isFullScreen,
}: Partial<{
	textLines: string[]
	image: Sanity.Image
	isFullScreen: boolean
}>) => {
	const heroRef = useRef<HTMLDivElement>(null)

	const scrollByScreenHeight = () => {
		if (heroRef.current && window) {
			const yOffset = 0
			const y =
				heroRef.current.getBoundingClientRect().bottom +
				window.scrollY +
				yOffset

			window.scrollTo({
				top: y,
				behavior: 'smooth',
			})
		}
	}

	return (
		<div
			ref={heroRef}
			className={`relative ${isFullScreen ? 'h-[calc(100vh-80px)]' : 'h-[calc(50vh-80px)]'} w-full shadow-lg`}
		>
			<picture>
				<Source image={image} imageWidth={1800} />
				<Img
					className="h-full w-full rounded object-cover"
					image={image}
					imageWidth={1800}
					draggable={false}
					loading="eager"
				/>
			</picture>
			<div className="z-2 to-vsc-pink-900/30 absolute inset-0 h-full w-full bg-gradient-to-b from-vsc-bg-dark to-vsc-blue/30" />
			<div className="absolute inset-0 flex flex-col items-center justify-center text-left">
				{textLines
					? textLines.map((line, i) => (
							<Fragment key={i}>
								<p
									className={`${robotoSlab.className} text-left text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-[4rem] md:text-[6rem]`}
								>
									{line}
								</p>
								<br />
							</Fragment>
						))
					: null}
			</div>
			{isFullScreen ? (
				<Button
					asChild
					size="icon"
					className="absolute bottom-32 left-1/2 size-12 -translate-x-1/2 transform cursor-pointer bg-transparent shadow-xl hover:bg-vsc-bg-dark/80 focus:bg-vsc-bg-dark/80 active:bg-vsc-bg-dark/80 sm:bottom-8"
					onClick={scrollByScreenHeight}
				>
					<ArrowDownIcon className="size-12 rounded-sm border-[1px] border-vsc-blue p-2 text-vsc-blue sm:block" />
				</Button>
			) : null}
		</div>
	)
}

export default FullscreenHero
