import type { TranslateName } from "src/services/shared"
import { useLangStore } from "src/shared/store"

export const useTranslation = () => {
	const { lang } = useLangStore()

	const t = (name?: TranslateName | string) => {
		if (name === undefined) return ""
		if (typeof name === "object") {
			return name[lang]
		}

		return name
	}

	return {
		t
	}
}
