import { cityData } from "src/shared/data/city.data"

export type Hotel = {
	id: number
	name: string
	slug: string
	city: string
	price: number
	image: string
	address: string
	reviews_count: number
	rating: number | string
	distance: number | string
}

const hotel: Hotel = {
	id: 1,
	name: "Отель Delta",
	slug: "hotel-delta",
	city: "Ташкент",
	price: 800_351,
	image: "/hotel/delta-hotel.jpg",
	address: "Чорсу 21 дом, 100071",
	reviews_count: 8_123,
	rating: 8.5,
	distance: 1.2
}

export const hotelData: Hotel[] = cityData.map((item, index) => ({
	...hotel,
	id: index + 1,
	price: 100_000 + Math.random() * 1_000_000,
	rating: (0.1 + Math.random() * 10).toFixed(1),
	distance: (0.1 + Math.random() * 10).toFixed(1),
	city: item.city
}))
