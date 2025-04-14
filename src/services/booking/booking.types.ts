import type { Dayjs } from "dayjs"
import type { HotelImage, HotelLocation, HotelRoom } from "src/services/hotels"
import type { TranslateName } from "src/services/shared"

export type Booking = {
	status: string
	check_in_date: string
	total_price: number
	total_days: number
	time: string | null
	id: number
	check_out_date: string
	special_requests: string
	payment_method_id: number
	booking_type: string
	hotel_id: number
	user_id: number
	created_at: string
	updated_at: string | null
	hotel_info: BookingHotel
	booking_rooms: BookingRoom[]
}

export type BookingHotel = {
	is_active: boolean
	hotel_category_id: number
	id: number
	slug: string
	description: TranslateName
	hotel_admin_id: number
	created_at: string
	images: HotelImage[]
	updated_at: string | null
	name: TranslateName
	hotel_images: HotelImage[]
	location: HotelLocation
}

export type BookingRoom = {
	guest_name: string
	id: number
	booking_id: number
	room_id: number
	guest_quantity: number
	room: HotelRoom
}

export type BookingFinal = {
	check_in_date: string
	check_out_date: string
	rooms_info: RoomsInfo[]
	uuid: string
	hotel_id: number
	user_id: number
}

export type BookingInitial = {
	initial_booking_uuid: string
}

export type BookingInitialChange = {
	check_in_date: string
	check_out_date: string
	rooms_info: RoomsInfoChange[]
}

export type BookingFinalChange = {
	first_name: string
	last_name: string
	phone_number: string
	check_in_date?: string
	check_out_date?: string
	rooms_info: RoomsInfoChange[]
	special_requests: string
	time?: string | Dayjs
	payment_method_id: number
}

export type RoomsInfo = {
	uuid: number
	room_id: number
	guest_quantity: number
	guest_name: string
	type: string
	price: number
}

export type RoomsInfoChange = {
	uuid?: number
	room_id: number
	guest_quantity: number
	guest_name?: string
}
