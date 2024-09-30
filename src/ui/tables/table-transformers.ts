export type TableFromServer =
	| {
			tableType: 'Punktetabelle'
			tableTitle: string
			tableData: {
				rows: Array<{
					_key: string
					cells: [string, string, string, string, string]
				}>
			}
	  }
	| {
			tableType: 'Spielplan'
			tableTitle: string
			tableData: {
				rows: Array<{
					_key: string
					cells: [string, string, string, string, string, string]
				}>
			}
	  }

export type TransformedTable =
	| {
			type: 'Punktetabelle'
			data: Array<{
				team: string
				punkte: number
				spiele: number
				siege: number
				sätze: string
			}>
	  }
	| {
			type: 'Spielplan'
			data: Array<{
				datum: string
				uhrzeit: string
				heim: string
				gast: string
				ort: string
				ergebnis: string
			}>
	  }

export function transformToTanstack(
	sanityTable: TableFromServer,
): TransformedTable {
	const type = sanityTable.tableType
	const rows = sanityTable.tableData.rows

	if (type === 'Punktetabelle') {
		const data = rows.map((row) => {
			const [team, punkte, spiele, siege, saetze] = row.cells
			return {
				team,
				punkte: parseNumberSafely(punkte),
				spiele: parseNumberSafely(spiele),
				siege: parseNumberSafely(siege),
				sätze: saetze,
			}
		})
		return { type, data }
	}

	if (type === 'Spielplan') {
		const data = rows.map((row) => {
			const [datum, uhrzeit, heim, gast, ort, ergebnis] = row.cells
			return { datum, uhrzeit, heim, gast, ort, ergebnis: ergebnis as string }
		})
		return { type, data }
	}

	// Handle unexpected table types
	throw new Error(`Unexpected table type: ${type}`)
}

function parseNumberSafely(value: string): number {
	const parsed = parseInt(value, 10)
	if (isNaN(parsed)) {
		console.warn(`Failed to parse "${value}" as a number. Defaulting to 0.`)
		return 0
	}
	return parsed
}
