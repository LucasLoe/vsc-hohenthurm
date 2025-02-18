'use client'
import React, { Suspense, useState } from 'react'
import { ArchiveFilterBar } from './archive-filter-bar'
import { ArchivePost } from './archive-post'
import { useSearchParams } from 'next/navigation'
import { stegaClean } from '@sanity/client/stega'
import { Frown } from 'lucide-react'

const Archive = ({
	posts,
}: {
	posts: Sanity.BlogPost[]
	categories: Sanity.BlogCategory[]
}) => {
	const searchParams = useSearchParams()
	const filter = searchParams.get('filter')
	const _posts = posts || []

	const filteredPosts = filter
		? _posts.filter((post) => {
				if (!post.categories) return false
				return post.categories.some(
					(category) => stegaClean(category.title).toLowerCase() === filter,
				)
			})
		: _posts

	return (
		<Suspense fallback={<p>Wird geladen ... </p>}>
			<ArchiveFilterBar />
			{filteredPosts?.length > 0 ? (
				<div className="grid w-full grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
					{filteredPosts.map((post) => (
						<ArchivePost key={post._id} post={post} />
					))}
				</div>
			) : (
				<NoEntries />
			)}
		</Suspense>
	)
}

const NoEntries = () => {
	return (
		<div className="mx-auto flex w-full flex-col place-items-center gap-8 py-4">
			<Frown className="size-24 text-gray-300" />
			<p className="px-4 text-center text-gray-500">
				Hier gibt es noch keine Einträge. <br /> Schau doch mal bei den anderen
				Kategorien!
			</p>
		</div>
	)
}

export default Archive
