// schemas/volleyballPage.ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
	name: 'tournament',
	title: 'Tournament',
	type: 'document',
	fields: [
		defineField({
			name: 'heading',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'identifier',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [defineArrayMember({ type: 'block' })],
			validation: (Rule) => Rule.required(),
		}),
	],
})
