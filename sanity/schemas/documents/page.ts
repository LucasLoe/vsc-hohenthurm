import { defineField, defineType } from 'sanity'
import { VscHome, VscEyeClosed, VscQuestion, VscEdit } from 'react-icons/vsc'

// MODULE-WORKFLOW: --> CONNECTION

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	groups: [
		{ name: 'content', default: true },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'modules',
			description: 'Page content',
			type: 'array',
			of: [
				// MODULE-WORKFLOW: add here
				{ type: 'accordion-list' },
				{ type: 'blog-list' },
				{ type: 'blog-post-content' },
				{ type: 'breadcrumbs' },
				{ type: 'callout' },
				{ type: 'creative-module' },
				{ type: 'custom-html' },
				{ type: 'flag-list' },
				{ type: 'fullscreen-hero' },
				{ type: 'heading' },
				{ type: 'hero' },
				{ type: 'hero.saas' },
				{ type: 'hero.split' },
				{ type: 'imageGallery' },
				{ type: 'logo-list' },
				{ type: 'leagueTable' },
				{ type: 'mapLocation' },
				{ type: 'matchSchedule' },
				{ type: 'pricing-list' },
				{ type: 'richtext-module' },
				{ type: 'spacing' },
				{ type: 'stat-list' },
				{ type: 'step-list' },
				{ type: 'testimonial-list' },
				{ type: 'testimonial.featured' },
				{ type: 'vsc-boardmembers' },
				{ type: 'timeline' },
			],
			options: {
				insertMenu: {
					// MODULE-WORKFLOW: add here
					views: [{ name: 'list' }, { name: 'grid' }],
					groups: [
						{ name: 'blog', of: ['blog-list', 'blog-post-content'] },
						{
							name: 'hero',
							of: ['hero', 'hero.saas', 'hero.split', 'fullscreen-hero'],
						},
						{
							name: 'testimonial',
							of: ['testimonial-list', 'testimonial.featured'],
						},
						{ name: 'atoms', of: ['heading', 'spacing'] },
						{ name: 'tables', of: ['leagueTable', 'matchSchedule'] },
						{
							name: 'others',
							of: [
								'mapLocation',
								'vsc-boardmembers',
								'imageGallery',
								'timeline',
							],
						},
					],
				},
			},
			group: 'content',
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'seo',
		}),
	],
	preview: {
		select: {
			title: 'title',
			slug: 'metadata.slug.current',
			media: 'metadata.image',
			noindex: 'metadata.noIndex',
		},
		prepare: ({ title, slug, media, noindex }) => ({
			title,
			subtitle: slug && (slug === 'index' ? '/' : `/${slug}`),
			media:
				media ||
				(slug === 'index' && VscHome) ||
				(slug === '404' && VscQuestion) ||
				(['blog', 'blog/*'].includes(slug) && VscEdit) ||
				(noindex && VscEyeClosed),
		}),
	},
})
