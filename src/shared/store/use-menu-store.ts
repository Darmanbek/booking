import { create } from "zustand"

interface MenuStore {
	open: boolean
	toggleOpen: () => void
	filter: boolean
	toggleFilter: () => void
	map: boolean
	toggleMap: () => void
}

const useMenuStore = create<MenuStore>()((set) => ({
	open: false,
	toggleOpen: () => set((prev) => ({ open: !prev.open })),
	filter: false,
	toggleFilter: () => set((prev) => ({ filter: !prev.filter })),
	map: false,
	toggleMap: () => set((prev) => ({ map: !prev.map }))
}))

export { useMenuStore }
