import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Avatar, Button, Card, Flex, Space } from "antd"
import { type CarouselRef } from "antd/es/carousel"
import { type FC, useRef } from "react"
import { Carousel, Paragraph, Title } from "src/shared/ui"
import { RatingContainer } from "src/widgets/rating-container"

const HotelRatingCard: FC = () => {
	const carouselRef = useRef<CarouselRef>(null)

	return (
		<RatingContainer text={"7.5"}>
			<Card
				title={
					<Flex vertical={true} align={"start"}>
						<Title level={3} style={{ fontSize: "inherit" }}>
							Очень хорошо
						</Title>
						<Link to={"."} hash={"reviews"} style={{ fontSize: 12 }}>
							27 отзывов
						</Link>
					</Flex>
				}
			>
				<Flex vertical={true} gap={8}>
					<Carousel
						autoplay={true}
						dots={false}
						ref={carouselRef}
						slidesToShow={1}
						arrows={false}
					>
						{Array.from({ length: 10 }).map((_, index) => (
							<div key={index}>
								<Flex
									vertical={true}
									gap={4}
									style={{ padding: 8, paddingInline: 12 }}
								>
									<Space>
										<Avatar icon={<UserOutlined />} />
										Alex {index + 1}
									</Space>
									<Paragraph>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Quisque vel est a massa gravida convallis. Sed vel enim vel
										neque consectetur convallis. Donec vel mi non neque semper
										commodo. Nullam et neque non erat tincidunt dignissim. Donec
										auctor metus non nulla consectetur, non malesuada neque
										ullamcorper. Nulla facilisi. Sed vel massa et nunc
										consectetur molestie. Sed consectetur, mi id elementum
										fermentum, nunc eros congue ex, vel volutpat lectus nunc at
										nunc. Aliquam erat volutpat. Nulla facilisi. Sed vel massa
										et nunc
									</Paragraph>
								</Flex>
							</div>
						))}
					</Carousel>
					<Flex justify={"space-between"}>
						<Space>
							<Button
								shape={"circle"}
								type={"primary"}
								onClick={() => carouselRef?.current?.prev()}
								icon={<LeftOutlined />}
							/>
							<Button
								shape={"circle"}
								type={"primary"}
								onClick={() => carouselRef?.current?.next()}
								icon={<RightOutlined />}
							/>
						</Space>
						<Button type={"primary"} icon={"(+27)"} iconPosition={"end"}>
							Посмотреть все отзывы
						</Button>
					</Flex>
				</Flex>
			</Card>
		</RatingContainer>
	)
}

export { HotelRatingCard }
