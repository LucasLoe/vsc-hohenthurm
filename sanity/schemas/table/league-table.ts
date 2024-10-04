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
			name: 'helpPunktetabelle',
			type: 'string',
			title: 'Die Spalten müssen wie folgt befüllt werden:',
			description: `${tableTypes['Punktetabelle'].join(', ')}`,
			readOnly: true,
			components: {
				input: () => null,
			},
		}),
		defineField({
			name: 'tableData',
			type: 'table',
			title: 'Tabellen-Daten',
		}),
	],
})
