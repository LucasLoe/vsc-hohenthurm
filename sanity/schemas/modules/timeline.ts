import { defineType, defineField } from 'sanity'

export default defineType({
	name: 'timeline',
	title: 'Timeline',
	type: 'object',
	fields: [
		defineField({
			name: 'entries',
			title: 'Timeline Entries',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'date',
							title: 'Date',
							type: 'date',
						},
						{
							name: 'title',
							title: 'Title',
							type: 'string',
						},
						{
							name: 'text',
							title: 'Text',
							type: 'text',
						},
						{
							name: 'image',
							title: 'Image',
							type: 'image',
						},
						{
							name: 'cta',
							title: 'Call to Action - Link',
							type: 'cta',
						},
						{
							name: 'icon',
							title: 'Icon',
							type: 'string',
							options: {
								list: [
									{ title: 'Volleyball', value: 'volleyball' },
									{ title: 'Trophy', value: 'trophy' },
									{ title: 'Bus', value: 'bus' },
								],
								layout: 'dropdown',
							},
						},
					],
				},
			],
		}),
	],
})
