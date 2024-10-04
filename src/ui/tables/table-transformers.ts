export type TableFromServer = {
	tableType: 'Punktetabelle'
	tableTitle: string
	tableData: {
		rows: Array<{
			_key: string
			cells: [string, string, string, string, string]
		}>
	}
}

export type TransformedTable = {
	data: Array<{
		team: string
		punkte: number
		spiele: number
		siege: number
		sätze: string
	}>
}

export function transformToTanstack(
	sanityTable: TableFromServer,
): TransformedTable {
	const rows = sanityTable.tableData.rows

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
	return { data }
}

function parseNumberSafely(value: string): number {
	const parsed = parseInt(value, 10)
	if (isNaN(parsed)) {
		// console.warn(`Failed to parse "${value}" as a number. Defaulting to 0.`)
		return 0
	}
	return parsed
}
