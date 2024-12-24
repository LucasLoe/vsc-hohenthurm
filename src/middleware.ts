// src/middleware.ts
import { NextResponse, NextRequest } from 'next/server'

export const config = {
	matcher: '/draft/:path*',
}

export function middleware(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const draftKey = searchParams.get('key')

	if (!process.env.DRAFT_KEY || draftKey !== process.env.DRAFT_KEY) {
		return NextResponse.redirect(new URL('/', request.url))
	}
}
