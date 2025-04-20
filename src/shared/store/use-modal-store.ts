import { create } from "zustand"

export type ModalParams = Record<string, unknown>

interface ModalStore {
	open: boolean
	params: ModalParams | null
	setParams: (params: ModalParams) => void
	getParams: <T extends ModalParams>() => T | null
	toggleOpen: () => void
	resetParams: () => void
}

const useModalStore = create<ModalStore>()((set, get) => ({
	open: false,
	toggleOpen: () => set((state) => ({ open: !state.open })),
	params: null,
	setParams: (params) => set({ params, open: true }),
	getParams: <T>() => {
		const value = get().params
		if (!value) return null
		return value as T
	},
	resetParams: () => set({ open: false, params: null })
}))

export { useModalStore }
