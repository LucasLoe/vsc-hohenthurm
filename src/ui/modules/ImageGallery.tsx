'use client'
import React, { useState } from 'react'
import Img from '../Img'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

const PreviewImage = ({
	image,
	onClick,
}: {
	image: Sanity.Image
	onClick: () => void
}) => {
	return (
		<div
			className="mx-auto aspect-square w-full cursor-pointer self-center bg-white p-0.5 shadow"
			onClick={onClick}
		>
			<Img
				className="aspect-square h-auto w-full self-center rounded bg-vsc-grey object-cover"
				image={image}
				imageWidth={800}
			/>
		</div>
	)
}

const ImageGallery = ({ images }: { images: Sanity.Image[] }) => {
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
		null,
	)
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	return (
		<section className="mx-auto max-w-4xl px-4 py-4 sm:px-12 sm:py-6">
			<div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
				{images?.map((image, idx) => (
					<Dialog
						key={idx}
						open={isDialogOpen && selectedImageIndex === idx}
						onOpenChange={(open) => {
							setIsDialogOpen(open)
							if (!open) setSelectedImageIndex(null)
						}}
					>
						<VisuallyHidden.Root>
							<DialogTitle>Bild</DialogTitle>
							<DialogDescription>{image.alt || 'Bild'}</DialogDescription>
						</VisuallyHidden.Root>
						<DialogTrigger asChild>
							<PreviewImage
								image={image}
								onClick={() => setSelectedImageIndex(idx)}
							/>
						</DialogTrigger>
						<DialogContent className="max-h-[80vh] overflow-hidden p-4 sm:max-w-3xl">
							<Carousel className="relative h-full w-full">
								<CarouselContent className="-ml-1">
									{images.map((carouselImage, index) => (
										<CarouselItem
											key={index}
											className="flex place-items-center pl-1"
										>
											<div className="h-[60vh] w-full">
												<Img
													image={carouselImage}
													alt={''}
													className="h-full w-full object-contain"
												/>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious className="left-2 border-0 bg-vsc-blue shadow-xl hover:border-0 focus:border-0 active:border-0" />
								<CarouselNext className="right-2 border-0 bg-vsc-blue shadow-xl hover:border-0 focus:border-0 active:border-0" />
							</Carousel>
						</DialogContent>
					</Dialog>
				))}
			</div>
		</section>
	)
}

export default ImageGallery
