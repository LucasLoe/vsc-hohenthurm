// app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from '@/app/(frontend)/events/traditionsturnier-2025/protect'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
	const { password } = await request.json()
	const token = generateToken(password)

	if (!token) {
		return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
	}

	return NextResponse.json({ token })
}
