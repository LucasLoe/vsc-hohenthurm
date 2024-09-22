import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'

export default defineType({
	name: 'fullscreen-hero',
	title: 'Fullscreen Hero',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	fields: [
		defineField({
			name: 'textLines',
			title: 'Hero Text Lines',
			type: 'array',
			of: [{ type: 'string' }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'image',
			title: 'Hero Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
					title: 'Alternative Text',
				}),
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'isFullScreen',
			title: 'Full Screen',
			type: 'boolean',
			description: 'Toggle between full screen and half screen',
			initialValue: true,
		}),
	],
	preview: {
		select: {
			title: 'textLines',
			media: 'image',
			isFullScreen: 'isFullScreen',
		},
		prepare({ title, media, isFullScreen }) {
			return {
				title:
					title && title.length > 0 ? title[0] : 'Untitled Fullscreen Hero',
				subtitle: `${isFullScreen ? 'Full' : 'Half'} Screen Hero`,
				media,
			}
		},
	},
})
