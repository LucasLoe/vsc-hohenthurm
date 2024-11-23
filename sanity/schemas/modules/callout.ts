import { defineField, defineType } from 'sanity'
import { VscInspect } from 'react-icons/vsc'
import { getBlockText } from '@sanity/src/utils'

export default defineType({
	name: 'callout',
	title: 'Callout',
	icon: VscInspect,
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'variant',
			title: 'Variante',
			type: 'string',
			options: {
				list: [
					{ title: 'Standard', value: 'normal' },
					{ title: 'Weihnachten', value: 'christmas' },
				],
				layout: 'radio',
			},
		}),
		defineField({
			name: 'cta',
			title: 'Call-to-action',
			type: 'cta',
		}),
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'Callout',
		}),
	},
})
