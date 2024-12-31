import { getSite } from '@/lib/sanity/queries'
import { PortableText } from '@portabletext/react'

export default async function Footer() {
	const { title, copyright } = await getSite()

	return (
		<footer className="bg-vsc-bg-dark text-center text-canvas">
			<div className="h-4 w-full" />
			<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 p-4 text-sm">
				&copy; {new Date().getFullYear()}{' '}
				{copyright ? <PortableText value={copyright} /> : title}
			</div>
			<div className="h-4 w-full" />
		</footer>
	)
}
