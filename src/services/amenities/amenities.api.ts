import type { GetParams } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { amenitiesService } from "./amenities.service"

const useGetAmenitiesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => amenitiesService.get(params),
		queryKey: ["amenities", ...Object.values(params)]
	})
}

export { useGetAmenitiesQuery }
