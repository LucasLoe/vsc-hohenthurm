'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useFormState, useFormStatus } from 'react-dom'

function SubmitButton() {
	const { pending } = useFormStatus()
	return (
		<Button className="ml-auto" variant="pink" type="submit" disabled={pending}>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Registriere...
				</>
			) : (
				'Registrieren'
			)}
		</Button>
	)
}

type FormState = {
	success: boolean
	message: string
}

const initialState: FormState = {
	success: false,
	message: '',
}

async function registerAction(
	_: FormState,
	formData: FormData,
): Promise<FormState> {
	try {
		const res = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				teamName: formData.get('teamName'),
				playerCount: formData.get('playerCount'),
				contactPerson: formData.get('contactPerson'),
				contact: formData.get('contact'),
				notes: formData.get('notes'),
				h: formData.get('h'),
			}),
		})

		if (res.ok) {
			return { success: true, message: 'Registration successful' }
		}
		return { success: false, message: 'Registration failed' }
	} catch (err) {
		return { success: false, message: 'Error submitting form' }
	}
}

export default function RegistrationForm() {
	const [state, formAction] = useFormState(registerAction, initialState)

	if (state.success) {
		return (
			<div className="mx-auto my-4 rounded bg-vsc-blue px-4 py-2 text-center text-vsc-bg-dark shadow-2xl">
				<h3 className="text-lg font-medium">Danke für deine Anmeldung!</h3>
				<p className="text-sm font-light">
					Wir melden uns einige Wochen vor dem Turnier.
				</p>
			</div>
		)
	}

	return (
		<form action={formAction} className="mx-auto w-full max-w-md space-y-6">
			<div className="space-y-4">
				<div>
					<Label>Team-Name</Label>
					<Input name="teamName" required />
				</div>

				<div>
					<Label>Anzahl der SpielerInnen</Label>
					<Input name="playerCount" type="number" required />
				</div>

				<div>
					<Label>Ansprechperson</Label>
					<Input name="contactPerson" required />
				</div>

				<div>
					<Label>Kontakt (E-Mail oder Telefon)</Label>
					<Input name="contact" required />
				</div>

				<div>
					<Label>Sonstiges</Label>
					<Textarea name="notes" className="h-32" />
				</div>
			</div>

			<Input name="h" type="text" className="hidden" />

			<div className="flex items-center">
				<SubmitButton />
			</div>
		</form>
	)
}
