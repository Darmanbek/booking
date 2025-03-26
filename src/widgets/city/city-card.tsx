import { Link } from "@tanstack/react-router"
import { Card, Flex, Image } from "antd"
import { type FC } from "react"
import type { City } from "src/shared/data/city.data"
import { Text, Title } from "src/shared/ui"

interface CityCardProps {
	data: City
}

const CityCard: FC<CityCardProps> = ({ data: city }) => {
	return (
		<Link
			to={"/hotels/$citySlug"}
			target={"_blank"}
			params={{
				citySlug: city.slug
			}}
		>
			<Card
				styles={{
					body: {
						padding: 8
					}
				}}
				hoverable={true}
				style={{ overflow: "hidden", cursor: "pointer" }}
				cover={
					<Image
						preview={false}
						loading={"lazy"}
						height={220}
						style={{
							objectFit: "cover"
						}}
						role={"presentation"}
						src={"/hotel/city.jpg"}
						alt={""}
					/>
				}
			>
				<Flex vertical={true} gap={2}>
					<Title level={5} style={{ fontSize: 14 }}>
						{city.title}
					</Title>
					<Text type={"secondary"} style={{ fontSize: 12 }}>
						{city.city}
					</Text>
				</Flex>
			</Card>
		</Link>
	)
}

export { CityCard }
