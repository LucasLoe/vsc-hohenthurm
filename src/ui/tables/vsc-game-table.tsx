'use client'

import React from 'react'
import { TableFromServer, transformToTanstack } from './table-transformers'
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
} from '@tanstack/react-table'
import { getColumns } from './tanstack-table-setup' // Import the getColumns function©
import { VSCTElement, VSCTHead, VSCTRow } from './table-components'

const VSCGameTable = (sanityTable: TableFromServer) => {
	const { type: tabletype, data: tabledata } = transformToTanstack(sanityTable)
	console.log('render')
	const columns = getColumns(tabletype)

	const table = useReactTable({
		data: tabledata,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className="flex items-center justify-center px-4 py-12">
			<table className="border-separate border-spacing-y-1">
				<thead className="text-sm sm:text-lg">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<VSCTHead key={header.id}>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</VSCTHead>
							))}
						</tr>
					))}
				</thead>
				<tbody className="sm:text-medium text-sm text-slate-200">
					{table.getRowModel().rows.map((row, idr) => (
						<VSCTRow key={row.id}>
							{row.getVisibleCells().map((cell) => {
								return (
									<VSCTElement key={cell.id} identifier={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</VSCTElement>
								)
							})}
						</VSCTRow>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default VSCGameTable
