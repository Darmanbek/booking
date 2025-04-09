import type { GetParams } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { hotelsService } from "./hotels.service"

const useGetHotelsSearchQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getSearch(params),
		queryKey: ["hotels", ...Object.values(params)]
	})
}

export { useGetHotelsSearchQuery }
