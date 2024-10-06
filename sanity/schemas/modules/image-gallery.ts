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
	],
})
