'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { HomeIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { DialogTitle } from '@/components/ui/dialog'

interface ProcessedMenuItem {
	_type: string
	href?: string
	label?: string
}

interface ClientNavigationMenuProps {
	items: ProcessedMenuItem[]
}

const ClientNavigationMenu: React.FC<ClientNavigationMenuProps> = ({
	items,
}) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
	const pathname = usePathname()

	return (
		<NavigationMenu className="h-[80px] w-full max-w-full bg-vsc-bg-dark py-2">
			<div className="hidden sm:flex">
				<NavigationMenuList>
					<NavigateHome />
					{items.map((item, key) => {
						if (item._type === 'link' && item.href) {
							return (
								<NavigationEntry
									key={key}
									title={item.label || ''}
									href={item.href}
									isActive={pathname === item.href}
								/>
							)
						}
						return null
					})}
				</NavigationMenuList>
			</div>
			<div className="w-full sm:hidden">
				<NavigationMenuList>
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<div className="mx-2 flex w-full justify-between">
							{pathname !== '/' ? <NavigateHome /> : <div />}
							<SheetTrigger asChild>
								<button className="p-2 text-vsc-bg-light">
									<HamburgerMenuIcon className="ml-auto mr-0 size-6" />
								</button>
							</SheetTrigger>
						</div>
						<SheetContent
							aria-label="Mobile navigation menu"
							side="left"
							className="w-[60%] bg-vsc-bg-dark p-0"
						>
							<SheetHeader>
								<SheetTitle>
									<VisuallyHidden.Root>Navigation</VisuallyHidden.Root>
								</SheetTitle>
								<SheetDescription>
									<VisuallyHidden.Root>
										Navigationsmenü für kleine Bildschirme
									</VisuallyHidden.Root>
								</SheetDescription>
							</SheetHeader>
							<NavigationMenuList className="flex w-full flex-col space-y-4 p-4">
								<MobileNavigationEntry
									key={'home-1'}
									title={'Startseite'}
									href={'/'}
									isActive={pathname === '/'}
									closeMenu={() => setIsMobileMenuOpen(false)}
								/>
								{items.map((item, key) => {
									if (item._type === 'link' && item.href) {
										return (
											<MobileNavigationEntry
												key={key}
												title={item.label || ''}
												href={item.href}
												isActive={pathname === item.href}
												closeMenu={() => setIsMobileMenuOpen(false)}
											/>
										)
									}
									return null
								})}
							</NavigationMenuList>
						</SheetContent>
					</Sheet>
				</NavigationMenuList>
			</div>
		</NavigationMenu>
	)
}

const NavigationEntry: React.FC<{
	title: string
	href: string
	isActive: boolean
}> = ({ title, href, isActive }) => {
	return (
		<NavigationMenuItem>
			<Link href={href} legacyBehavior passHref>
				<NavigationMenuLink
					className={cn(
						navigationMenuTriggerStyle(),
						'bg-transparent text-lg text-vsc-bg-light hover:bg-vsc-blue focus:bg-vsc-blue active:bg-vsc-blue data-[active]:bg-vsc-blue',
						isActive && 'bg-vsc-pink',
					)}
				>
					{title}
				</NavigationMenuLink>
			</Link>
		</NavigationMenuItem>
	)
}

const MobileNavigationEntry: React.FC<{
	title: string
	href: string
	isActive: boolean
	closeMenu: () => void
}> = ({ title, href, isActive, closeMenu }) => {
	return (
		<Link
			href={href}
			className={cn(
				'w-full rounded p-2 text-lg text-vsc-bg-light hover:bg-vsc-blue hover:text-vsc-bg-dark',
				isActive && 'text-vsc-pink hover:text-vsc-bg-dark',
			)}
			onClick={closeMenu}
		>
			{title}
		</Link>
	)
}

const NavigateHome: React.FC<{
	className?: string
}> = ({ className }) => {
	return (
		<NavigationMenuItem className={className}>
			<Link href="/" legacyBehavior passHref>
				<NavigationMenuLink
					className={cn(
						navigationMenuTriggerStyle(),
						'bg-transparent text-lg text-vsc-bg-light hover:bg-vsc-blue focus:bg-vsc-blue active:bg-vsc-blue data-[active]:bg-vsc-blue',
					)}
				>
					<HomeIcon className="size-6" />
				</NavigationMenuLink>
			</Link>
		</NavigationMenuItem>
	)
}

export default ClientNavigationMenu
