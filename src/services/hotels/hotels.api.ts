import type { GetParams, ParamId } from "src/services/shared"
import { useCrudQuery } from "src/shared/api"
import { hotelsService } from "./hotels.service"

const useGetHotelsSearchQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getSearch(params),
		queryKey: ["hotels", ...Object.values(params)]
	})
}

const useGetHotelsBySlugQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getBySlug(slug),
		queryKey: ["hotels", slug],
		enabled: !!slug
	})
}

const useGetHotelsBySlugLocationQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getBySlugLocation(slug),
		queryKey: ["hotels", slug, "location"],
		enabled: !!slug
	})
}

const useGetHotelsBySlugInfoQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getBySlugInfo(slug),
		queryKey: ["hotels", slug, "info"],
		enabled: !!slug
	})
}

const useGetHotelsBySlugRulesQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getBySlugRules(slug),
		queryKey: ["hotels", slug, "rules"],
		enabled: !!slug
	})
}

const useGetHotelsBySlugAmenitiesQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getBySlugAmenities(slug),
		queryKey: ["hotels", slug, "amenities"],
		enabled: !!slug
	})
}

const useGetHotelsBySlugImagesQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getBySlugImages(slug),
		queryKey: ["hotels", slug, "images"],
		enabled: !!slug
	})
}

const useGetHotelsBySlugReviewsQuery = (
	slug: ParamId,
	params: GetParams = {}
) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getBySlugReviews(slug, params),
		queryKey: ["hotels", slug, "reviews", ...Object.values(params)],
		enabled: !!slug
	})
}

const useGetHotelsBySlugRatingQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getBySlugRating(slug),
		queryKey: ["hotels", slug, "rating"],
		enabled: !!slug
	})
}

const useGetHotelsBySlugRoomsSearchQuery = (
	slug: ParamId,
	params: GetParams = {}
) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getBySlugRoomsSearch(slug, params),
		queryKey: ["hotels", slug, "rooms", ...Object.values(params)],
		enabled: !!slug
	})
}

const useGetHotelsBySlugRoomsByIdQuery = (slug: ParamId, id: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getBySlugRoomsById(slug, id),
		queryKey: ["hotels", slug, "rooms", id],
		enabled: !!slug
	})
}

export {
	useGetHotelsSearchQuery,
	useGetHotelsBySlugQuery,
	useGetHotelsBySlugLocationQuery,
	useGetHotelsBySlugInfoQuery,
	useGetHotelsBySlugRulesQuery,
	useGetHotelsBySlugAmenitiesQuery,
	useGetHotelsBySlugImagesQuery,
	useGetHotelsBySlugReviewsQuery,
	useGetHotelsBySlugRatingQuery,
	useGetHotelsBySlugRoomsSearchQuery,
	useGetHotelsBySlugRoomsByIdQuery
}
