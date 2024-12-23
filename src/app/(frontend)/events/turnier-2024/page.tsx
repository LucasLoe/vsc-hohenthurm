import React from 'react'
import RegistrationFormTournament2024 from './form'

const page = () => {
	return (
		<div className="min-h-[calc(100vh-229px)] w-screen border-t-2 border-white bg-vsc-bg-dark text-vsc-bg-light">
			<div className="container mx-auto flex max-w-5xl flex-col gap-4 px-8 py-4 md:py-8">
				<h1 className="w-full gap-2.5 rounded bg-vsc-blue py-1 pl-2 pr-6 text-center text-lg font-light text-vsc-bg-dark sm:w-fit sm:text-left sm:text-xl md:text-2xl">
					Volleyball-Turnier 2025
				</h1>
				<div className="flex w-full flex-col items-stretch gap-y-4 py-4 md:flex-row">
					<div className="flex w-full flex-col gap-y-8 sm:pt-4 md:w-1/2">
						<div className="relative mx-auto h-40 w-full max-w-md">
							<div className="absolute left-0 top-2 -rotate-6">
								<div className="aspect-[4/3] w-48 rounded bg-vsc-bg-light shadow-2xl" />
							</div>
							<div className="absolute left-24 rotate-12">
								<div className="aspect-[4/3] w-48 rounded bg-vsc-bg-light shadow-2xl" />
							</div>
							<div className="absolute left-40 hidden rotate-6 sm:block">
								<div className="aspect-[4/3] w-48 rounded bg-vsc-bg-light shadow-2xl" />
							</div>
						</div>
						<p className="md:pr-2 md:text-left">
							Liebe Freunde des gepflegten Volleyballs,
							<br />
							<br />
							auch in diesem Jahr findet wieder unser alljährliches
							Volleyball-Turnier statt. Wir freuen uns auf zahlreiche
							Anmeldungen und einen spannenden Wettkampf.
							<br />
							<br />
							Das Turnier findet am xx.xx.2025 statt mit einem Eigenanteil von x
							€ pro Mannschaft. Die Adresse der Halle ist:
							<br />
							<br />
							xx <br />
							xx <br />
							xx <br />
						</p>
					</div>
					<div className="mx-auto flex w-full place-items-center md:w-1/2">
						<RegistrationFormTournament2024 />
					</div>
				</div>
			</div>
		</div>
	)
}

export default page
