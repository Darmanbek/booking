import type { GetParams, ResponseSingleData, Tokens } from "src/services/shared"
import { api, classic } from "src/shared/api"
import type {
	LoginChange,
	LogoutChange,
	RegisterChange,
	RegisterData,
	User,
	UserChange,
	UserPhoneChange,
	VerifyChange
} from "./users.types"

class UsersService {
	getMe = async (params: GetParams = {}): Promise<ResponseSingleData<User>> => {
		const response = await api.get(`/users/me`, { params })
		return response.data
	}

	login = async (form: LoginChange): Promise<ResponseSingleData<Tokens>> => {
		const response = await classic.post(`/users/auth/login`, form)
		return response.data
	}

	register = async (
		form: RegisterChange
	): Promise<ResponseSingleData<RegisterData>> => {
		const response = await classic.post(`/users/auth/register`, form)
		return response.data
	}

	verify = async (form: VerifyChange): Promise<ResponseSingleData<Tokens>> => {
		const response = await classic.post(`/users/auth/verify`, form)
		return response.data
	}

	logout = async (
		form: LogoutChange = {}
	): Promise<ResponseSingleData<Tokens>> => {
		const response = await api.post(`/users/auth/logout`, form)
		return response.data
	}

	editMe = async (form: UserChange): Promise<ResponseSingleData<User>> => {
		const response = await api.put(`/users/me`, form)
		return response.data
	}
	editMePhone = async (
		form: UserPhoneChange
	): Promise<ResponseSingleData<User>> => {
		const response = await api.put(`/users/me/phone-number`, form)
		return response.data
	}

	verifyMePhone = async (
		form: VerifyChange
	): Promise<ResponseSingleData<User>> => {
		const response = await api.put(`/users/me/phone-number/verify`, form)
		return response.data
	}

	deleteMe = async (): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/users/me`)
		return response.data
	}
}

export const usersService = new UsersService()
