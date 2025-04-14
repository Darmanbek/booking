import { createContext } from "react"

export type HotelsMenuContextValues = {
	isFilter: boolean
	toggleIsFilter: () => void
	isMap: boolean
	toggleIsMap: () => void
}

export const HotelsMenuContext = createContext<HotelsMenuContextValues | null>(
	null
)
