import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import { stegaClean } from '@sanity/client/stega'
import { Button } from '@/components/ui/button'

export default function CTA({
	link,
	style,
	children,
	...rest
}: Sanity.CTA & React.ComponentProps<'a'>) {
	const _style = style as
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
			<Button asChild variant={_style}>
				<Link
					href={processUrl(link.internal, {
						base: false,
						params: link.params,
					})}
					{...props}
				/>
			</Button>
		)

	if (link?.type === 'external' && link.external)
		return <a href={stegaClean(link.external)} {...props} />

	return props.children
}
