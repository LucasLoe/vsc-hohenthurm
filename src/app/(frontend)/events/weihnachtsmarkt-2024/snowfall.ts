// components/Snowfall.tsx
'use client'

import { useEffect } from 'react'

const snowflakeSymbols = ['❄', '❅', '❆']

const random = (min: number, max: number) => {
	return Math.random() * (max - min) + min
}

const createSnowflake = () => {
	const snowflake = document.createElement('div')
	snowflake.classList.add('snowflake')
	snowflake.innerText =
		snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)]

	snowflake.style.left = `${random(0, 100)}vw`
	snowflake.style.fontSize = `${random(0.8, 2)}em`
	snowflake.style.opacity = random(0.5, 1).toString()
	snowflake.style.animationDuration = `${random(10, 30)}s`
	snowflake.style.animationDelay = `${random(0, 15)}s`
	snowflake.style.setProperty('--horizontal-drift', `${random(-15, 15)}vw`)
	snowflake.style.setProperty('--rotation', `${random(-360, 360)}deg`)

	if (Math.random() > 0.8) {
		snowflake.classList.add('flare')
	}

	if (Math.random() > 0.5) {
		snowflake.classList.add('blurred')
	}

	document.body.appendChild(snowflake)

	snowflake.addEventListener('animationend', () => {
		snowflake.remove()
	})
}

const Snowfall = () => {
	useEffect(() => {
		const snowflakeCount = 10

		// Initial snowflakes
		for (let i = 0; i < snowflakeCount; i++) {
			createSnowflake()
		}

		// Continuous generation
		const interval = setInterval(createSnowflake, 2000)

		// Cleanup
		return () => {
			clearInterval(interval)
			const snowflakes = document.querySelectorAll('.snowflake')
			snowflakes.forEach((snowflake) => snowflake.remove())
		}
	}, [])

	return null
}

export default Snowfall
