import type { Hotel } from "src/services/hotels"
import type {
	GetParams,
	ParamId,
	ResponseData,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type { FavoriteChange } from "./favorites.types"

class FavoritesService {
	get = async (params: GetParams = {}): Promise<ResponseData<Hotel>> => {
		const response = await api.get(`/favorites`, { params })
		return response.data
	}

	getById = async (id: unknown): Promise<ResponseSingleData<boolean>> => {
		const response = await api.get(`/favorites/${id}`)
		return response.data
	}

	create = async (form: FavoriteChange): Promise<ResponseSingleData<void>> => {
		const response = await api.post(`/favorites/${form?.hotel_slug}`)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/favorites/${id}`)
		return response.data
	}
}

export const favoritesService = new FavoritesService()
