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
			className="mx-auto aspect-square w-24 cursor-pointer self-center bg-white p-0.5 shadow sm:w-36"
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
	const [selectedImage, setSelectedImage] = useState<Sanity.Image | null>(null)

	return (
		<section className="mx-auto max-w-5xl px-4 sm:px-12">
			<div className="grid auto-cols-max grid-flow-col sm:gap-2">
				{images
					? images.map((image, idx) => (
							<Dialog key={idx}>
								<VisuallyHidden.Root>
									<DialogTitle>Bild</DialogTitle>
									<DialogDescription>{image.alt || 'Bild'} </DialogDescription>
								</VisuallyHidden.Root>
								<DialogTrigger asChild>
									<PreviewImage
										image={image}
										onClick={() => setSelectedImage(image)}
									/>
								</DialogTrigger>
								<DialogContent className="p-2 sm:max-w-3xl sm:p-4">
									<Img
										className="h-auto max-h-[80vh] w-full object-contain"
										image={image}
										imageWidth={1200}
									/>
								</DialogContent>
							</Dialog>
						))
					: null}
			</div>
		</section>
	)
}

export default ImageGallery
