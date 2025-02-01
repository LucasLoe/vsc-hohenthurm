import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import { Roboto_Slab } from 'next/font/google'

const roboto = Roboto_Slab({ subsets: ['latin'], display: 'swap' })

export default function Pretitle({
	className,
	children,
}: React.ComponentProps<'p'>) {
	if (!children) return null

	return (
		<p
			className={cn('mb-2 text-2xl text-vsc-pink', roboto.className, className)}
		>
			{stegaClean(children)}
		</p>
	)
}
