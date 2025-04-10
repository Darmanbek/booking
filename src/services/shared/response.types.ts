import type { AxiosError } from "axios"

export type Tokens = {
	access_token: string
	refresh_token: string | null
	token_type: string
}

export type Response<T> = {
	data: T[]
	pagination: Pagination
}

export type ResponseData<T> = {
	data: T[]
}

export type ResponseSingleData<T> = {
	data: T
}

export type ResponseError = AxiosError<{
	message: string
	detail: string
	status: string
	error_code: string
}>

export type Pagination = {
	page: number
	page_size: number
	total: number
	total_pages: number
}
