import { UserOutlined } from "@ant-design/icons"
import { Avatar, Card, Descriptions } from "antd"
import { type FC, useState } from "react"
import { useOrders } from "src/pages/hotel/hooks"
import type { HotelRoom, HotelRoomPrice } from "src/services/hotels"
import { useDebounceEffect as useEffect } from "src/shared/hooks"
import { Counter, Title } from "src/shared/ui"
import {
	formatNumber,
	formatPriceWithCurrency
} from "src/shared/utils/format.utils"

interface HotelVariantCardProps {
	data: {
		room: HotelRoom
		roomPrice?: HotelRoomPrice
	}
}

const HotelVariantCard: FC<HotelVariantCardProps> = ({
	data: { room, roomPrice }
}) => {
	const [quantity, setQuantity] = useState(0)
	const { addRoom } = useOrders()
	// const currentTotalQuantityRoom = useMemo(() => {
	// 	return rooms
	// 		?.filter((el) => el?.room?.id === room?.id)
	// 		?.reduce((total, item) => total + item?.quantity, 0)
	// }, [room?.id, rooms])

	useEffect(() => {
		addRoom(
			{
				...room,
				room_price_id: roomPrice?.id,
				base_price: roomPrice?.price || room?.base_price,
				max_guests: roomPrice?.guest_quantity || room?.max_guests
			},
			quantity
		)
	}, [
		addRoom,
		quantity,
		room,
		roomPrice?.guest_quantity,
		roomPrice?.id,
		roomPrice?.price
	])
	return (
		<Card
			style={{
				minWidth: 250,
				maxWidth: 250
			}}
			actions={[
				<Counter
					spaceProps={{
						style: {
							width: "100%",
							paddingInline: 12
						}
					}}
					value={quantity}
					onChange={(value) => {
						setQuantity(Number(value) || 0)
					}}
					style={{ width: "100%", maxWidth: "100%", textAlign: "center" }}
					key={"Counter"}
					max={room?.quantity}
					min={0}
				/>
			]}
		>
			<Descriptions
				layout={"vertical"}
				column={1}
				items={[
					{
						key: "guests",
						label: "Количество гостей",
						children: (
							<Avatar.Group>
								{Array.from({
									length: formatNumber(
										roomPrice?.guest_quantity || room?.max_guests
									)
								}).map((_, i) => (
									<Avatar icon={<UserOutlined />} key={i} />
								))}
							</Avatar.Group>
						)
					},
					{
						key: "price",
						label: "Цена за 1 ночь",
						children: (
							<Title level={5} style={{ fontSize: 14 }}>
								{formatPriceWithCurrency(roomPrice?.price || room?.base_price)}
							</Title>
						)
					}
				]}
			/>
		</Card>
	)
}

export { HotelVariantCard }
