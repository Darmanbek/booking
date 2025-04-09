import type { GetParams, Response } from "src/services/shared"
import { api } from "src/shared/api"
import type { Hotel } from "./hotels.types"

class HotelsService {
	getSearch = async (params: GetParams = {}): Promise<Response<Hotel>> => {
		const response = await api.post(`/hotels/search`, params)
		return response.data
	}
}

export const hotelsService = new HotelsService()
