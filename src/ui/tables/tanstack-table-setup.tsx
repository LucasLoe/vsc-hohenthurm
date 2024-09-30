import { createColumnHelper, ColumnDef } from '@tanstack/react-table'
import { TransformedTable } from './table-transformers' // Assuming you've defined your types in a separate file
import { VSCPlacementElement } from './table-components'

// Column helper to create typed columns
const columnHelper = createColumnHelper<TransformedTable['data'][number]>()

// Punktetabelle columns
const punktetabelleColumns: ColumnDef<TransformedTable['data'][number], any>[] =
	[
		columnHelper.display({
			id: 'placement',
			header: '',
			cell: ({ row }) => row.index + 1,
		}),
		columnHelper.accessor('team', {
			header: 'Team',
			cell: (info) => <p className="max-w-32 truncate">{info.getValue()}</p>,
		}),
		columnHelper.accessor('punkte', {
			header: () => (
				<>
					<span className="hidden sm:inline">Punkte</span>
					<span className="sm:hidden">Pkt</span>
				</>
			),
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('spiele', {
			header: () => (
				<>
					<span className="hidden sm:inline">Spiele</span>
					<span className="sm:hidden">Sp</span>
				</>
			),
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('siege', {
			header: () => (
				<>
					<span className="hidden sm:inline">Siege</span>
					<span className="sm:hidden">S</span>
				</>
			),
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('sätze', {
			header: () => (
				<>
					<span className="hidden sm:inline">Sätze</span>
					<span className="sm:hidden">Ges</span>
				</>
			),
			cell: (info) => info.getValue(),
		}),
	]

// Spielplan columns
const spielplanColumns: ColumnDef<TransformedTable['data'][number], any>[] = [
	columnHelper.accessor('datum', {
		header: 'Datum',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('uhrzeit', {
		header: 'Uhrzeit',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('heim', {
		header: 'Heim',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('gast', {
		header: 'Gast',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('ort', {
		header: 'Ort',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('ergebnis', {
		header: 'Ergebnis',
		cell: (info) => info.getValue(),
	}),
]

export function getColumns(tableType: TransformedTable['type']) {
	switch (tableType) {
		case 'Punktetabelle':
			return punktetabelleColumns
		case 'Spielplan':
			return spielplanColumns
		default:
			throw new Error(`Unexpected table type: ${tableType}`)
	}
}
