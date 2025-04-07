import { SyncOutlined } from "@ant-design/icons"
import { Button, Col, Flex, Row } from "antd"
import { type FC } from "react"
import type { LocationCity } from "src/services/locations"
import { CityCard } from "./city-card"
import { CityLoadingCard } from "./city-loading-card"

interface CityCardListProps {
	data: LocationCity[]
	loading: boolean
	limit: number
	onMore: () => void
}

const CityCardList: FC<CityCardListProps> = ({
	data,
	loading,
	onMore,
	limit
}) => {
	return (
		<Flex vertical={true} gap={20}>
			<Row gutter={20} style={{ rowGap: 20 }}>
				{data?.map((city, index) => (
					<Col key={index} xs={24} sm={12} lg={8}>
						<CityCard data={city} />
					</Col>
				))}
			</Row>
			{loading && (
				<Row gutter={20} style={{ rowGap: 20 }}>
					{Array.from({ length: 6 })?.map((_, index) => (
						<Col key={index} xs={24} sm={12} lg={8}>
							<CityLoadingCard />
						</Col>
					))}
				</Row>
			)}
			{limit <= data.length && (
				<Flex justify={"center"} align={"center"}>
					<Button
						loading={loading}
						type={"primary"}
						onClick={onMore}
						icon={<SyncOutlined />}
					>
						Показать ещё
					</Button>
				</Flex>
			)}
		</Flex>
	)
}

export { CityCardList }
