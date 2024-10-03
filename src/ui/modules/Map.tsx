'use client'

import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { GeopointValue } from 'sanity'
import L from 'leaflet'

const icon = L.icon({
	iconSize: [25, 41],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
})

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

export default Map
