import { Select, Space } from "antd"
import { type FC } from "react"

const LangSelect: FC = () => {
	return (
		<>
			<Select
				variant={"borderless"}
				popupMatchSelectWidth={false}
				defaultValue={"ru"}
				options={[
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
