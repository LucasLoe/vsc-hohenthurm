'use client'
import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { HomeIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'

const NavMenu = () => {
	const activeUrlPath = usePathname()
	const mainSegment = `/${activeUrlPath.split('/')[1]}`

	return (
		<NavigationMenu className="h-[80px] w-full max-w-full py-2">
			<NavigationMenuList>
				<NavigationMenuItem>
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
				<NavigationMenuItem>
					<Link href="/herren-mannschaft" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'bg-transparent text-lg text-vsc-bg-light hover:bg-vsc-blue focus:bg-vsc-blue active:bg-vsc-blue data-[active]:bg-vsc-blue',
							)}
						>
							Herren
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/mixed-mannschaft" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'bg-transparent text-lg text-vsc-bg-light hover:bg-vsc-blue focus:bg-vsc-blue active:bg-vsc-blue data-[active]:bg-vsc-blue',
							)}
						>
							Mixed
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent text-lg text-vsc-bg-light hover:bg-vsc-blue focus:bg-vsc-blue active:bg-vsc-blue data-[active]:bg-vsc-blue data-[state=open]:bg-vsc-blue data-[state=open]:text-black">
						###
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/zeiten-und-kontakt" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'bg-transparent text-lg text-vsc-bg-light hover:bg-vsc-blue focus:bg-vsc-blue active:bg-vsc-blue data-[active]:bg-vsc-blue',
							)}
						>
							Zeiten und Kontakt
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/ueber-uns" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'bg-transparent text-lg text-vsc-bg-light hover:bg-vsc-blue focus:bg-vsc-blue active:bg-vsc-blue data-[active]:bg-vsc-blue',
							)}
						>
							Über uns
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

export default NavMenu

const components: { title: string; href: string; description: string }[] = [
	{
		title: 'Alert Dialog',
		href: '/docs/primitives/alert-dialog',
		description:
			'A modal dialog that interrupts the user with important content and expects a response.',
	},
	{
		title: 'Hover Card',
		href: '/docs/primitives/hover-card',
		description:
			'For sighted users to preview content available behind a link.',
	},
	{
		title: 'Progress',
		href: '/docs/primitives/progress',
		description:
			'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
	},
	{
		title: 'Scroll-area',
		href: '/docs/primitives/scroll-area',
		description: 'Visually or semantically separates content.',
	},
	{
		title: 'Tabs',
		href: '/docs/primitives/tabs',
		description:
			'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
	},
	{
		title: 'Tooltip',
		href: '/docs/primitives/tooltip',
		description:
			'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
	},
]

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-vsc-blue/25 hover:text-black focus:bg-vsc-blue/25 focus:text-black',
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'
