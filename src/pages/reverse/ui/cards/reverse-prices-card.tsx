import { useParams } from "@tanstack/react-router"
import { Card, Flex, Form, List } from "antd"
import { type FC, useMemo } from "react"
import { useReverse } from "src/pages/reverse/hooks"
import { type RoomsInfo, useGetBookingByIdQuery } from "src/services/booking"
import { Text, Title } from "src/shared/ui"
import {
	formatNumber,
	formatPriceWithCurrency
} from "src/shared/utils/format.utils"

const ReversePricesCard: FC = () => {
	const { orderId } = useParams({
		from: "/_layout/orders/$orderId/reverse/$hotelSlug"
	})
	const { data: order, isLoading } = useGetBookingByIdQuery(orderId)
	const { form } = useReverse()

	const roomsInfo = Form.useWatch("rooms_info", form) || []
	const activeRooms = roomsInfo.map((el) => el?.uuid)

	const filteredRoomsInfo = useMemo(() => {
		if (!order?.data) return []
		return order?.data?.rooms_info?.filter((room) =>
			activeRooms?.includes(room?.uuid)
		)
	}, [activeRooms, order?.data])

	const orderTotalPrice = useMemo(() => {
		return (
			filteredRoomsInfo?.reduce(
				(total, room) => total + formatNumber(room?.price),
				0
			) || 0
		)
	}, [filteredRoomsInfo])
	return (
		<Card
			title={"Стоимость бронирования"}
			actions={[
				<Flex
					key={"Total"}
					style={{ width: "100%", padding: "8px 24px" }}
					justify={"space-between"}
					gap={16}
				>
					<Title level={5} style={{ maxWidth: 200 }}>
						Цена
					</Title>
					<Title level={5}>{formatPriceWithCurrency(orderTotalPrice)}</Title>
				</Flex>
			]}
		>
			<List<RoomsInfo>
				dataSource={filteredRoomsInfo}
				loading={isLoading}
				renderItem={(room, index) => (
					<List.Item key={index}>
						<Flex style={{ width: "100%" }} justify={"space-between"} gap={16}>
							<Text style={{ maxWidth: 200 }}>{room?.type || ""}</Text>
							<Text>{formatPriceWithCurrency(room?.price)}</Text>
						</Flex>
					</List.Item>
				)}
			/>
		</Card>
	)
}

export { ReversePricesCard }
