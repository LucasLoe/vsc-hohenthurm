// MODULE-WORKFLOW --> SCHEMAS
// documents
import site from './documents/site'
import page from './documents/page'
import blogPost from './documents/blog.post'
import blogCategory from './documents/blog.category'
import navigation from './documents/navigation'
import announcement from './documents/announcement'
import redirect from './documents/redirect'
import logo from './documents/logo'
import pricing from './documents/pricing'
import reputation from './documents/reputation'
import testimonial from './documents/testimonial'

// objects
import cta from './objects/cta'
import uid from './objects/uid'
import link from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'

// modules
import accordionList from './modules/accordion-list'
import blogList from './modules/blog-list'
import blogPostContent from './modules/blog-post-content'
import breadcrumbs from './modules/breadcrumbs'
import callout from './modules/callout'
import creativeModule from './modules/creative'
import customHtml from './modules/custom-html'
import flagList from './modules/flag-list'
import hero from './modules/hero'
import heroSaas from './modules/hero.saas'
import HeroSplit from './modules/hero.split'
import logoList from './modules/logo-list'
import pricingList from './modules/pricing-list'
import richtextModule from './modules/richtext-module'
import statList from './modules/stat-list'
import stepList from './modules/step-list'
import testimonialFeatured from './modules/testimonial.featured'
import testimonialList from './modules/testimonial-list'
//custom
import fullscreenHero from './modules/fullscreen-hero'
import mapLocation from './modules/map-location'
import vscBoardMembers from './modules/vsc-board-members'
import timeline from './modules/timeline'
// tables
import { LeagueTable } from './table/league-table'
import { matchSchedule } from './table/match-schedule'
import heading from './atoms/heading'
import spacing from './atoms/spacing'
import imageGallery from './modules/image-gallery'
// api
import registration from './api/registration'
import tournament from './tournament/tournament'
import vereinInZahlen from './modules/verein-in-zahlen'

export const schemaTypes = [
	// documents
	site,
	page,
	blogPost,
	blogCategory,
	navigation,
	announcement,
	redirect,
	logo,
	pricing,
	reputation,
	testimonial,

	// objects
	cta,
	uid,
	link,
	linkList,
	metadata,

	// modules
	accordionList,
	blogList,
	blogPostContent,
	breadcrumbs,
	callout,
	creativeModule,
	customHtml,
	flagList,
	hero,
	heroSaas,
	HeroSplit,
	logoList,
	pricingList,
	richtextModule,
	statList,
	stepList,
	testimonialFeatured,
	testimonialList,

	//custom
	fullscreenHero,
	mapLocation,
	vscBoardMembers,
	imageGallery,
	timeline,

	// tables
	LeagueTable,
	matchSchedule,

	// atoms
	heading,
	spacing,

	// api
	registration,

	//tournament
	tournament,

	// verein in zahlen
	vereinInZahlen,
]
