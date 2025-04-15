import type { GetParams, ResponseData } from "src/services/shared"
import { api } from "src/shared/api"
import type { HotelAmenity } from "./amenities.types"

class AmenitiesService {
	get = async (params: GetParams = {}): Promise<ResponseData<HotelAmenity>> => {
		const response = await api.get(`/hotel-amenities`, { params })
		return response.data
	}
}

export const amenitiesService = new AmenitiesService()
