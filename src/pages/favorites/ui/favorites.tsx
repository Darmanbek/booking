import { type FC } from "react"
import { useGetFavoritesQuery } from "src/services/favorites"
import { HotelsList } from "src/widgets/hotel"

const Favorites: FC = () => {
	const { data: favorites, isLoading } = useGetFavoritesQuery()
	return (
		<>
			<HotelsList data={favorites?.data || []} loading={isLoading} />
		</>
	)
}

export { Favorites }
