import { InfoCircleOutlined } from "@ant-design/icons"
import { Card, Col, Descriptions, Flex, Row, Space } from "antd"
import { type FC } from "react"
import { Paragraph, Title } from "src/shared/ui"

const data = [
	{
		title: "Расположение",
		description:
			"Ищите возможность отдохнуть и посмотреть на город? Отель «Отель Космос Омск» находится в Омске. Этот отель располагается в пешей доступности от центра города. Рядом с отелем можно прогуляться. Неподалёку: Тобольские ворота, Омская крепость и Сквер им. Дзержинского."
	},
	{
		title: "В отеле",
		description:
			"Для гостей работает бар. Для гостей работает ресторан. Бесплатный Wi-Fi на территории поможет всегда оставаться на связи. Для путешественников на машине организована бесплатная парковка.\n" +
			"\n" +
			"Специально к услугам гостей, не упускающих возможность заняться спортом, фитнес-центр и тренажёрный зал. Здесь рады животным. Допускается размещение с питомцами за дополнительную плату. Доступная среда: работает лифт. Гостям доступны и другие услуги. Например, прачечная, банкомат и гладильные услуги.\n" +
			"\n" +
			"Сотрудники отеля поддержат беседу на английском и русском."
	},
	{
		title: "В номере",
		description:
			"В номере вас будут ждать телевизор, мини-бар и халат. Перечисленные услуги есть не во всех номерах.\n"
	}
]

const HotelDescriptionCard: FC = () => {
	return (
		<Card title={"Описание отеля"}>
			<Row gutter={20}>
				<Col span={18}>
					<Flex vertical={true} gap={20}>
						{data.map((item, index) => (
							<Flex vertical={true} key={index} gap={12}>
								<Title level={4} style={{ fontSize: 16 }}>
									<Space>
										<InfoCircleOutlined />
										{item.title}
									</Space>
								</Title>
								{item.description.split("\n").map((item, index) => (
									<Paragraph key={index}>{item}</Paragraph>
								))}
							</Flex>
						))}
					</Flex>
				</Col>
				<Col span={6}>
					<Flex vertical={true} gap={12}>
						<Descriptions
							column={1}
							layout={"vertical"}
							title={"Факты об отеле"}
							items={[
								{
									key: "type",
									label: "Тип розетки",
									children: (
										<Space direction={"vertical"}>
											<Space direction={"vertical"} size={2}>
												<span>{"Европейская"}</span>
												<span>{"220 В / 50 Гц"}</span>
											</Space>
											<Space direction={"vertical"} size={2}>
												<>{"Европейская(с заземлением)"}</>
												<>{"220 В / 50 Гц"}</>
											</Space>
										</Space>
									)
								},
								{
									key: "count",
									label: "Количество номеров",
									children: "190 номеров"
								}
							]}
						/>
					</Flex>
				</Col>
			</Row>
		</Card>
	)
}

export { HotelDescriptionCard }
