// MODULE-WORKFLOW --> UI CONNECTION
import AccordionList from './AccordionList'
import BlogList from './blog/BlogList'
import Breadcrumbs from './Breadcrumbs'
import Callout from './Callout'
import CreativeModule from './CreativeModule'
import CustomHTML from './CustomHTML'
import FlagList from './FlagList'
import Hero from './Hero'
import HeroSplit from './HeroSplit'
import HeroSaaS from './HeroSaaS'
import LogoList from './LogoList'
import PostContent from './blog/PostContent'
import PricingList from './PricingList'
import RichtextModule from './RichtextModule'
import StatList from './StatList'
import StepList from './StepList'
import TestimonialList from './TestimonialList'
import TestimonialFeatured from './TestimonialFeatured'
import FullscreenHero from './FullscreenHero'
import VSCGameTable from '../tables/vsc-game-table'
import MapLocation from './MapLocation'
import VSCMatchSchedule from '../tables/vsc-match-schedule'
import VSCBoardMembers from './VSCBoardMembers'
import Heading from '../atoms/heading'
import Spacing from '../atoms/spacing'
import ImageGallery from './ImageGallery'
import Timeline from './Timeline'
import VereinInZahlenHero from '../member-charts/verein-in-zahlen'

export default function Modules({
	modules,
	page,
	post,
}: {
	modules?: Sanity.Module[]
	page?: Sanity.Page
	post?: Sanity.BlogPost
}) {
	return (
		<>
			{modules?.map((module) => {
				switch (module._type) {
					case 'accordion-list':
						return <AccordionList {...module} key={module._key} />
					case 'blog-list':
						return <BlogList {...module} key={module._key} />
					case 'blog-post-content':
						return <PostContent {...module} post={post} key={module._key} />
					case 'breadcrumbs':
						return (
							<Breadcrumbs
								{...module}
								currentPage={post || page}
								key={module._key}
							/>
						)
					case 'callout':
						return <Callout {...module} key={module._key} />
					case 'creative-module':
						return <CreativeModule {...module} key={module._key} />
					case 'custom-html':
						return <CustomHTML {...module} key={module._key} />
					case 'flag-list':
						return <FlagList {...module} key={module._key} />
					case 'fullscreen-hero':
						return <FullscreenHero {...module} key={module._key} />
					case 'hero':
						return <Hero {...module} key={module._key} />
					case 'hero.split':
						return <HeroSplit {...module} key={module._key} />
					case 'hero.saas':
						return <HeroSaaS {...module} key={module._key} />
					case 'logo-list':
						return <LogoList {...module} key={module._key} />
					case 'mapLocation':
						// @ts-ignore
						return <MapLocation {...module} key={module._key} />
					case 'pricing-list':
						return <PricingList {...module} key={module._key} />
					case 'richtext-module':
						return <RichtextModule {...module} key={module._key} />
					case 'stat-list':
						return <StatList {...module} key={module._key} />
					case 'step-list':
						return <StepList {...module} key={module._key} />
					case 'testimonial-list':
						return <TestimonialList {...module} key={module._key} />
					case 'testimonial.featured':
						return <TestimonialFeatured {...module} key={module._key} />
					case 'leagueTable':
						//@ts-ignore
						return <VSCGameTable {...module} key={module._key} />
					case 'matchSchedule':
						//@ts-ignore
						return <VSCMatchSchedule {...module} key={module._key} />
					case 'vsc-boardmembers':
						//@ts-ignore
						return <VSCBoardMembers {...module} key={module._key} />
					case 'imageGallery':
						//@ts-ignore
						return <ImageGallery {...module} key={module._key} />
					case 'heading':
						//@ts-ignore
						return <Heading {...module} key={module._key} />
					case 'spacing':
						//@ts-ignore
						return <Spacing {...module} key={module._key} />
					case 'timeline':
						//@ts-ignore
						return <Timeline {...module} key={module._key} />
					case 'vereinInZahlen':
						//@ts-ignore
						return <VereinInZahlenHero {...module} key={module._key} />
					default:
						return <div data-type={module._type} key={module._key} />
				}
			})}
		</>
	)
}
