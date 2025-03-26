import { SyncOutlined } from "@ant-design/icons"
import { Button, Col, Flex, Row } from "antd"
import { type FC, useState } from "react"
import { cityData } from "src/shared/data/city.data"
import { CityCard } from "./city-card"

const CityCardList: FC = () => {
	const size = 6

	const [limit, setLimit] = useState(size)

	const onChangeLimit = () => {
		setLimit((prev) => prev + size)
	}

	return (
		<Flex vertical={true} gap={20}>
			<Row gutter={20} style={{ rowGap: 20 }}>
				{cityData
					.filter((_, index) => index + 1 <= limit)
					.map((city, index) => (
						<Col key={index} xs={24} sm={12} lg={8}>
							<CityCard data={city} />
						</Col>
					))}
			</Row>
			{limit < cityData.length && (
				<Flex justify={"center"} align={"center"}>
					<Button
						type={"primary"}
						onClick={onChangeLimit}
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
