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
			className="ml-auto bg-gradient-to-r from-vsc-blue to-emerald-300 transition-all duration-200 hover:scale-[1.05] hover:from-cyan-300 hover:to-emerald-400 hover:shadow-md"
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
		prevState: FormState,
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
					tournament: 'Traditionsturnier 2025',
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

			const errorData = await res.json().catch(() => ({}))
			return {
				success: false,
				message: errorData.error || 'Registration failed',
			}
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
		<div className="w-full max-w-full rounded-xl border border-white/20 bg-black/50 p-6 backdrop-blur-md">
			<form action={formAction} className="w-full space-y-2">
				<div className="flex place-items-center gap-x-2 text-xl font-extrabold text-vsc-blue">
					<Heart className="inline-block size-4" />
					<h2 className="my-0 tracking-wider">Anmeldung:</h2>
				</div>
				<div className="space-y-4">
					<div>
						<Label className="font-light text-slate-200">Team-Name</Label>
						<Input
							className="border-white/10 bg-white/20 text-white placeholder:text-white/50"
							name="teamName"
							required
						/>
					</div>

					<div>
						<Label className="font-light text-slate-200">
							Anzahl der Spieler:innen
						</Label>
						<Input
							className="border-white/10 bg-white/20 text-white placeholder:text-white/50"
							name="playerCount"
							type="text"
							required
							pattern="[0-9]*"
							inputMode="numeric"
						/>
					</div>

					<div>
						<Label className="font-light text-slate-200">Ansprechperson</Label>
						<Input
							className="border-white/10 bg-white/20 text-white placeholder:text-white/50"
							name="contactPerson"
							required
						/>
					</div>

					<div>
						<Label className="font-light text-slate-200">
							Kontakt (E-Mail)
						</Label>
						<Input
							className="border-white/10 bg-white/20 text-white placeholder:text-white/50"
							name="contact"
							required
						/>
					</div>

					<div>
						<Label className="font-light text-slate-200">Sonstiges</Label>
						<Textarea
							name="notes"
							className="h-16 resize-none border-white/10 bg-white/20 text-white placeholder:text-white/50"
						/>
					</div>
				</div>

				<Input name="h" type="text" className="hidden" />

				<div className="relative">
					<ReCAPTCHA
						ref={recaptchaRef}
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT!}
						size="invisible"
						className="hidden"
					/>
				</div>
				{state.message && !state.success && (
					<div className="rounded bg-red-500/80 px-3 py-2 text-sm text-white">
						{state.message}
					</div>
				)}
				<div className="flex items-center py-2">
					<SubmitButton />
				</div>
			</form>
		</div>
	)
}
