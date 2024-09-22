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
import Image from 'next/image'

const NavMenu = () => {
	return (
		<NavigationMenu className="bg-vsc-bg-dark h-[80px] w-full max-w-full py-2">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="text-vsc-bg-light hover:bg-vsc-blue focus:bg-vsc-blue data-[active]:bg-vsc-blue data-[state=open]:bg-vsc-blue active:bg-vsc-blue bg-transparent text-lg data-[state=open]:text-black">
						Zeiten & Kontakt
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="relative row-span-3">
								<div className="relative h-full w-full rounded">
									<Image
										src={'/images/navigation-image.png'}
										alt=""
										width={1000}
										height={200}
										className="h-32 w-full rounded object-cover lg:h-full"
									/>
									<div className="absolute inset-0 rounded bg-gradient-to-b from-pink-900/10 to-pink-900 opacity-60"></div>
								</div>
							</li>
							<ListItem href="/docs" title="Introduction">
								Re-usable components built using Radix UI and Tailwind CSS.
							</ListItem>
							<ListItem href="/docs/installation" title="Installation">
								How to install dependencies and structure your app.
							</ListItem>
							<ListItem href="/docs/primitives/typography" title="Typography">
								Styles for headings, paragraphs, lists...etc
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="text-vsc-bg-light hover:bg-vsc-blue focus:bg-vsc-blue active:bg-vsc-blue data-[active]:bg-vsc-blue data-[state=open]:bg-vsc-blue bg-transparent text-lg data-[state=open]:text-black">
						Mixed
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
					<Link href="/docs" legacyBehavior passHref>
						<NavigationMenuLink
							className={cn(
								navigationMenuTriggerStyle(),
								'text-vsc-bg-light hover:bg-vsc-blue focus:bg-vsc-blue active:bg-vsc-blue data-[active]:bg-vsc-blue bg-transparent text-lg',
							)}
						>
							Herren
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
						'hover:bg-vsc-blue/25 focus:bg-vsc-blue/25 block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-black focus:text-black',
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
