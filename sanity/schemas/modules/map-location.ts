import { defineType, defineField } from 'sanity'

export default defineType({
	name: 'mapLocation',
	title: 'Karte mit Location',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Überschrift',
			type: 'string',
		}),
		defineField({
			name: 'description',
			title: 'Beschreibung',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'coordinates',
			title: 'Coordinates',
			type: 'geopoint',
		}),
		defineField({
			name: 'googleMapsLink',
			title: 'Google Maps Link',
			type: 'string',
		}),
		defineField({
			name: 'layout',
			title: 'Layout',
			type: 'string',
			options: {
				list: [
					{ title: 'Card', value: 'card' },
					{ title: 'Full Width', value: 'fullWidth' },
				],
				layout: 'radio',
			},
		}),
	],
})
