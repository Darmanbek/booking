import { HeartFilled, HeartOutlined, LoadingOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"
import { type FC } from "react"
import {
	useCreateFavoritesMutation,
	useDeleteFavoritesMutation,
	useGetFavoritesByIdQuery
} from "src/services/favorites"
import { useToken } from "src/shared/hooks"

interface FavoriteButtonProps extends ButtonProps {
	data?: string
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
	data: hotelSlug,
	...props
}) => {
	const { mutate: addFavorite, isPending: addLoading } =
		useCreateFavoritesMutation()
	const { mutate: deleteFavorite, isPending: deleteLoading } =
		useDeleteFavoritesMutation()
	const { data: favorite, isLoading } = useGetFavoritesByIdQuery(hotelSlug)

	const { token } = useToken()

	const onFavorite = () => {
		if (!hotelSlug) return
		if (favorite?.data) {
			deleteFavorite(hotelSlug)
			return
		}
		addFavorite({
			hotel_slug: hotelSlug
		})
	}

	return (
		<>
			<Button
				shape={"circle"}
				icon={
					addLoading || deleteLoading || isLoading ? (
						<LoadingOutlined />
					) : favorite?.data ? (
						<HeartFilled style={{ color: token.colorPrimary }} />
					) : (
						<HeartOutlined />
					)
				}
				onClick={onFavorite}
				{...props}
			/>
		</>
	)
}

export { FavoriteButton }
