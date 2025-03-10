import { Flex, Space } from "antd"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Container, Paragraph, Title } from "src/shared/ui"
import { NavbarSearch } from "./navbar/navbar-search"
import { useNavbarStyles } from "./navbar/navbar.style"

const Navbar: FC = () => {
	const { token } = useToken()
	const { styles } = useNavbarStyles()
	return (
		<nav
			style={{
				position: "relative",
				height: 434,
				backgroundColor: "#000",
				padding: `${token.paddingLG}px 0`,
				color: token.colorWhite,
				overflow: "hidden"
			}}
		>
			<div
				style={{
					backgroundColor: token.colorBgMask,
					position: "absolute",
					inset: 0,
					zIndex: 2
				}}
			></div>
			<img
				src={"/home/preview.jpeg"}
				style={{
					position: "absolute",
					inset: 0,
					margin: "0 auto",
					maxWidth: 1440
				}}
				alt={""}
			/>
			<div className={styles.navbarBg}></div>
			<Container
				style={{
					display: "flex",
					flexDirection: "column",
					flexGrow: 1,
					position: "relative",
					zIndex: 5
				}}
			>
				<Flex flex={1} vertical={true} align={"center"} justify={"center"}>
					<Space
						direction={"vertical"}
						size={"large"}
						style={{ width: "100%" }}
					>
						<Title level={1} style={{ color: "inherit" }}>
							Отели в Узбекистане
						</Title>
						<Paragraph
							style={{ color: "inherit", fontSize: token.fontSizeHeading4 }}
						>
							Введите свои даты и выбирайте из 818 отелей и других вариантов
							жилья!
						</Paragraph>
						<NavbarSearch />
					</Space>
				</Flex>
			</Container>
		</nav>
	)
}

export { Navbar }
