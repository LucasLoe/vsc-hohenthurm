import { redirect } from 'next/navigation'
import { verifyToken } from './protect'
import TournamentPage from './tournament'

export default async function Page({
	searchParams,
}: {
	searchParams: { token?: string }
}) {
	const isAuthorized = verifyToken(searchParams.token || null)

	if (!isAuthorized) {
		// Get the current segment from runtime property
		redirect('./traditionsturnier-2025/auth')
	}

	return <TournamentPage />
}
