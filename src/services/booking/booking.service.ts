import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type {
	Booking,
	BookingFinal,
	BookingFinalChange,
	BookingInitial,
	BookingInitialChange
} from "./booking.types"

class BookingService {
	get = async (params: GetParams = {}): Promise<Response<Booking>> => {
		const response = await api.get(`/bookings`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<BookingFinal>> => {
		const response = await api.get(`/booking/${id}`)
		return response.data
	}

	createInitial = async (
		hotelSlug: ParamId,
		form: BookingInitialChange
	): Promise<ResponseSingleData<BookingInitial>> => {
		const response = await api.post(
			`/hotels/${hotelSlug}/bookings/initial`,
			form
		)
		return response.data
	}

	createFinal = async (
		hotelSlug: ParamId,
		form: BookingFinalChange
	): Promise<ResponseSingleData<void>> => {
		const response = await api.post(`/hotels/${hotelSlug}/bookings/final`, form)
		return response.data
	}

	edit = async (
		form: Record<string, unknown>
	): Promise<ResponseSingleData<void>> => {
		const response = await api.put(`/booking/${form.id}/cancel`, form)
		return response.data
	}
}

export const bookingService = new BookingService()
