import { defineType } from 'sanity'

export default defineType({
	name: 'imageGallery',
	title: 'Image Gallery',
	type: 'object',
	fields: [
		{
			name: 'images',
			type: 'array',
			of: [
				{
					type: 'image',
				},
			],
		},
		{
			name: 'position',
			title: 'Gallery Position in Blog Posts',
			type: 'string',
			options: {
				list: [
					{ title: 'Top of page', value: 'top' },
					{ title: 'Bottom of page', value: 'bottom' },
				],
				layout: 'radio',
			},
			initialValue: 'top',
		},
	],
	preview: {
		select: {
			images: 'images',
		},
		prepare(selection) {
			const { images } = selection
			const imageCount = images ? images.length : 0
			return {
				title: 'Image Gallery',
				subtitle: `${imageCount} image${imageCount === 1 ? '' : 's'}`,
			}
		},
	},
})
