import type { GetParams } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { categoriesService } from "./categories.service"

const useGetCategoriesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => categoriesService.get(params),
		queryKey: ["categories", ...Object.values(params)]
	})
}

export { useGetCategoriesQuery }
