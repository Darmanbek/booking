import { Card, Flex, Skeleton } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"

const HotelLoadingCard: FC = () => {
	const { token } = useToken()
	return (
		<>
			<Card
				styles={{
					body: {
						padding: 12,
						paddingTop: 0
					}
				}}
				style={{
					minWidth: 302,
					maxWidth: 628,
					width: "100%",
					overflow: "hidden",
					cursor: "pointer"
				}}
				cover={
					<Flex style={{ width: "100%", padding: 12 }}>
						<Skeleton.Image
							active={true}
							style={{
								height: 256,
								width: "100%",
								objectFit: "cover",
								borderRadius: token.borderRadiusLG
							}}
						/>
					</Flex>
				}
			>
				<Skeleton active={true} />
			</Card>
		</>
	)
}

export { HotelLoadingCard }
