import type { GetParams } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { locationsService } from "./locations.service"

const useGetLocationsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => locationsService.getCities(params),
		queryKey: ["locations", ...Object.values(params)]
	})
}

export { useGetLocationsQuery }
