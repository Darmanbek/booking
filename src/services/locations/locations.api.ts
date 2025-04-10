import type { GetParams, ParamId } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { locationsService } from "./locations.service"

const useGetLocationsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => locationsService.getCities(params),
		queryKey: ["locations", ...Object.values(params)]
	})
}

const useGetLocationBySlugQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => locationsService.getCitiesBySlug(slug),
		queryKey: ["locations", slug],
		enabled: !!slug
	})
}

export { useGetLocationsQuery, useGetLocationBySlugQuery }
