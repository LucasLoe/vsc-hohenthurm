import { PortableText } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'

const layoutClasses = {
	normal: 'border-[1px] border-black',
	christmas: 'bg-vsc-bg-dark text-white relative overflow-hidden',
} as const

const textClasses = {
	normal: 'text-lg font-light',
	christmas: 'text-lg font-light',
}

const Christmas = () => {
	return (
		<p className="absolute -right-16 -top-[85%] fill-white text-[200px] text-white opacity-20">
			❄
		</p>
	)
}

export default function Callout({
	content,
	ctas,
	variant,
}: Partial<{
	content: any
	ctas: Sanity.CTA[]
	variant: 'normal' | 'christmas'
}>) {
	return (
		<section className="section">
			<div
				className={cn(
					'section grid max-w-screen-lg items-center gap-12 gap-y-6 rounded bg-accent/5 md:grid-cols-[2fr,1fr]',
					layoutClasses[variant || 'normal'],
				)}
			>
				<div className={cn('richtext', textClasses[variant || 'normal'])}>
					<PortableText value={content} />
				</div>
				{variant === 'christmas' && <Christmas />}
				<CTAList ctas={ctas} />
			</div>
		</section>
	)
}
