export type GetParams = {
	city?: string
	check_in?: string
	check_out?: string
	limit?: number
	page?: number
	page_size?: number
	search?: string
	guests?: number[]
	price_min?: number
	price_max?: number
	max_distance_to_center?: number
	amenities?: (number | string | undefined)[]
}

export type ParamId = number | string | null | undefined
