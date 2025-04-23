import { Link } from "@tanstack/react-router"
import { Card, Flex, Image } from "antd"
import { type FC } from "react"
import type { LocationCity } from "src/services/locations"
import { useTranslation } from "src/shared/hooks"
import { Title } from "src/shared/ui"

interface CityCardProps {
	data: LocationCity
}

const CityCard: FC<CityCardProps> = ({ data: city }) => {
	const { t } = useTranslation()

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
						placeholder={true}
						height={220}
						style={{
							objectFit: "cover"
						}}
						role={"presentation"}
						src={city.image}
						alt={""}
					/>
				}
			>
				<Flex vertical={true} gap={2}>
					<Title level={5} style={{ fontSize: 14 }}>
						{t(city.name)}
					</Title>
					{/*<Text type={"secondary"} style={{ fontSize: 12 }}>*/}
					{/*	{city.slug}*/}
					{/*</Text>*/}
				</Flex>
			</Card>
		</Link>
	)
}

export { CityCard }
