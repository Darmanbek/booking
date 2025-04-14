import { useContext } from "react"
import { HotelsMenuContext } from "src/pages/hotels/context"

export const useHotelsMenu = () => {
	const hotelsMenu = useContext(HotelsMenuContext)

	if (!hotelsMenu) {
		throw new Error("Hotels Menu Context is null")
	}

	return hotelsMenu
}
