// pages/api/register.ts
import client from '@/lib/sanity/client'
import { NextApiRequest, NextApiResponse } from 'next'

const clientWithToken = client.withConfig({
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
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
