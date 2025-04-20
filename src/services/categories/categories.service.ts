import type { GetParams, ResponseData } from "src/services/shared"
import { api } from "src/shared/api"
import type { Category } from "./categories.types"

class CategoriesService {
	get = async (params: GetParams = {}): Promise<ResponseData<Category>> => {
		const response = await api.get(`/reviews/categories`, { params })
		return response.data
	}
}

export const categoriesService = new CategoriesService()
