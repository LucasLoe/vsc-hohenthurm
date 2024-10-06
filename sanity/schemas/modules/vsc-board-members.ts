import { defineType } from 'sanity'

export default defineType({
	name: 'vsc-boardmembers',
	title: 'VSC Board Members',
	type: 'object',
	fields: [
		{
			name: 'boardMembers',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'name',
							type: 'string',
							title: 'Name',
						},
						{
							name: 'image',
							type: 'image',
							title: 'Image',
						},
					],
				},
			],
		},
	],
})
