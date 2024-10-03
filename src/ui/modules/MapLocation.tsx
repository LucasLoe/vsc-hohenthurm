'use client'

import 'leaflet/dist/leaflet.css'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import React from 'react'
import { GeopointValue } from 'sanity'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import BlueGeometric from '../backgrounds/BlueGeometric'
import { Roboto_Slab } from 'next/font/google'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { PortableText } from 'next-sanity'

const roboto = Roboto_Slab({ subsets: ['latin'] })

const icon = L.icon({
	iconSize: [25, 41],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
})

const GoogleMapsLink = ({ link }: { link: string }) => {
	return (
		<Link className="ml-auto mr-0" href={link} target="_blank">
			<p className="flex place-items-center gap-2 text-sm text-gray-300">
				Google Maps <ExternalLinkIcon className="size-4" />
			</p>
		</Link>
	)
}

const MapLayout = ({
	children,
	title,
	description,
	layout,
}: {
	children: React.ReactNode
	title: string | null
	description: any
	layout: 'card' | 'full-width'
}) => {
	return layout === 'card' ? (
		<Card className="w-80">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					<PortableText value={description} />
				</CardDescription>
			</CardHeader>
			<CardContent className="w-full">{children}</CardContent>
		</Card>
	) : (
		<section className="py-8 sm:py-12">
			<BlueGeometric>
				<div className="mx-auto grid w-full max-w-4xl grow grid-cols-1 gap-8 py-4 sm:grid-cols-2 sm:px-4 sm:py-8">
					<div className="mx-auto self-center">
						<p
							className={`mb-4 text-2xl font-medium text-vsc-blue ${roboto.className}`}
						>
							{title}
						</p>
						<div className="text-vsc-bg-light">
							<PortableText value={description} />
						</div>
					</div>
					<div className="mx-auto h-96 w-full self-center sm:w-64 md:w-80 lg:w-96">
						{children}
					</div>
				</div>
			</BlueGeometric>
		</section>
	)
}

const Map = ({ coordinates }: { coordinates: GeopointValue }) => {
	const { lat, lng } = coordinates
	return (
		<MapContainer
			className="mx-auto h-96 w-full rounded border-0 shadow-xl outline-0"
			center={[lat, lng]}
			zoom={15}
			scrollWheelZoom={false}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Marker position={[lat, lng]} icon={icon}></Marker>
		</MapContainer>
	)
}

const MapLocation = ({
	title,
	description,
	coordinates,
	layout,
	googleMapsLink,
}: {
	title: string
	description: any
	coordinates: GeopointValue
	layout: 'card' | 'full-width'
	googleMapsLink: string
}) => {
	return (
		<MapLayout title={title} description={description} layout={layout}>
			<div className="flex flex-col gap-2">
				<Map coordinates={coordinates} />
				{googleMapsLink ? <GoogleMapsLink link={googleMapsLink} /> : null}
			</div>
		</MapLayout>
	)
}

export default MapLocation
