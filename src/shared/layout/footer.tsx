import {
	FacebookFilled,
	InstagramFilled,
	SendOutlined,
	TwitterOutlined,
	YoutubeFilled
} from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Button, Divider, Flex, Image, Layout, QRCode, Space } from "antd"
import { type FC } from "react"
import { Container, Logo, Text, Title } from "src/shared/ui"

const Footer: FC = () => {
	return (
		<>
			<Layout.Footer>
				<Container>
					<Flex vertical={true}>
						<Divider />
						<Flex justify={"space-between"}>
							<Link to={"/"}>
								<Logo />
							</Link>
							<Space>
								<Button
									size={"large"}
									shape={"circle"}
									type={"text"}
									icon={<FacebookFilled />}
								/>
								<Button
									size={"large"}
									shape={"circle"}
									type={"text"}
									icon={<InstagramFilled />}
								/>
								<Button
									size={"large"}
									shape={"circle"}
									type={"text"}
									icon={<YoutubeFilled />}
								/>
								<Button
									size={"large"}
									shape={"circle"}
									type={"text"}
									icon={<TwitterOutlined />}
								/>
								<Button
									size={"large"}
									shape={"circle"}
									type={"text"}
									icon={<SendOutlined rotate={-45} />}
								/>
							</Space>
						</Flex>
						<Divider />
						<Flex gap={20} justify={"space-between"}>
							<Flex vertical={true} gap={8}>
								<Title level={5}>Контакты:</Title>
								<Flex vertical={true} gap={12}>
									<Text
										type={"secondary"}
										style={{ maxWidth: 480, textWrap: "balance" }}
									>
										Если у вас возник вопрос по бронированию, пожалуйста,
										свяжитесь с нами по телефону или с помощью формы обратной
										связи. Служба поддержки работает онлайн в режиме 24/7 без
										выходных и праздников.
									</Text>
									<a href={"mailto:info@booking.uz"} rel={"nofollow"}>
										info@booking.uz
									</a>
									<a
										href={
											"https://maps.google.com/?q=Узбекистан, Ташкент, Чорсу 95"
										}
										target={"_blank"}
										rel={"nofollow"}
									>
										Узбекистан, Ташкент, Чорсу 95
									</a>
									<a href={"tel:+998999999999"} rel={"nofollow"}>
										+998 99 999 99 99
									</a>
								</Flex>
							</Flex>
							<Flex vertical={true} gap={8}>
								<Title level={5}>Мобильное приложение:</Title>
								<Flex gap={8}>
									<Flex vertical={true} gap={12}>
										<Text
											type={"secondary"}
											style={{ maxWidth: 300, textWrap: "balance" }}
										>
											В приложении цены на отели ещё ниже, а выбор шире!
											Бронирования можно оплачивать через Apple Pay и Android
											Pay. Ваучер хранится в личном кабинете и доступен, даже
											если нет интернета.
										</Text>
										<Flex gap={12}>
											<a
												href={"https://www.apple.com/app-store/"}
												rel={"nofollow"}
											>
												<Image
													src={"/home/app-store.svg"}
													fallback={"/public/home/app-store.svg"}
													alt={"App Store"}
												/>
											</a>
											<a
												href={"https://play.google.com/store/games?hl=ru"}
												target={"_blank"}
												rel={"nofollow"}
											>
												<Image
													src={"/home/google-play.svg"}
													fallback={"/public/home/google-play.svg"}
													alt={"Google Play"}
												/>
											</a>
										</Flex>
									</Flex>
									<QRCode
										bordered={false}
										style={{
											padding: 12
										}}
										value={"https://play.google.com/store/games?hl=ru"}
									/>
								</Flex>
							</Flex>
						</Flex>
						<Divider />
						<Flex justify={"space-around"}>
							<Image
								preview={false}
								src={"/home/mastercard.png"}
								fallback={"/public/home/mastercard.png"}
								alt={"Master card"}
							/>
							<Image
								preview={false}
								src={"/home/visa.png"}
								fallback={"/public/home/visa.png"}
								alt={"Visa"}
							/>
							<Image
								preview={false}
								src={"/home/uzcard.png"}
								fallback={"/public/home/uzcard.png"}
								alt={"UzCard"}
							/>
							<Image
								preview={false}
								src={"/home/humo.png"}
								fallback={"/public/home/humo.png"}
								alt={"Humo"}
							/>
						</Flex>
						<Divider />
						<Flex vertical={true}>
							<Text type={"secondary"} style={{ textAlign: "center" }}>
								Booking.uz — часть Booking Uzbekistan Inc., мирового лидера в
								сфере онлайн-туризма и сопутствующих услуг.
							</Text>
							<Text type={"secondary"} style={{ textAlign: "center" }}>
								Copyright © 1996–
								{new Date().getFullYear()} Booking.uz™. Все права защищены
							</Text>
						</Flex>
					</Flex>
				</Container>
			</Layout.Footer>
		</>
	)
}

export { Footer }
