import { create } from "zustand"

interface MenuStore {
	open: boolean
	toggleOpen: () => void
}

const useMenuStore = create<MenuStore>()((set) => ({
	open: false,
	toggleOpen: () => set((prev) => ({ open: !prev.open }))
}))

export { useMenuStore }
