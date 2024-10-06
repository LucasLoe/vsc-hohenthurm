import { defineType } from 'sanity'

export default defineType({
	name: 'spacing',
	title: 'Spacing',
	type: 'object',
	fields: [
		{
			name: 'value',
			title: 'Value',
			type: 'string',
			options: {
				list: ['sm', 'md', 'lg', 'xl'],
			},
		},
		{
			name: 'responsive',
			title: 'Responsive',
			description:
				'Controls whether the spacing is responsive or not. If responsive, the spacing will be halved on small screens.',
			type: 'boolean',
			options: {
				layout: 'switch',
			},
		},
	],
})
