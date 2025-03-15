import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Card, Col, Descriptions, Row, Space } from "antd"
import { type FC } from "react"
import { Text } from "src/shared/ui"

const HotelServicesCard: FC = () => {
	return (
		<Card title={"Услуги и удобства"}>
			<Row gutter={20} style={{ rowGap: 20 }}>
				{Array.from({ length: 9 }).map((_, index) => (
					<Col key={index} span={8}>
						<Descriptions
							column={1}
							title={
								<Space style={{ fontSize: 14 }}>
									<ExclamationCircleOutlined />
									<>{`Услуга ${index}`}</>
								</Space>
							}
							items={Array.from({ length: 5 }).map(() => ({
								children: (
									<Space align={"center"}>
										<Text type={"secondary"}>•</Text>
										{"Название услуги"}
									</Space>
								)
							}))}
						/>
					</Col>
				))}
			</Row>
		</Card>
	)
}

export { HotelServicesCard }
