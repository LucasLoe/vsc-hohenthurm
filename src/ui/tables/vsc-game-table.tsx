'use client'

import React, { useMemo } from 'react'
import { TableFromServer, transformToTanstack } from './table-transformers'
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
} from '@tanstack/react-table'
import { useColumns } from './tanstack-table-setup'
import { VSCTElement, VSCTHead, VSCTRow } from './table-components'
import { TriangleRightIcon } from '@radix-ui/react-icons'
import { Roboto_Slab } from 'next/font/google'

const roboto = Roboto_Slab({ subsets: ['latin'] })

const VSCGameTable = (sanityTable: TableFromServer) => {
	const { data: tableData } = useMemo(
		() => transformToTanstack(sanityTable),
		[sanityTable],
	)
	const columns = useColumns()

	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<section className="flex flex-col place-items-center px-4 py-6 sm:py-12">
			<h2
				className={`mb-2 text-2xl font-bold text-vsc-bg-dark sm:mb-12 ${roboto.className} flex w-fit items-center`}
			>
				<TriangleRightIcon className="size-12 text-vsc-pink" />
				{sanityTable.tableTitle}
			</h2>
			<table className="border-separate border-spacing-y-2">
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
				<tbody className="sm:text-medium text-sm text-black">
					{table.getRowModel().rows.map((row) => (
						<VSCTRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<VSCTElement key={cell.id} identifier={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</VSCTElement>
							))}
						</VSCTRow>
					))}
				</tbody>
			</table>
		</section>
	)
}

export default VSCGameTable
