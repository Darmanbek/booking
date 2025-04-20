import { useLocation, useParams } from "@tanstack/react-router"
import { Flex, Space } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import CountUp from "react-countup"
import { useGetHotelsCountQuery } from "src/services/hotels"
import { useToken } from "src/shared/hooks"
import { Container, Paragraph, Title } from "src/shared/ui"
import { formatNumber } from "src/shared/utils"
import { NavbarSearch } from "./navbar-search"

const Navbar: FC = () => {
	const { token } = useToken()
	const { pathname } = useLocation()
	const { md = true } = useResponsive()
	const { orderId, hotelSlug } = useParams({
		strict: false
	})

	const { data: hotels } = useGetHotelsCountQuery()

	const isHome = pathname === "/"

	if (
		["/login", "/register", `/orders/${orderId}/reverse/${hotelSlug}`].includes(
			pathname
		)
	)
		return

	return (
		<nav
			style={{
				position: "relative",
				minHeight: isHome ? 434 : "auto",
				backgroundColor: token.blue10,
				padding: `${token.paddingLG}px 0`,
				color: token.colorWhite,
				overflow: "hidden"
			}}
		>
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
						{isHome && (
							<>
								<Title level={md ? 1 : 2} style={{ color: "inherit" }}>
									Отели в Узбекистане
								</Title>
								<Paragraph
									style={{
										color: "inherit",
										fontSize: md
											? token.fontSizeHeading4
											: token.fontSizeHeading5
									}}
								>
									Введите свои даты и выбирайте из{" "}
									<CountUp end={formatNumber(hotels?.data?.count)} /> отелей и
									других вариантов жилья!
								</Paragraph>
							</>
						)}
						<NavbarSearch />
					</Space>
				</Flex>
			</Container>
		</nav>
	)
}

export { Navbar }
