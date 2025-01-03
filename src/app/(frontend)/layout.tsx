// import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import Footer from '@/ui/footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import VisualEditingControls from '@/ui/VisualEditingControls'
import '@/styles/app.css'
import MainNavigationMenu from '@/ui/navigation/main-navigation-menu'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
	icons: {
		icon: `/icon.ico`,
	},
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="bg-vsc-bg-light text-vsc-bg-dark">
				<MainNavigationMenu />
				<main id="main-content" tabIndex={-1}>
					{children}
				</main>
				<Footer />
				<Toaster />
				<VisualEditingControls />
			</body>
		</html>
	)
}
