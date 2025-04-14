import type { FormInstance, FormProps } from "antd"
import { createContext } from "react"
import type { BookingFinalChange } from "src/services/booking"

export type ReverseContextValues = {
	form: FormInstance<BookingFinalChange>
	onFinish: FormProps<BookingFinalChange>["onFinish"]
}

export const ReverseContext = createContext<ReverseContextValues | null>(null)
