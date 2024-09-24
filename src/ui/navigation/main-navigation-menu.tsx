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
import { HomeIcon } from '@radix-ui/react-icons'
import { getSite } from '@/lib/sanity/queries'
import processUrl from '@/lib/processUrl'

const MainNavigationMenu = async () => {
	const { headerMenu } = await getSite()

	return (
		<NavigationMenu className="h-[80px] w-full max-w-full bg-vsc-bg-dark py-2">
			<NavigationMenuList className="grow">
				<NavigateHome />
				{headerMenu?.items?.map((item, key) => {
					if (item._type === 'link' && item.internal) {
						const href = processUrl(item.internal || '/', {
							base: false,
							params: item.params,
						})
						const title = item.label

						return (
							<NavigationEntry
								key={key}
								title={title}
								href={href}
								isActive={false}
							/>
						)
					}
				})}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
const NavigationEntry = ({
	title,
	href,
	isActive,
}: {
	title: string
	href: string
	isActive: boolean
}) => {
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

const NavigateHome = ({ className }: { className?: string }) => {
	return (
		<NavigationMenuItem>
			<Link href="/" legacyBehavior passHref>
				<NavigationMenuLink
					className={cn(
						navigationMenuTriggerStyle(),
						'bg-transparent text-lg text-vsc-bg-light hover:bg-vsc-blue focus:bg-vsc-blue active:bg-vsc-blue data-[active]:bg-vsc-blue',
						className || '',
					)}
				>
					<HomeIcon className="size-6" />
				</NavigationMenuLink>
			</Link>
		</NavigationMenuItem>
	)
}

export default MainNavigationMenu
