import type { TranslateName } from "src/services/shared"

export type Hotel = {
	id: number
	name: TranslateName
	description: TranslateName
	slug: string
	category: TranslateName
	location: HotelLocation
	reviews_count: number
	available_rooms: HotelAvailableRoom[]
}

export type HotelLocation = {
	address: string
	city: string
	coordinates: HotelCoordinates
	distance_to_center: number
}

export type HotelCoordinates = {
	latitude: number
	longitude: number
}

export type HotelAvailableRoom = {
	room_id: number
	max_guests: number
	type: string
}
