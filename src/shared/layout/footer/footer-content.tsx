import { Flex, Image, QRCode } from "antd"
import { type FC } from "react"
import { Text, Title } from "src/shared/ui"

const FooterContent: FC = () => {
	return (
		<Flex gap={20} justify={"space-between"} wrap={true}>
			<Flex vertical={true} gap={8}>
				<Title level={5}>Контакты:</Title>
				<Flex vertical={true} gap={12}>
					<Text
						type={"secondary"}
						style={{ maxWidth: 480, textWrap: "balance" }}
					>
						Если у вас возник вопрос по бронированию, пожалуйста, свяжитесь с
						нами по телефону или с помощью формы обратной связи. Служба
						поддержки работает онлайн в режиме 24/7 без выходных и праздников.
					</Text>
					<a href={"mailto:info@booking.uz"} rel={"nofollow"}>
						info@booking.uz
					</a>
					<a
						href={"https://maps.google.com/?q=Узбекистан, Ташкент, Чорсу 95"}
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
				<Flex gap={8} wrap={true} justify={"center"}>
					<Flex vertical={true} gap={12}>
						<Text
							type={"secondary"}
							style={{ maxWidth: 300, textWrap: "balance" }}
						>
							В приложении цены на отели ещё ниже, а выбор шире! Бронирования
							можно оплачивать через Apple Pay и Android Pay. Ваучер хранится в
							личном кабинете и доступен, даже если нет интернета.
						</Text>
						<Flex gap={12}>
							<a href={"https://www.apple.com/app-store/"} rel={"nofollow"}>
								<Image
									preview={false}
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
									preview={false}
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
	)
}

export { FooterContent }
