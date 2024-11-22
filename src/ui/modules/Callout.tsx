import { PortableText } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import { ChristmasCallout } from './callouts/christmas'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Mountains_of_Christmas } from 'next/font/google'

const mountainsOfChristmas = Mountains_of_Christmas({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
})

const Christmaslayout = ({ href }: { href: string }) => {
	return (
		<section className="section">
			<div className="relative mx-auto aspect-[1200/800] w-full shadow-lg sm:w-[500px] lg:w-[700px]">
				<ChristmasCallout />
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
								className="border-[1px] px-1 py-0.5 text-xs sm:px-2 sm:text-sm"
							>
								Mehr Infos
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
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
	if (variant === 'christmas') {
		return (
			<Christmaslayout
				href={'https://vsc-hohenthurm.de/events/weihnachtsmarkt-2024'}
			/>
		)
	}

	return (
		<section className="section">
			<div
				className={cn(
					'section grid max-w-screen-lg items-center gap-12 gap-y-6 rounded bg-accent/5 md:grid-cols-[2fr,1fr]',
					'border-[1px] border-black',
				)}
			>
				<div className="h-72 w-full">
					<ChristmasCallout />
				</div>
				<div className={cn('richtext', 'text-lg font-light')}>
					<PortableText value={content} />
				</div>
				<CTAList ctas={ctas} />
			</div>
		</section>
	)
}
