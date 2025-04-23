import { type TranslateName } from "src/services/shared"

export type LocationCity = {
	name: TranslateName
	country_id: number
	id: number
	slug: string
	properties_count: number
	image: string
	aero_lat: number
	aero_lng: number
	rail_lat: number
	rail_lng: number
	geocode_lng: number
	geocode_lat: number
}
