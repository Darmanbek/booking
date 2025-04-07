import { type FC, useCallback, useState } from "react"
import { useGetLocationsQuery } from "src/services/locations"
import { CityCardList } from "src/widgets/city/city-card-list"
import { TitleContainer } from "src/widgets/title-container"

const HomeCityList: FC = () => {
	const size = 6
	const [limit, setLimit] = useState(size)

	const {
		data: cities,
		isLoading,
		isFetching
	} = useGetLocationsQuery({
		page_size: limit,
		page: 1
	})

	const onChangeLimit = useCallback(() => {
		setLimit((prev) => prev + 6)
	}, [])

	return (
		<>
			<TitleContainer title={"Популярные направления"}>
				<CityCardList
					data={cities?.data || []}
					loading={isLoading || isFetching}
					limit={limit}
					onMore={onChangeLimit}
				/>
			</TitleContainer>
		</>
	)
}

export { HomeCityList }
