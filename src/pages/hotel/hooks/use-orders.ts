import { useContext } from "react"
import { OrdersContext } from "src/pages/hotel/context"

export const useOrders = () => {
	const orders = useContext(OrdersContext)
	
	if (!orders) {
		throw new Error("Orders context is null")
	}
	
	return orders
}
