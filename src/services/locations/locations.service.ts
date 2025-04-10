import type {
	GetParams,
	ParamId,
	Response,
	ResponseSingleData
} from "src/services/shared"
import { classic } from "src/shared/api"
import type { LocationCity } from "./locations.types"

class LocationsService {
	getCities = async (
		params: GetParams = {}
	): Promise<Response<LocationCity>> => {
		const response = await classic.get(`/locations/countries/1/cities`, {
			params
		})
		return response.data
	}

	getCitiesBySlug = async (
		slug: ParamId
	): Promise<ResponseSingleData<LocationCity>> => {
		const response = await classic.get(`/locations/countries/1/cities/${slug}`)
		return response.data
	}
}

export const locationsService = new LocationsService()
