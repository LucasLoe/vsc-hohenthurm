'use client'
import React, { useState } from 'react'
import Img from '../Img'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { ChevronLeft, ChevronRight, CircleX, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

	const handlePrevious = () => {
		setSelectedImageIndex((prev) =>
			prev !== null ? (prev - 1 + images.length) % images.length : null,
		)
	}

	const handleNext = () => {
		setSelectedImageIndex((prev) =>
			prev !== null ? (prev + 1) % images.length : null,
		)
	}

	return (
		<section className="mx-auto max-w-4xl px-4 py-4 sm:px-12 sm:py-6">
			<div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
				{images
					? images.map((image, idx) => (
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
									<DialogDescription>{image.alt || 'Bild'} </DialogDescription>
								</VisuallyHidden.Root>
								<DialogTrigger asChild>
									<PreviewImage
										image={image}
										onClick={() => setSelectedImageIndex(idx)}
									/>
								</DialogTrigger>
								<DialogContent className="p-2 sm:max-w-3xl sm:p-4">
									<DialogClose asChild>
										<button className="z-50 ml-auto mr-0 flex size-6 place-items-center rounded-full bg-vsc-bg-dark p-0.5 text-white shadow-lg">
											<X className="m-auto size-4" />
										</button>
									</DialogClose>
									<div className="relative h-auto max-h-[80vh] w-full">
										<Img
											className="relative h-full w-full object-contain"
											image={
												selectedImageIndex !== null
													? images[selectedImageIndex]
													: image
											}
											imageWidth={1200}
										/>
										<button
											onClick={handlePrevious}
											className="absolute bottom-2 left-2 flex -translate-y-1/2 place-items-center rounded-full bg-vsc-blue p-1 shadow-lg hover:bg-vsc-blue/50"
											aria-label="Previous image"
										>
											<ChevronLeft className="size-6" />
										</button>
										<button
											onClick={handleNext}
											className="absolute bottom-2 right-2 flex -translate-y-1/2 place-items-center rounded-full bg-vsc-blue p-1 shadow-lg hover:bg-vsc-blue/50"
											aria-label="Next image"
										>
											<ChevronRight className="size-6" />
										</button>
									</div>
								</DialogContent>
							</Dialog>
						))
					: null}
			</div>
		</section>
	)
}

export default ImageGallery
