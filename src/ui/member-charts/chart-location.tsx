'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { MapContainer, Marker, TileLayer, Popup, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { LatLngExpression, Layer } from 'leaflet'
import geoData from './sachsen-anhalt-sued-geo.json'
import { GeoJsonObject } from 'geojson'
import { Icon } from 'leaflet'

const volleyballIcon = new Icon({
	iconUrl:
		'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXZvbGxleWJhbGwiPjxwYXRoIGQ9Ik0xMS4xIDcuMWExNi41NSAxNi41NSAwIDAgMSAxMC45IDQiLz48cGF0aCBkPSJNMTIgMTJhMTIuNiAxMi42IDAgMCAxLTguNyA1Ii8+PHBhdGggZD0iTTE2LjggMTMuNmExNi41NSAxNi41NSAwIDAgMS05IDcuNSIvPjxwYXRoIGQ9Ik0yMC43IDE3YTEyLjggMTIuOCAwIDAgMC04LjctNSAxMy4zIDEzLjMgMCAwIDEgMC0xMCIvPjxwYXRoIGQ9Ik02LjMgMy44YTE2LjU1IDE2LjU1IDAgMCAwIDEuOSAxMS41Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=',
	iconSize: [15, 15],
	iconAnchor: [12, 12],
})

const MapComponent = ({
	geographicDistribution,
}: {
	geographicDistribution: {
		halleSaale: number
		landsberg: number
		kabelsketal: number
		merseburg: number
		leipzig: number
		anderes: number
	}
}) => {
	const position: LatLngExpression = [51.42, 12.05]

	const gemeindeData = [
		{ location: 'Halle (Saale)', value: geographicDistribution.halleSaale },
		{ location: 'Landsberg', value: geographicDistribution.landsberg },
		{ location: 'Kabelsketal', value: geographicDistribution.kabelsketal },
		{ location: 'Merseburg', value: geographicDistribution.merseburg },
		{ location: 'Leipzig', value: geographicDistribution.leipzig },
		{ location: 'Anderes', value: geographicDistribution.anderes },
	]

	const bounds = {
		type: 'Feature',
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[-180, 90],
					[180, 90],
					[180, -90],
					[-180, -90],
					[-180, 90],
				],
			],
		},
	}

	const customPolygon = {
		type: 'Feature',
		properties: {
			GEN: 'Anderes',
			RS: 'custom001',
		},
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[11.63, 51.28],
					[11.68, 51.28],
					[11.68, 51.31],
					[11.63, 51.31],
					[11.63, 51.28],
				],
			],
		},
	}

	const combinedGeoData = {
		type: 'FeatureCollection',
		features: [...geoData.features, customPolygon],
	}

	const getOpacity = (gemeindeName: string) => {
		const entry = gemeindeData.find((item) => item.location === gemeindeName)
		if (!entry) return 0.2
		const maxValue = Math.max(...gemeindeData.map((item) => item.value))
		return 0.2 + (entry.value / maxValue) * 0.6
	}

	const styleFunction = (feature: any) => {
		return {
			fillColor: '#1f2021',
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: getOpacity(feature.properties.GEN),
		}
	}

	const onEachFeature = (feature: any, layer: Layer) => {
		const gemeindeName = feature.properties.GEN
		const entry = gemeindeData.find((item) => item.location === gemeindeName)
		const value = entry ? entry.value : 0

		const labelContent = `
    <div class="label-container">
      <div class="label-line"></div>
      <div class="label-text">${gemeindeName} (${value})</div>
    </div>
    `

		layer.bindTooltip(labelContent, {
			permanent: true,
			direction: 'right',
			className: 'custom-label',
			offset: [10, 10],
		})
	}

	return (
		<MapContainer
			dragging={false}
			touchZoom={false}
			center={position}
			zoom={8.5}
			zoomSnap={0.5}
			zoomControl={false}
			scrollWheelZoom={false}
			style={{ height: 'calc(100% - 2rem)', width: '100%' }}
		>
			<GeoJSON
				data={bounds as any}
				style={{
					fillColor: '#FFFFFF',
					fillOpacity: 1,
					weight: 0,
				}}
			/>

			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				eventHandlers={{
					add: (e) => {
						const path = e.target._container
						if (path) {
							path.setAttribute('mask', 'url(#mask)')
						}
					},
				}}
			/>

			<svg height="0" width="0" style={{ position: 'absolute' }}>
				<defs>
					<mask id="mask">
						<GeoJSON
							data={combinedGeoData as GeoJsonObject}
							style={{
								fillColor: '#ffffff',
								fillOpacity: 1,
								weight: 0,
							}}
						/>
					</mask>
				</defs>
			</svg>

			<GeoJSON
				data={combinedGeoData as GeoJsonObject}
				style={styleFunction}
				onEachFeature={onEachFeature}
			/>

			<Marker position={[51.5157613, 12.0953843]} icon={volleyballIcon}>
				<Popup>Turnhalle Hohenthurm</Popup>
			</Marker>
		</MapContainer>
	)
}

export default function Location({
	geographicDistribution,
}: {
	geographicDistribution: {
		halleSaale: number
		landsberg: number
		kabelsketal: number
		merseburg: number
		leipzig: number
		anderes: number
	}
}) {
	const Map = dynamic(() => Promise.resolve(MapComponent), {
		loading: () => <p>Karte wird geladen...</p>,
		ssr: false,
	})

	return (
		<>
			<style jsx global>{`
				.custom-label {
					background: none;
					border: none;
					box-shadow: none;
					font-weight: bold;
					color: #000;
					text-shadow:
						-1px -1px 0 #fff,
						1px -1px 0 #fff,
						-1px 1px 0 #fff,
						1px 1px 0 #fff;
				}
			`}</style>
			<Map geographicDistribution={geographicDistribution} />
		</>
	)
}
