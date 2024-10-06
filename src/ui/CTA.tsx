import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import { stegaClean } from '@sanity/client/stega'
import { Button } from '@/components/ui/button'

export default function CTA({
	link,
	style,
	children,
	className,
	...rest
}: Sanity.CTA & React.ComponentProps<'a'>) {
	const variant = style as
		| 'link'
		| 'ghost'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| null
		| undefined

	const props = {
		children:
			children || link?.label || link?.internal?.title || link?.external,
		...rest,
	}

	if (link?.type === 'internal' && link.internal)
		return (
			<Button asChild variant={variant} className="no-underline">
				<Link
					href={processUrl(link.internal, {
						base: false,
						params: link.params,
					})}
					className={`${className || ''} no-underline`.trim()}
					style={{ textDecoration: 'none' }}
					{...props}
				/>
			</Button>
		)

	if (link?.type === 'external' && link.external)
		return (
			<Button
				asChild
				variant={'outline'}
				className="border-[1px] py-1 font-normal no-underline shadow-inner"
			>
				<Link
					href={stegaClean(link.external)}
					className={className}
					{...props}
					style={{ textDecoration: 'none' }}
				/>
			</Button>
		)

	return props.children
}
