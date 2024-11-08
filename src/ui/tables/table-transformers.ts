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

	const data = rows
		.map((row) => {
			const [team, punkte, spiele, siege, saetze] = row.cells
			return {
				team,
				punkte: parseNumberSafely(punkte),
				spiele: parseNumberSafely(spiele),
				siege: parseNumberSafely(siege),
				sätze: saetze,
			}
		})
		.sort((a, b) => {
			// sort by PUNKTE
			if (a.punkte !== b.punkte) {
				return b.punkte - a.punkte
			}
			// If PUNKTE are equal, sort by SIEGE
			return b.siege - a.siege
		})

	return { data }
}

function parseNumberSafely(value: string): number {
	const parsed = parseInt(value, 10)
	if (isNaN(parsed)) {
		return 0
	}
	return parsed
}
