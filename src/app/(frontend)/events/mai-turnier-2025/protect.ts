export function generateToken(password: string) {
	const correctPassword = process.env.MAI_VSC_TOURNAMENT_2025
	if (password !== correctPassword) return null

	const token = Buffer.from(
		`mai-turnier-2025-${password}-${process.env.MAI_VSC_TOURNAMENT_2025!}`,
	).toString('base64')
	return token
}

export function verifyToken(token: string | null) {
	if (!token) return false
	const correctPassword = process.env.MAI_VSC_TOURNAMENT_2025
	const correctToken = generateToken(correctPassword as string)
	return token === correctToken
}
