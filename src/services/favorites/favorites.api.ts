import { favoritesService } from "src/services/favorites/favorites.service"
import type { GetParams } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"

const useGetFavoritesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => favoritesService.get(params),
		queryKey: ["favorites", ...Object.values(params)]
	})
}

const useGetFavoritesByIdQuery = (id: unknown) => {
	return useCrudQuery({
		queryFn: () => favoritesService.getById(id),
		queryKey: ["favorites", id],
		enabled: !!id
	})
}

const useCreateFavoritesMutation = () => {
	return useCrudMutation({
		mutationFn: favoritesService.create,
		renderSuccess: () => ({
			description: "Добавлено в Избранное"
		}),
		invalidate: {
			queryKey: ["favorites"]
		}
	})
}

const useDeleteFavoritesMutation = () => {
	return useCrudMutation({
		mutationFn: favoritesService.delete,
		renderSuccess: () => ({
			description: "Удалено их Избранного"
		}),
		invalidate: {
			queryKey: ["favorites"]
		}
	})
}

export {
	useGetFavoritesQuery,
	useGetFavoritesByIdQuery,
	useCreateFavoritesMutation,
	useDeleteFavoritesMutation
}
