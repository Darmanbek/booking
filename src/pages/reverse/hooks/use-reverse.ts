import { useContext } from "react"
import { ReverseContext } from "src/pages/reverse/context"

export const useReverse = () => {
	const reverse = useContext(ReverseContext)

	if (!reverse) {
		throw new Error("Reverse Context is null")
	}

	return reverse
}
