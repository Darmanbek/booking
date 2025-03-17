import dayjs, { type Dayjs } from "dayjs"
import { create } from "zustand"

export type SearchChange = {
	search: string
	dates: [string | Dayjs, string | Dayjs]
	guests: number[]
}

interface SearchStore {
	search: SearchChange
	setSearch: (search: SearchChange) => void
}

const today = dayjs()

const useSearchStore = create<SearchStore>()((set) => ({
	search: {
		search: "tashkent",
		dates: [today.day(6), today.day(7)],
		guests: [1]
	},
	setSearch: (search) => set({ search })
}))

export { useSearchStore }
