import dayjs, { type Dayjs } from "dayjs"

export const formatPrice = (price?: number | string): string => {
	if (price === undefined && isNaN(Number(price))) {
		return "0"
	}
	return Intl.NumberFormat("ru-RU", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(Number(price))
}

export const formatPriceWithCurrency = (price?: number | string): string => {
	if (price === undefined && isNaN(Number(price))) {
		return "0"
	}
	return (
		"UZS " +
		Intl.NumberFormat("ru-RU", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(Number(price))
	)
}

export const formatFormPhone = (phone?: string) => {
	if (!phone) return ""
	return `998` + phone
}

export const formatInputPrice = <T>(value?: T) =>
	`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")

export const formatDate = (value?: string | Dayjs) =>
	dayjs(value).format("YYYY-MM-DD")

export const formatCustomDate = (
	value?: string,
	format: string = "YYYY-MM-DD"
) => dayjs(value).format(format)

export const formatGuests = (guests?: string): number[] | null => {
	if (!guests) return null
	return guests.split("-").map(Number)
}
