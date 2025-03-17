import { type City, cityData } from "src/shared/data/city.data"

export type Hotel = {
	id: number
	name: string
	slug: string
	city: City
	price: number
	image: string
	address: string
	reviews_count: number
	rating: number | string
	distance: number | string
	location: {
		lat: number
		lng: number
	}
}

const hotel: Hotel = {
	id: 1,
	name: "Отель Delta",
	slug: "hotel-delta",
	city: {
		title: "Ташкент",
		slug: "tashkent",
		city: "Отели в Ташкенте"
	},
	price: 800_351,
	image: "/hotel/delta-hotel.jpg",
	address: "Чорсу 21 дом, 100071",
	reviews_count: 8_123,
	rating: 8.5,
	distance: 1.2,
	location: {
		lat: 41.2995,
		lng: 69.2401
	}
}

export const hotelData: Hotel[] = cityData.map((item, index) => {
	const randomLat = 41.2995 + (Math.random() - 0.5) * 0.1 // ±0.05 градуса
	const randomLng = 69.2401 + (Math.random() - 0.5) * 0.1 // ±0.05 градуса

	return {
		...hotel,
		id: index + 1,
		price: 100_000 + Math.random() * 1_000_000,
		rating: (0.1 + Math.random() * 10).toFixed(1),
		distance: (0.1 + Math.random() * 10).toFixed(1),
		city: item,
		location: {
			lat: parseFloat(randomLat.toFixed(4)),
			lng: parseFloat(randomLng.toFixed(4))
		}
	}
})
