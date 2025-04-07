import type { GetParams, Response } from "src/services/shared"
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
}

export const locationsService = new LocationsService()
