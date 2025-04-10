import type { GetParams, ParamId } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { hotelsService } from "./hotels.service"

const useGetHotelsSearchQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getHotelsSearch(params),
		queryKey: ["hotels", ...Object.values(params)]
	})
}

const useGetHotelsBySlugQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getHotelsBySlug(slug),
		queryKey: ["hotels", slug],
		enabled: !!slug
	})
}

const useGetHotelsBySlugLocationQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getHotelsBySlugLocation(slug),
		queryKey: ["hotels", slug, "location"],
		enabled: !!slug
	})
}

export {
	useGetHotelsSearchQuery,
	useGetHotelsBySlugQuery,
	useGetHotelsBySlugLocationQuery
}
