import type { TranslateName } from "src/services/shared"

export type Amenity = {
	id: number
	name: TranslateName
	hotel_amenities: HotelAmenity[]
}

export type HotelAmenity = {
	key: number
	id: number
	name: TranslateName
	is_popular: boolean
	payment_type: string
	hotel_amenity_category_id: number
}
