// schemas/registration.ts
import { defineType } from 'sanity'

export default defineType({
	name: 'registration',
	title: 'Registrations',
	type: 'document',
	fields: [
		{
			name: 'teamName',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'playerCount',
			type: 'number',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'contactPerson',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'contact',
			type: 'string',
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'notes',
			type: 'text',
		},
		{
			name: 'submittedAt',
			type: 'datetime',
		},
	],
})
