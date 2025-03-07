import { redirect } from 'next/navigation'
import { verifyToken } from './protect'
import TournamentPage from './tournament'

export default async function Page({
	searchParams,
}: {
	searchParams: { token?: string }
}) {
	const isAuthorized = verifyToken(searchParams.token || null)

	if (!isAuthorized) redirect('./mai-turnier-2025/auth')

	return <TournamentPage />
}
