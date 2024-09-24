import { getSite } from '@/lib/sanity/queries'
import processUrl from '@/lib/processUrl'
import ClientNavigationMenu from './client-navigation'

// this is a server module, so we cannot use client hooks etc
// its purpose is the processing of the items using processUrl and directing information to the client navigation menu

const MainNavigationMenu: React.FC = async () => {
	const { headerMenu } = await getSite()

	const processedItems =
		headerMenu?.items?.map((item) => {
			if (item._type === 'link' && item.internal) {
				return {
					...item,
					href: processUrl(item.internal || '/', {
						base: false,
						params: item.params,
					}),
				}
			}
			return item
		}) || []

	return <ClientNavigationMenu items={processedItems} />
}

export default MainNavigationMenu
