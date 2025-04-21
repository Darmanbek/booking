import { type FC, type PropsWithChildren, useCallback, useState } from "react"
import {
	OrdersContext,
	type OrdersContextValues
} from "src/pages/hotel/context"
import type { HotelRoom } from "src/services/hotels"

const OrdersProvider: FC<PropsWithChildren> = ({ children }) => {
	const [rooms, setRooms] = useState<OrdersContextValues["rooms"]>([])

	const addRoom = useCallback((room: HotelRoom, quantity: number) => {
		setRooms((prev) => {
			const existing = prev.find((el) => {
				if (el?.room?.room_price_id !== undefined)
					return (
						el?.room?.id === room?.id &&
						el?.room?.room_price_id === room?.room_price_id
					)
				return el?.room?.id === room?.id
			})

			if (quantity === 0) {
				return prev.filter((el) => {
					if (el?.room?.room_price_id !== undefined)
						return (
							el?.room?.id !== room?.id &&
							el?.room?.room_price_id !== room?.room_price_id
						)
					return el?.room?.id !== room?.id
				})
			}

			if (existing) {
				return prev.map((el) => {
					if (el?.room?.room_price_id !== undefined) {
						return el?.room?.id === room?.id &&
							el?.room?.room_price_id === room?.room_price_id
							? {
									...el,
									quantity
								}
							: el
					}
					return el?.room?.id === room?.id ? { ...el, quantity } : el
				})
			}

			return [...prev, { room, quantity }]
		})
	}, [])

	return (
		<OrdersContext.Provider
			value={{
				rooms,
				addRoom
			}}
		>
			{children}
		</OrdersContext.Provider>
	)
}

export { OrdersProvider }
