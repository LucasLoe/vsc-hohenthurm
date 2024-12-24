// pages/api/register.ts
import client from '@/lib/sanity/client'
import { NextRequest, NextResponse } from 'next/server'

const clientWithToken = client.withConfig({
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

export async function POST(req: NextRequest, res: NextResponse) {
	if (req.method !== 'POST') {
		return new Response('H', { status: 405 })
	}
	console.log(req.body)

	const body = await req.json()
	const { teamName, playerCount, contactPerson, contact, notes, h } = body
	// honeypot for bots
	if (h) {
		return new Response('H', { status: 200 })
	}

	try {
		await clientWithToken.create({
			_type: 'registration',
			teamName,
			playerCount: parseInt(playerCount),
			contactPerson,
			contact,
			notes,
			submittedAt: new Date().toISOString(),
		})

		return new Response('H', { status: 200 })
	} catch (err) {
		console.log(err)
		return new Response('H', { status: 500 })
	}
}
