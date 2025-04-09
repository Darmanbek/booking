import type { Dayjs } from "dayjs"

export type User = {
	id: number
	first_name: string
	last_name: string
	phone_number: string
	birthday: string | null
	gender: string | null
	country_id: number | null
	is_active: boolean
	is_verified: boolean
	is_fully_registered: boolean
	created_at: string
	updated_at: string
}

export type UserChange = {
	first_name: string
	last_name: string
	birthday: string | null | Dayjs
	gender: string | null
	country_id: number | null
}

export type UserPhoneChange = {
	phone_number: string
}

export type LoginChange = {
	phone_number: string
	password: string
}

export type RegisterData = {
	phone_number: string
}

export type RegisterChange = {
	phone_number: string
	first_name: string
	last_name: string
	password: string
	remember?: boolean
}

export type VerifyChange = {
	phone_number: string
	code: string
}

export type LogoutChange = {
	refresh_token?: string | null
}
