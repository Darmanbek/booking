import { Link } from "@tanstack/react-router"
import { Button, Flex, Layout, Select, Space } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Container, Logo } from "src/shared/ui"

const Header: FC = () => {
	const { token } = useToken()

	return (
		<Layout.Header
			style={{
				backgroundColor: token.colorBgContainer
				// borderBottom: `1px solid ${token.colorBorder}`
			}}
		>
			<Container>
				<Flex
					align={"center"}
					gap={8}
					justify={"space-between"}
					style={{
						padding: "0 16px",
						height: "100%"
					}}
				>
					<Link to={"/"}>
						<Logo titleProps={{ style: { color: "inherit" } }} />
					</Link>
					<Space>
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
						<Button type={"primary"}>Зарегистрироваться</Button>
						<Button type={"link"}>Войти</Button>
					</Space>
				</Flex>
			</Container>
		</Layout.Header>
	)
}

export { Header }
