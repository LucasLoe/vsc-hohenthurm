import { PortableText } from 'next-sanity'
import CTA from '@/ui/CTA'
import { cn } from '@/lib/utils'
import { ChristmasCallout } from './callouts/christmas'
import Link from 'next/link'
import { Mountains_of_Christmas } from 'next/font/google'
import processUrl from '@/lib/processUrl'
import { stegaClean } from '@sanity/client/stega'
import { Button } from '@/components/ui/button'

const mountainsOfChristmas = Mountains_of_Christmas({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
})

const Christmaslayout = ({ cta }: { cta: Sanity.CTA }) => {
	let href = '#'

	if (cta.link?.type === 'internal' && cta.link.internal) {
		href = processUrl(cta.link.internal, {
			base: false,
			params: cta.link.params,
		})
	}

	if (cta.link?.type === 'external' && cta.link.external) {
		href = stegaClean(cta.link.external)
	}

	return (
		<div className="relative mx-auto aspect-[1200/800] w-full shadow-lg sm:w-[500px] lg:w-[700px]">
			<Link href={href}>
				<ChristmasCallout />
			</Link>
			<div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:bottom-4">
				<div className="flex w-fit place-items-center gap-x-4 lg:gap-x-8">
					<p
						className={cn(
							'text-nowrap font-bold sm:text-xl lg:text-3xl',
							mountainsOfChristmas.className,
						)}
					>
						Weihnachtsmarkt Hohenthurm 2024
					</p>
					<Link href={href}>
						<Button
							variant="outline"
							className="!w-fit text-ellipsis border-[1px] px-2 py-0 text-xs max-sm:mx-auto max-sm:w-64 sm:text-sm"
						>
							{cta.link?.label || 'Mehr erfahren'}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default function Callout({
	content,
	cta,
	variant,
}: Partial<{
	content: any
	cta: Sanity.CTA
	variant: 'normal' | 'christmas'
}>) {
	if (variant === 'christmas' && cta) {
		return (
			<section className="section">
				<Christmaslayout cta={cta} />
			</section>
		)
	}

	if (variant === 'normal' && cta) {
		return (
			<section className="section">
				<div
					className={cn(
						'section grid max-w-screen-lg items-center gap-12 gap-y-6 rounded bg-accent/5 md:grid-cols-[2fr,1fr]',
						'border-[1px] border-black',
					)}
				>
					<div className={cn('richtext', 'text-lg font-light')}>
						<PortableText value={content} />
					</div>
					<CTA className="max-sm:mx-auto max-sm:w-64" {...cta} />
				</div>
			</section>
		)
	}

	if (!cta) {
		return (
			<section className="section">
				<div
					className={cn(
						'section max-w-screen-lg rounded bg-accent/5',
						'border-[1px] border-black',
					)}
				>
					<div className={cn('richtext', 'text-lg font-light')}>
						<PortableText value={content} />
					</div>
				</div>
			</section>
		)
	}

	return null
}
