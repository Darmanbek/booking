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

export const formatInputPrice = <T>(value?: T) =>
	`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
