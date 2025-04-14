export type BookingInitial = {
	initial_booking_uuid: string
}

export type BookingInitialChange = {
	check_in_date: string
	check_out_date: string
	rooms_info: RoomsInfo[]
}

export type BookingFinalChange = {
	check_in_date: string
	check_out_date: string
	rooms_info: RoomsInfo[]
	special_requests: string
	payment_method_id: number
}

export type RoomsInfo = {
	room_id: number
	guest_quantity: number
	guest_name?: string
}
