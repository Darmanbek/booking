import { Select, Space } from "antd"
import { type FC } from "react"
import { TranslateKeys } from "src/services/shared"
import { useLangStore } from "src/shared/store"

const LangSelect: FC = () => {
	const { lang, setLang } = useLangStore()
	console.log(lang)
	return (
		<>
			<Select
				variant={"borderless"}
				popupMatchSelectWidth={false}
				onChange={(lang) => {
					setLang(lang as TranslateKeys)
				}}
				value={lang}
				defaultValue={"ru"}
				options={[
					{
						label: "🇺🇿 Каракалпакский",
						value: "kk",
						emoji: "🇺🇿",
						desc: "Каракалпакский (KK)"
					},
					{
						label: "🇺🇿 Узбекский",
						value: "uz",
						emoji: "🇺🇿",
						desc: "Узбекский (UZ)"
					},
					{
						label: "🇷🇺 Русский",
						value: "ru",
						emoji: "🇷🇺",
						desc: "Русский (RU)"
					},
					{
						label: "🇺🇸 Английский",
						value: "en",
						emoji: "🇺🇸",
						desc: "Английский (EN)"
					}
				]}
				optionRender={(option) => (
					<Space>
						<span role={"img"} aria-label={option.data.label}>
							{option.data.emoji}
						</span>
						{option.data.desc}
					</Space>
				)}
			/>
		</>
	)
}

export { LangSelect }
