import { Flex, Image } from "antd"
import { type FC } from "react"

const FooterPayments: FC = () => {
	return (
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
	)
}

export { FooterPayments }
