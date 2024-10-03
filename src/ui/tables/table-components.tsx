import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const VSCTRow = ({ children }: { children: ReactNode }) => {
	return <tr className="mb-4 h-12 rounded-full shadow-xl">{children}</tr>
}

export const VSCTHead = ({ children }: { children: ReactNode }) => {
	return (
		<th
			className={cn(
				'bg-vsc-blue px-4 py-4 text-left font-medium text-black first:rounded-l-md last:rounded-r-md',
				'',
			)}
		>
			{children}
		</th>
	)
}

export const VSCTRowExpanded = ({ children }: { children: ReactNode }) => {}

export const VSCTLayout = ({ children }: { children: ReactNode }) => {}

export const VSCTElement = ({
	children,
	identifier,
}: {
	children: ReactNode
	identifier: string
}) => {
	return identifier.split('_')[1] === 'placement' ? (
		<td className="size-12 rounded-l-lg border border-none bg-vsc-bg-dark/90 outline-none first:rounded-l-lg last:rounded-r-lg">
			<p className="w-full text-center font-mono text-xl text-vsc-blue sm:text-2xl">
				{children}
			</p>
		</td>
	) : (
		<td className="bg-vsc-bg-dark px-2 py-1 first:rounded-l-lg last:rounded-r-lg sm:px-4">
			{children}
		</td>
	)
}

export const VSCPlacementElement = ({ children }: { children: ReactNode }) => {
	return (
		<td className="flex size-12 place-items-center rounded-2xl bg-vsc-pink font-mono text-xl font-black">
			{children}
		</td>
	)
}
