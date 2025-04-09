import type { TranslateKeys } from "src/services/shared"
import { create } from "zustand"

interface LangStore {
	lang: TranslateKeys
	setLang: (lang: TranslateKeys) => void
}

const useLangStore = create<LangStore>()((set) => ({
	lang: "ru",
	setLang: (lang) => set({ lang })
}))

export { useLangStore }
