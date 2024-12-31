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
import {
	HomeIcon,
	HamburgerMenuIcon,
	TriangleRightIcon,
} from '@radix-ui/react-icons'
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
import { InstagramIcon, ShoppingCartIcon } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
					<div className="flex items-center gap-4 px-1 text-white">
						<ExternalNavItem
							text="Möchtest du zu unserem Instagram-Account weitergeleitet werden?"
							icon={<InstagramIcon className="size-8" />}
							url="https://www.instagram.com/vsc.hohenthurm"
						/>
						<ExternalNavItem
							text="Möchtest du zu unserem externen Fanshop weitergeleitet werden?"
							icon={<ShoppingCartIcon className="size-8" />}
							url="https://vsc-hohenthurm.fan12.de/"
						/>
					</div>
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
							aria-label="mobile navigation menu"
							side="right"
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
								<>
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
									<Separator />
									<div className="mb-0 mt-auto flex w-full items-center gap-4 px-1 text-white">
										<ExternalNavItem
											text="Möchtest du zu unserem Instagram-Account weitergeleitet werden?"
											icon={<InstagramIcon className="size-9" />}
											url="https://www.instagram.com/vsc.hohenthurm"
										/>
										<ExternalNavItem
											text="Möchtest du zu unserem externen Fanshop weitergeleitet werden?"
											icon={<ShoppingCartIcon className="size-9" />}
											url="https://vsc-hohenthurm.fan12.de/"
										/>
									</div>
								</>
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
				'flex w-full items-center rounded p-2 text-lg text-vsc-bg-light hover:bg-vsc-blue hover:text-vsc-bg-dark',
				isActive && 'text-vsc-pink hover:text-vsc-bg-dark',
			)}
			onClick={closeMenu}
		>
			{isActive && <TriangleRightIcon className="size-8 text-vsc-pink" />}
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

const ExternalNavItem = ({
	text,
	icon,
	url,
}: {
	text: string
	icon: React.ReactNode
	url: string
}) => {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger
				className="size-12 cursor-pointer rounded p-1 hover:bg-vsc-blue hover:text-black"
				asChild
			>
				{icon}
			</DialogTrigger>
			<DialogContent className="max-w-80 sm:max-w-96">
				<DialogHeader>
					<DialogTitle>Weiterleitung:</DialogTitle>
					<DialogDescription className="py-4">{text}</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex flex-row items-center justify-end gap-4">
					<Button
						onClick={() => setIsOpen(false)}
						className="max-w-32 border-[1px] font-light"
						variant="outline"
					>
						Zurück
					</Button>
					<Link href={url} target="_blank">
						<Button className="max-w-32" variant="secondary">
							OK
						</Button>
					</Link>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default ClientNavigationMenu
