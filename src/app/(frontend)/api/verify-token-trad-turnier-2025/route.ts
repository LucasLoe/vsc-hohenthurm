import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/app/(frontend)/events/mai-turnier-2025/protect'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
	const { token } = await request.json()

	if (verifyToken(token)) {
		return NextResponse.json({ valid: true })
	}

	return NextResponse.json({ valid: false }, { status: 401 })
}
