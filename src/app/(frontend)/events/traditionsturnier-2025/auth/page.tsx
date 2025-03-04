'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Image from 'next/image'

export default function TournamentPassword() {
	const router = useRouter()
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const res = await fetch('/api/verify-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password }),
		})

		if (res.ok) {
			const { token } = await res.json()
			router.push(`/events/traditionsturnier-2025?token=${token}`)
		} else {
			setError(true)
			setTimeout(() => setError(false), 3000)
		}
	}

	return (
		<div className="relative flex min-h-[calc(100vh-160px)] flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4">
			<Image
				src={'/images/background.jpg'}
				alt="Background"
				fill
				priority
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-black/70" />
			<div className="relative z-10 w-full max-w-md space-y-8 rounded-md border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md">
				<div className="mx-auto w-full space-y-2 text-center text-white">
					<Shield className="mx-auto h-12 w-12 text-vsc-blue" />
					<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
						VSC Hohenthurm
					</h1>
					<p className="text-xl font-semibold">Traditionsturnier 2025</p>
					<p className="text-gray-300">
						Bitte gib das Passwort ein um fortzufahren
					</p>
				</div>

				<Card className="rounded-md bg-transparent text-white">
					<CardHeader>
						<CardTitle>Geschützter Bereich</CardTitle>
						<CardDescription className="text-gray-400">
							Momentan ist dieser Bereich noch geschützt, bevor er später
							öffentliche Anmeldungen für alle ermöglicht.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Input
									id="password"
									type="password"
									placeholder="Passwort eingeben..."
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full placeholder-slate-100"
									autoComplete="off"
								/>
								{error && (
									<Alert variant="destructive" className="py-2">
										<AlertDescription>
											Falsches Passwort. Bitte nochmal probieren.
										</AlertDescription>
									</Alert>
								)}
							</div>
							<Button
								variant="outline"
								type="submit"
								className="group w-full border-none bg-vsc-blue text-black hover:bg-vsc-blue/80"
							>
								Ab zur Anmeldung
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
