export function generateToken(password: string) {
	const correctPassword = process.env.TRAD_VSC_TOURNAMENT_2025
	if (password !== correctPassword) return null

	const token = Buffer.from(
		`traditionsturnier-2025-${password}-${process.env.TOURNAMENT_SECRET_KEY!}`,
	).toString('base64')
	return token
}

export function verifyToken(token: string | null) {
	if (!token) return false
	const correctPassword = process.env.TRAD_VSC_TOURNAMENT_2025
	const correctToken = generateToken(correctPassword as string)
	return token === correctToken
}
