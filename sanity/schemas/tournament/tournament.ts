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
			name: 'images',
			type: 'array',
			description: 'Advertisement images - exactly 3!',
			of: [defineArrayMember({ type: 'image' })],
			validation: (Rule) => Rule.required().min(3).max(3),
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [defineArrayMember({ type: 'block' })],
			validation: (Rule) => Rule.required(),
		}),
	],
})
