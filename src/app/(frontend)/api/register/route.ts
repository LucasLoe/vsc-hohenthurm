import client from '@/lib/sanity/client'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const clientWithToken = client.withConfig({
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: parseInt(process.env.EMAIL_PORT || '587'),
	secure: false,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
})

export async function POST(req: NextRequest, res: NextResponse) {
	if (req.method !== 'POST') {
		return new Response('Method not allowed', { status: 405 })
	}

	const body = await req.json()
	const {
		tournament,
		teamName,
		playerCount,
		contactPerson,
		contact,
		notes,
		h,
		recaptchaToken,
	} = body

	if (h) {
		return new Response('Success', { status: 200 })
	}

	const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
		contact,
	)

	if (!isEmail) {
		return new Response(JSON.stringify({ error: 'Ungültige E-Mail-Adresse' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	const recaptchaRes = await fetch(
		'https://www.google.com/recaptcha/api/siteverify',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `secret=${process.env.RECAPTCHA_SERVER}&response=${recaptchaToken}`,
		},
	)

	const recaptchaData = await recaptchaRes.json()

	if (!recaptchaData.success) {
		return new Response('Invalid reCAPTCHA', { status: 400 })
	}

	try {
		await clientWithToken.create({
			_type: 'registration',
			tournament,
			teamName,
			playerCount: parseInt(playerCount),
			contact,
			contactPerson,
			notes,
			submittedAt: new Date().toISOString(),
		})

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			replyTo: 'info@vsc-hohenthurm.de',
			to: contact,
			subject: `Anmeldebestätigung - VSC Hohenthurm ${teamName}`,
			html: `
       <h3>Super, dass ihr dabei seid! 🎉</h3>
       
       <p>Hey ${contactPerson}!</p>
       
       <p>Danke für eure Anmeldung mit dem Team "${teamName}"! Wir freuen uns schon total darauf, euch dabei zu haben. 🏐</p>
       
       <p>Eure Anmeldung auf einen Blick:</p> <br/>
         - Team: ${teamName} <br/>
         - Spieleranzahl: ${playerCount} <br/>
         - Kontakt: ${contact} <br/>
         ${notes ? `- Notizen: ${notes}` : ''} <br/>

       <p>Wir melden uns in den nächsten Tagen bei euch mit allen weiteren Details! Falls ihr vorher schon Fragen habt, meldet euch bitte unter info@vsc-hohenthurm.de .</p>
       
       <p>Beste Grüße<br>
       Euer VSC Hohenthurm</p>
     `,
		})

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			replyTo: 'info@vsc-hohenthurm.de',
			to: 'info@vsc-hohenthurm.de',
			cc: 'rene.habegger@vsc-hohenthurm.de',
			subject: `Neue Anmeldung: ${teamName}`,
			html: `
       <h1>Neue Team-Anmeldung! 🎉</h1>
       
       <p>Ein neues Team ist dabei:</p>
       
       <h3>Die Details:</h3>
       <ul>
			 	 <li>Turnier: ${tournament}</li>
         <li>Team: ${teamName}</li>
         <li>Kontaktperson: ${contactPerson}</li>
         <li>Spieleranzahl: ${playerCount}</li>
         <li>Kontakt: ${contact}</li>
         ${notes ? `<li>Notizen: ${notes}</li>` : ''}
       </ul>

       <p>Angemeldet am: ${new Date().toLocaleString('de-DE', {
					dateStyle: 'full',
					timeStyle: 'short',
				})}</p>
     `,
		})

		return new Response('Success', { status: 200 })
	} catch (err) {
		console.error(err)
		return new Response('Fehler bei der Anmeldung', { status: 500 })
	}
}
