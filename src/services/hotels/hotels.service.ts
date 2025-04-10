import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type { Hotel, HotelLocation } from "./hotels.types"

class HotelsService {
	getHotelsSearch = async (
		params: GetParams = {}
	): Promise<Response<Hotel>> => {
		const response = await api.post(`/hotels/search`, params)
		return response.data
	}

	getHotelsBySlug = async (
		slug: ParamId
	): Promise<ResponseSingleData<Hotel>> => {
		const response = await api.get(`/hotels/${slug}`)
		return response.data
	}

	getHotelsBySlugLocation = async (
		slug: ParamId
	): Promise<ResponseSingleData<HotelLocation>> => {
		const response = await api.get(`/hotels/${slug}/location`)
		return response.data
	}
}

export const hotelsService = new HotelsService()
