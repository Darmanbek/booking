import { Flex } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { HotelVariantCard } from "./hotel-variant-card"

const HotelVariantList: FC = () => {
	const { token } = useToken()
	return (
		<div
			style={{
				position: "relative"
			}}
		>
			<div
				style={{
					position: "absolute",
					zIndex: 5,
					top: 0,
					left: 0,
					bottom: 0,
					width: 12,
					background: `linear-gradient(90deg, ${token.colorBgLayout}, transparent)`
				}}
			></div>
			<div
				style={{
					position: "absolute",
					zIndex: 5,
					top: 0,
					right: 0,
					bottom: 0,
					width: 12,
					background: `linear-gradient(-90deg, ${token.colorBgLayout}, transparent)`
				}}
			></div>
			<Flex
				style={{
					width: "100%",
					backgroundColor: token.colorBgLayout,
					padding: 12,
					gap: 16,
					borderRadius: token.borderRadius,
					overflowX: "auto",
					overflowY: "hidden",
					scrollbarWidth: "thin"
				}}
			>
				{Array.from({ length: 5 }).map((_, index) => (
					<HotelVariantCard data={index} key={index} />
				))}
			</Flex>
		</div>
	)
}

export { HotelVariantList }
