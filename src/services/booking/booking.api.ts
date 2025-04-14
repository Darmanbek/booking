import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { bookingService } from "./booking.service"
import type { BookingFinalChange, BookingInitialChange } from "./booking.types"

const useGetBookingQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => bookingService.get(params),
		queryKey: ["booking", ...Object.values(params)]
	})
}

const useGetBookingByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => bookingService.getById(id),
		queryKey: ["booking", id],
		enabled: !!id
	})
}

const useCreateBookingInitialMutation = (hotelSlug: ParamId) => {
	return useCrudMutation({
		mutationFn: (form: BookingInitialChange) =>
			bookingService.createInitial(hotelSlug, form),
		invalidate: {
			queryKey: ["booking", hotelSlug]
		}
	})
}

const useCreateBookingFinalMutation = (hotelSlug: ParamId) => {
	return useCrudMutation({
		mutationFn: (form: BookingFinalChange) =>
			bookingService.createFinal(hotelSlug, form),
		renderSuccess: () => ({
			description: "Ваше бронирование прошло успешно"
		}),
		invalidate: {
			queryKey: ["booking", hotelSlug]
		}
	})
}

const useEditBookingFinalMutation = (hotelSlug: ParamId) => {
	return useCrudMutation({
		mutationFn: bookingService.edit,
		invalidate: {
			queryKey: ["booking", hotelSlug]
		}
	})
}

export {
	useGetBookingQuery,
	useGetBookingByIdQuery,
	useCreateBookingInitialMutation,
	useCreateBookingFinalMutation,
	useEditBookingFinalMutation
}
