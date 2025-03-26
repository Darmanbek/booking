import {
	HeartOutlined,
	OrderedListOutlined,
	SettingOutlined
} from "@ant-design/icons"
import {
	createFileRoute,
	Link,
	Outlet,
	useLocation
} from "@tanstack/react-router"
import { Breadcrumb, Card, Col, Flex, Menu, Row } from "antd"
import { Container } from "src/shared/ui"

export const Route = createFileRoute("/_layout/_profile-layout")({
	component: RouteComponent
})

const items = [
	{
		key: "/profile/settings",
		icon: <SettingOutlined />,
		label: "Настрока профиля"
	},
	{
		key: "/orders",
		icon: <OrderedListOutlined />,
		label: "Мои бронирования"
	},
	{
		key: "/favorites",
		icon: <HeartOutlined />,
		label: "Мои избранные отели"
	}
]

function RouteComponent() {
	const navigate = Route.useNavigate()
	const { pathname } = useLocation()

	const currentBreadcrumb = items.find((item) => item.key === pathname)?.label

	return (
		<section>
			<Container>
				<Flex vertical={true} gap={20}>
					<Card>
						<Breadcrumb
							items={[
								{
									title: <Link to={"/"}>Главная</Link>
								},
								currentBreadcrumb
									? {
											title: currentBreadcrumb
										}
									: {}
							]}
						/>
					</Card>
					<Row gutter={20} style={{ rowGap: 20 }}>
						<Col span={8}>
							<Card title={"Alex Mercer"}>
								<Menu
									selectedKeys={[pathname]}
									onSelect={(item) => navigate({ to: item.key })}
									items={items}
								/>
							</Card>
						</Col>
						<Col span={16}>
							<Flex vertical={true} gap={20}>
								<Outlet />
							</Flex>
						</Col>
					</Row>
				</Flex>
			</Container>
		</section>
	)
}
