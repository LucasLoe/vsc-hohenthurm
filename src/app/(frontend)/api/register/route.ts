import client from '@/lib/sanity/client'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND)
const clientWithToken = client.withConfig({
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

export async function POST(req: NextRequest, res: NextResponse) {
	if (req.method !== 'POST') {
		return new Response('Method not allowed', { status: 405 })
	}

	const body = await req.json()
	const {
		teamName,
		playerCount,
		contactPerson,
		contact,
		notes,
		h,
		recaptchaToken,
	} = body

	// Honeypot check
	if (h) {
		return new Response('Success', { status: 200 })
	}

	// Verify reCAPTCHA
	const recaptchaRes = await fetch(
		'https://www.google.com/recaptcha/api/siteverify',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `secret=${process.env.RECAPTCHA_SERVER}&response=${recaptchaToken}`,
		},
	)

	const recaptchaData = await recaptchaRes.json()

	console.log(recaptchaData)

	if (!recaptchaData.success) {
		return new Response('Invalid reCAPTCHA', { status: 400 })
	}

	try {
		await clientWithToken.create({
			_type: 'registration',
			teamName,
			playerCount: parseInt(playerCount),
			contact,
			contactPerson,
			notes,
			submittedAt: new Date().toISOString(),
		})

		// Email to participant
		await resend.emails.send({
			from: 'noreply@mail.vsc-hohenthurm.de',
			replyTo: 'info@vsc-hohenthurm.de',
			to: contact,
			subject: `Anmeldebestätigung - VSC Hohenthurm${teamName}`,
			html: `
       <h1>Super, dass ihr dabei seid! 🎉</h1>
       
       <p>Hey ${contactPerson}!</p>
       
       <p>Danke für eure Anmeldung mit dem Team "${teamName}"! Wir freuen uns schon total darauf, euch dabei zu haben.</p>
       
       <h2>Eure Anmeldung auf einen Blick:</h2>
       <ul>
         <li>Team: ${teamName}</li>
         <li>Spieleranzahl: ${playerCount}</li>
         <li>Kontakt: ${contact}</li>
         ${notes ? `<li>Notizen: ${notes}</li>` : ''}
       </ul>

       <p>Wir melden uns in den nächsten Tagen bei euch mit allen weiteren Details! Falls ihr vorher schon Fragen habt, meldet euch bitte unter info@vsc-hohenthurm.de .</p>
       
       <p>Beste Grüße<br>
       Euer VSC Hohenthurm</p>
     `,
		})

		// Copy to admin
		await resend.emails.send({
			from: 'noreply@info.vsc-hohenthurm.de',
			replyTo: 'info@vsc-hohenthurm.de',
			to: 'info@vsc-hohenthurm.de',
			subject: `Neue Anmeldung: ${teamName}`,
			html: `
       <h1>Neue Team-Anmeldung! 🎉</h1>
       
       <p>Ein neues Team ist dabei:</p>
       
       <h2>Die Details:</h2>
       <ul>
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
