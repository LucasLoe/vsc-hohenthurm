import Image from 'next/image'
import React from 'react'
import { Roboto_Slab } from 'next/font/google'
import Img, { Source } from '../Img'

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
	return (
		<div
			className={`relative ${isFullScreen ? 'h-[calc(100vh-80px)]' : 'h-[calc(50vh-80px)]'} w-full`}
		>
			<picture>
				<Source image={image} imageWidth={1800} />
				<Img
					className="h-full w-full rounded object-cover"
					image={image}
					imageWidth={1800}
					draggable={false}
				/>
			</picture>
			<div className="z-2 to-vsc-pink-900/30 absolute inset-0 h-full w-full bg-gradient-to-b from-vsc-bg-dark to-vsc-blue/30" />
			<div className="absolute inset-0 flex flex-col items-center justify-center text-left">
				{textLines
					? textLines.map((line, i) => (
							<>
								<p
									key={i}
									className={`${robotoSlab.className} text-left text-[3rem] font-extrabold leading-tight text-white drop-shadow-lg md:text-[4rem] lg:text-[6rem]`}
								>
									{line}
								</p>
								<br />
							</>
						))
					: null}
			</div>
		</div>
	)
}

export default FullscreenHero
