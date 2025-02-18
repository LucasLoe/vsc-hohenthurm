import { defineField, defineType } from 'sanity'
import { BiBarChartAlt2 } from 'react-icons/bi'

export default defineType({
	name: 'vereinInZahlen',
	title: 'Verein in Zahlen',
	icon: BiBarChartAlt2,
	type: 'object',
	fields: [
		// General Content Fields
		defineField({
			name: 'pretitle',
			title: 'Pretitle',
			type: 'string',
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [{ type: 'block' }],
		}),

		// Layout Options
		defineField({
			name: 'layoutOptions',
			title: 'Layout Options',
			type: 'object',
			fields: [
				defineField({
					name: 'onRight',
					title: 'On Right',
					type: 'boolean',
					initialValue: false,
				}),
				defineField({
					name: 'onBottom',
					title: 'On Bottom',
					type: 'boolean',
					initialValue: false,
				}),
				defineField({
					name: 'colorOnMobile',
					title: 'Color on Mobile',
					type: 'boolean',
					initialValue: false,
				}),
			],
		}),

		// Age Distribution
		defineField({
			name: 'ageDistribution',
			title: 'Age Distribution',
			type: 'object',
			fields: [
				defineField({
					name: 'under_18',
					title: 'Under 18',
					type: 'number',
					initialValue: 0,
				}),
				defineField({
					name: 'age_18_to_25',
					title: '18 to 25',
					type: 'number',
					initialValue: 0,
				}),
				defineField({
					name: 'age_25_to_35',
					title: '25 to 35',
					type: 'number',
					initialValue: 0,
				}),
				defineField({
					name: 'age_35_to_45',
					title: '35 to 45',
					type: 'number',
					initialValue: 0,
				}),
				defineField({
					name: 'age_45_to_60',
					title: '45 to 60',
					type: 'number',
					initialValue: 0,
				}),
				defineField({
					name: 'over_60',
					title: 'Over 60',
					type: 'number',
					initialValue: 0,
				}),
			],
		}),

		// Geographic Distribution
		defineField({
			name: 'geographicDistribution',
			title: 'Geographic Distribution',
			type: 'object',
			fields: [
				defineField({
					name: 'halleSaale',
					title: 'Halle (Saale)',
					type: 'number',
					initialValue: 0,
				}),
				defineField({
					name: 'landsberg',
					title: 'Landsberg',
					type: 'number',
					initialValue: 0,
				}),
				defineField({
					name: 'kabelsketal',
					title: 'Kabelsketal',
					type: 'number',
					initialValue: 0,
				}),
				defineField({
					name: 'merseburg',
					title: 'Merseburg',
					type: 'number',
					initialValue: 0,
				}),
				defineField({
					name: 'leipzig',
					title: 'Leipzig',
					type: 'number',
					initialValue: 0,
				}),
				defineField({
					name: 'anderes',
					title: 'Anderes',
					type: 'number',
					initialValue: 0,
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'pretitle',
		},
	},
})
