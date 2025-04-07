import { Flex } from "antd"
import { type FC } from "react"
import { Container } from "src/shared/ui"
import { HomeCityList, HomeHotelList } from "./lists"

const Home: FC = () => {
	return (
		<>
			<section>
				<Container>
					<Flex vertical={true} gap={20}>
						<HomeHotelList />
						<HomeCityList />
					</Flex>
				</Container>
			</section>
		</>
	)
}

export { Home }
