import { RightOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"
import { type FC } from "react"

interface CarouselNextButtonProps extends ButtonProps {
	currentSlide?: number
	slideCount?: number
}

const CarouselNextButton: FC<CarouselNextButtonProps> = ({
	currentSlide,
	slideCount,
	...rest
}) => {
	return (
		<>
			<Button
				title={`${currentSlide} / ${slideCount}`}
				shape={"circle"}
				icon={<RightOutlined />}
				{...rest}
			/>
		</>
	)
}

export { CarouselNextButton }
