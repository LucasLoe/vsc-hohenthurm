import { defineType } from 'sanity'

export default defineType({
	name: 'heading',
	title: 'Heading',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'color',
			title: 'Color',
			type: 'string',
			options: {
				list: ['pink', 'blue', 'dark'],
			},
		},
		{
			name: 'type',
			title: 'Type',
			type: 'string',
			options: {
				list: ['h2', 'h3'],
			},
		},
	],
	preview: {
		select: {
			title: 'title',
			color: 'color',
			type: 'type',
		},
		prepare(selection) {
			const { title, color, type } = selection
			return {
				title: title || 'Untitled Heading',
				subtitle: `${type.toUpperCase()} - ${color.charAt(0).toUpperCase() + color.slice(1)}`,
			}
		},
	},
})
