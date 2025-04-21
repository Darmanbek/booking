import { useTranslation as useI18Translation } from "react-i18next"
import type { TranslateName } from "src/services/shared"
import { useLangStore } from "src/shared/store"

export const useTranslation = () => {
	const { lang } = useLangStore()
	const { t: translate, ...rest } = useI18Translation()

	const t = (name?: TranslateName | string) => {
		if (name === undefined) return ""
		if (typeof name === "object") {
			return translate(name[lang] || name["ru"] || "-")
		}

		return translate(name)
	}

	return {
		t,
		...rest
	}
}
