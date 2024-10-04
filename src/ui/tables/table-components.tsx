import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Roboto_Slab } from 'next/font/google'

const roboto = Roboto_Slab({ subsets: ['latin'] })
export const VSCTRow = ({ children }: { children: ReactNode }) => {
	return (
		<tr className="mb-4 h-12 rounded-lg bg-vsc-bg-dark/10 shadow">
			{children}
		</tr>
	)
}

export const VSCTHead = ({ children }: { children: ReactNode }) => {
	return (
		<th
			className={cn(
				'bg-vsc-blue py-4 pl-2 pr-4 text-left font-medium text-black first:rounded-l-md last:rounded-r-md',
				roboto.className,
			)}
		>
			{children}
		</th>
	)
}

export const VSCTElement = ({
	children,
	identifier,
}: {
	children: ReactNode
	identifier: string
}) => {
	return identifier.split('_')[1] === 'placement' ? (
		<td className="size-12 rounded-l-lg border border-none bg-vsc-bg-dark/90 shadow outline-none">
			<p
				className={`w-full rounded text-center text-xl font-semibold text-vsc-pink sm:text-2xl ${roboto.className}`}
			>
				{children}
			</p>
		</td>
	) : (
		<td className="bg-transparent px-2 py-1 last:rounded-r-lg sm:px-4">
			{children}
		</td>
	)
}
