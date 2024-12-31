'use client'

import ReCAPTCHA from 'react-google-recaptcha'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ChevronRight, Heart, Loader2 } from 'lucide-react'
import { useFormState, useFormStatus } from 'react-dom'
import { useRef } from 'react'

function SubmitButton() {
	const { pending } = useFormStatus()
	return (
		<Button
			className="ml-auto rounded-none bg-gradient-to-r from-vsc-blue to-emerald-300 transition-all duration-200 hover:scale-[1.05] hover:from-cyan-300 hover:to-emerald-400 hover:shadow-md"
			variant="secondary"
			type="submit"
			disabled={pending}
		>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Registriere...
				</>
			) : (
				<div className="flex place-items-center gap-x-2 text-black">
					<p>Registrieren</p>
					<ChevronRight className="size-4" />
				</div>
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

export default function RegistrationForm() {
	const recaptchaRef = useRef<ReCAPTCHA>(null)

	const registerActionWithRecaptcha = async (
		_: FormState,
		formData: FormData,
	): Promise<FormState> => {
		try {
			const token = await recaptchaRef.current?.executeAsync()
			if (!token) {
				return { success: false, message: 'reCAPTCHA not completed' }
			}

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
					recaptchaToken: token,
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

	const [state, formAction] = useFormState(
		registerActionWithRecaptcha,
		initialState,
	)

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
			<div className="flex place-items-center gap-x-2 text-vsc-pink">
				<Heart className="inline-block size-4" />
				<h2 className="my-0 text-lg font-light tracking-wider">
					Hier meldet ihr euch an:
				</h2>
			</div>
			<div className="space-y-4">
				<div>
					<Label className="font-light text-slate-200">Team-Name</Label>
					<Input
						className="rounded-none border-slate-400"
						name="teamName"
						required
					/>
				</div>

				<div>
					<Label className="font-light text-slate-200">
						Anzahl der Spieler:innen
					</Label>
					<Input
						className="rounded-none border-slate-400"
						name="playerCount"
						type="number"
						required
					/>
				</div>

				<div>
					<Label className="font-light text-slate-200">Ansprechperson</Label>
					<Input
						className="rounded-none border-slate-400"
						name="contactPerson"
						required
					/>
				</div>

				<div>
					<Label className="font-light text-slate-200">
						Kontakt (E-Mail oder Telefon)
					</Label>
					<Input
						className="rounded-none border-slate-400"
						name="contact"
						required
					/>
				</div>

				<div>
					<Label className="font-light text-slate-200">Sonstiges</Label>
					<Textarea
						name="notes"
						className="h-24 resize-none rounded-none border-slate-400"
					/>
				</div>
			</div>

			<Input name="h" type="text" className="hidden" />

			<ReCAPTCHA
				ref={recaptchaRef}
				sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT!}
				size="invisible"
			/>

			<div className="flex items-center">
				<SubmitButton />
			</div>
		</form>
	)
}
