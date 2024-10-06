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
	preview: {
		select: {
			members: 'boardMembers',
		},
		prepare(selection) {
			const { members } = selection
			return {
				title: 'VSC Board Members',
				subtitle: `${members.length} member${members.length === 1 ? '' : 's'}`,
			}
		},
	},
})
