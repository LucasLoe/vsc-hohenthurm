import { defineType, defineField } from 'sanity'

type TableType = 'Spielplan' | 'Punktetabelle'

const tableTypes: Record<TableType, string[]> = {
	Punktetabelle: ['Team', 'Punkte', 'Spiele', 'Siege', 'Sätze'],
	Spielplan: ['Datum', 'Uhrzeit', 'Heim', 'Gast', 'Ort', 'Ergebnis'],
}

interface LeagueTableDocument {
	tableType?: TableType
	tableData?: {
		rows: Array<{
			_type: 'row'
			cells: string[]
		}>
	}
}

export const LeagueTable = defineType({
	name: 'leagueTable',
	type: 'object',
	title: 'Liga-Tabelle',
	fields: [
		defineField({
			name: 'tableTitle',
			type: 'string',
			title: 'Table Title',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'tableType',
			type: 'string',
			title: 'Table Type',
			options: {
				list: Object.keys(tableTypes),
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'helpSpielplan',
			type: 'string',
			title: 'Die Spalten müssen wie folgt befüllt werden:',
			description: `${tableTypes['Spielplan'].join(', ')}`,
			readOnly: true,
			components: {
				input: () => null,
			},
			hidden: ({ parent }: { parent?: Partial<LeagueTableDocument> }) => {
				return parent?.tableType !== 'Spielplan'
			},
		}),
		defineField({
			name: 'helpPunktetabelle',
			type: 'string',
			title: 'Die Spalten müssen wie folgt befüllt werden:',
			description: `${tableTypes['Punktetabelle'].join(', ')}`,
			readOnly: true,
			components: {
				input: () => null,
			},
			hidden: ({ parent }: { parent?: Partial<LeagueTableDocument> }) => {
				return parent?.tableType !== 'Punktetabelle'
			},
		}),
		defineField({
			name: 'tableData',
			type: 'table',
			title: 'Tabellen-Daten',
		}),
	],
})
