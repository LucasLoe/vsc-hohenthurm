import { defineType, defineField } from 'sanity'

export const matchSchedule = defineType({
	name: 'matchSchedule',
	title: 'Spielplan',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Titel',
			type: 'string',
			initialValue: 'Spielplan',
		}),
		defineField({
			name: 'matches',
			title: 'Spiele',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'match',
					title: 'Match',
					fields: [
						defineField({
							name: 'date',
							title: 'Datum',
							type: 'date',
							options: {
								dateFormat: 'YYYY-MM-DD',
							},
						}),
						defineField({
							name: 'time',
							title: 'Uhrzeit',
							type: 'string',
						}),
						defineField({
							name: 'homeTeam',
							title: 'Heim',
							type: 'string',
						}),
						defineField({
							name: 'guestTeam',
							title: 'Gast',
							type: 'string',
						}),
						defineField({
							name: 'location',
							title: 'Ort',
							type: 'string',
						}),
						defineField({
							name: 'result',
							title: 'Ergebnis',
							type: 'string',
						}),
					],
				},
			],
		}),
	],
})
