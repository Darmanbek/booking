import type { TranslateName } from "src/services/shared"
import { User } from "src/services/users"

export type Hotel = {
	id: number
	name: TranslateName
	description: TranslateName
	slug: string
	images: string[]
	category: TranslateName
	location: HotelLocation
	reviews_count: number
	rating: number | null
	min_price: number
	guests: number
	available_rooms: HotelAvailableRoom[]
}

export type HotelLocation = {
	address: string
	city: string
	coordinates: HotelCoordinates
	distance_to_center: number
	to_airport: number
	to_railway: number
	to_city_center: number
}

export type HotelInfo = {
	id: number
	first_phone_number: string
	email: string
	second_phone_number: string
	site_url: string
	hotel_id: number
}

export type HotelRule = {
	id: number
	hotel_id: number
	check_in_from: string
	check_in_until: string | null
	check_out_from: string
	check_out_until: string | null
}

export type HotelAmenity = {
	id: number
	name: TranslateName
	hotel_amenities: Amenity[]
}

export type HotelImage = {
	id: number
	hotel_id: number
	image: string
	position: number
}

export type HotelReview = {
	id: number
	hotel_id: number
	user_id: number
	user: User
	comment: string
	updated_at: string | null
	rating: number
	created_at: string
	review_category_ratings: CategoryRating[]
}

export type HotelRating = {
	reviews_count: number
	hotel_id: number
	average_rating: number
	id: number
	category_ratings: CategoryRating[]
}

export type HotelRoom = {
	id: number
	quantity: number
	available_quantity: number
	max_guests: number
	room_type_id: number
	room_type: string
	base_price: number
	images: HotelImage[]
	amenities: HotelAmenity[]
	price_per_guest: number | null
}

export type HotelAvailableRoom = {
	room_id: number
	max_guests: number
	type: string
}

export type Amenity = {
	id: number
	name: TranslateName
	icon: string | null
	hotel_amenity_category_id: number
}

export type HotelCoordinates = {
	latitude: number
	longitude: number
}

export type CategoryRating = {
	id: number
	rating: number
	hotel_rating_id: number
	review_category_id: number
	review_category: ReviewCategory
}

export type ReviewCategory = {
	name: TranslateName
	id: number
}
