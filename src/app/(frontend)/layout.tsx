// import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import Footer from '@/ui/footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import VisualEditingControls from '@/ui/VisualEditingControls'
import '@/styles/app.css'
import NavMenu from '@/ui/navigation'
import MainNavigationMenu from '@/ui/navigation/main-navigation-menu'
import Menu from '@/ui/footer/Navigation'
import Header from '@/ui/header'

export const metadata: Metadata = {
	icons: {
		icon: `https://fav.farm/🖤`,
	},
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			{/* <GoogleTagManager gtmId='' /> */}

			<body className="bg-vsc-bg-light text-vsc-bg-dark">
				{
					// <SkipToContent />
					// <Announcement />
					// <Header />
				}
				<MainNavigationMenu />
				<main id="main-content" tabIndex={-1}>
					{children}
				</main>
				<Footer />

				<Analytics />
				<SpeedInsights />
				<VisualEditingControls />
			</body>
		</html>
	)
}
