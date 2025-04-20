import { createContext } from "react"
import type { HotelRoom } from "src/services/hotels"

export type OrdersContextValues = {
	rooms: {
		quantity: number
		room: HotelRoom
	}[]
	addRoom: (room: HotelRoom, quantity: number) => void
}

export const OrdersContext = createContext<OrdersContextValues | null>(null)
