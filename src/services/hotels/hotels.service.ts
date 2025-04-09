import type { GetParams, Response } from "src/services/shared"
import { api } from "src/shared/api"

class HotelsService {
	getSearch = async (params: GetParams = {}): Promise<Response<void>> => {
		const response = await api.post(`/hotels`, params)
		return response.data
	}
}

export const hotelsService = new HotelsService()
