import type { HotelAmenity } from "src/services/amenities"
import type {
	GetParams,
	ParamId,
	Response,
	ResponseData,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type {
	Hotel,
	HotelImage,
	HotelInfo,
	HotelLocation,
	HotelRating,
	HotelReview,
	HotelRoom,
	HotelRule
} from "./hotels.types"

class HotelsService {
	getSearch = async (params: GetParams = {}): Promise<Response<Hotel>> => {
		const response = await api.post(`/hotels/search`, params)
		return response.data
	}

	getPopular = async (params: GetParams = {}): Promise<ResponseData<Hotel>> => {
		const response = await api.get(`/hotels/popular`, {
			params
		})
		return response.data
	}

	getCount = async (
		params: GetParams = {}
	): Promise<
		ResponseSingleData<{
			count: number
		}>
	> => {
		const response = await api.get(`/hotels/count`, {
			params
		})
		return response.data
	}

	getBySlug = async (slug: ParamId): Promise<ResponseSingleData<Hotel>> => {
		const response = await api.get(`/hotels/${slug}`)
		return response.data
	}

	getBySlugLocation = async (
		slug: ParamId
	): Promise<ResponseSingleData<HotelLocation>> => {
		const response = await api.get(`/hotels/${slug}/location`)
		return response.data
	}

	getBySlugInfo = async (
		slug: ParamId
	): Promise<ResponseSingleData<HotelInfo>> => {
		const response = await api.get(`/hotels/${slug}/info`)
		return response.data
	}

	getBySlugRules = async (
		slug: ParamId
	): Promise<ResponseSingleData<HotelRule>> => {
		const response = await api.get(`/hotels/${slug}/rules`)
		return response.data
	}

	getBySlugAmenities = async (
		slug: ParamId
	): Promise<ResponseData<HotelAmenity>> => {
		const response = await api.get(`/hotels/${slug}/amenities`)
		return response.data
	}

	getBySlugImages = async (
		slug: ParamId
	): Promise<ResponseData<HotelImage>> => {
		const response = await api.get(`/hotels/${slug}/images`)
		return response.data
	}

	getBySlugReviews = async (
		slug: ParamId,
		params: GetParams = {}
	): Promise<ResponseData<HotelReview>> => {
		const response = await api.get(`/hotels/${slug}/reviews`, {
			params
		})
		return response.data
	}

	getBySlugRating = async (
		slug: ParamId
	): Promise<ResponseSingleData<HotelRating>> => {
		const response = await api.get(`/hotels/${slug}/rating`)
		return response.data
	}

	getBySlugRoomsSearch = async (
		slug: ParamId,
		params: GetParams = {}
	): Promise<ResponseData<HotelRoom>> => {
		const response = await api.post(`/hotels/${slug}/rooms/search`, params)
		return response.data
	}

	getBySlugRoomsById = async (
		slug: ParamId,
		id: ParamId
	): Promise<ResponseSingleData<HotelRoom>> => {
		const response = await api.get(`/hotels/${slug}/rooms/${id}`)
		return response.data
	}
}

export const hotelsService = new HotelsService()
