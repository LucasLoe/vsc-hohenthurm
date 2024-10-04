import { createColumnHelper, ColumnDef } from '@tanstack/react-table'
import { TransformedTable } from './table-transformers'
import { useMemo } from 'react'

const columnHelper = createColumnHelper<TransformedTable['data'][number]>()

const createPunktetabelleColumns = (): ColumnDef<
	TransformedTable['data'][number],
	any
>[] => [
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

export function useColumns() {
	return useMemo(() => {
		return createPunktetabelleColumns()
	}, [])
}
