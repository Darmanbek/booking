import type { TranslateName } from "src/services/shared"

export type HotelAmenity = {
	id: number
	name: TranslateName
	hotel_amenities: Amenity[]
	room_amenities: Amenity[]
}

export type Amenity = {
	key: number
	id: number
	name: TranslateName
	is_popular: boolean
	payment_type: string
	hotel_amenity_category_id: number
	icon: string | null
}
