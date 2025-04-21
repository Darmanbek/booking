import i18n from "i18next"
import type { TranslateKeys } from "src/services/shared"
import { langStorage } from "src/shared/utils"
import { create } from "zustand"

interface LangStore {
	lang: TranslateKeys
	setLang: (lang: TranslateKeys) => void
}

const useLangStore = create<LangStore>()((set) => ({
	lang: langStorage.get(),
	setLang: (lang) => {
		i18n.changeLanguage(lang.toUpperCase())
		set({ lang })
	}
}))

export { useLangStore }
