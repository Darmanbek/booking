import { LeftOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"
import { type FC } from "react"

interface CarouselPrevButtonProps extends ButtonProps {
	currentSlide?: number
	slideCount?: number
}

const CarouselPrevButton: FC<CarouselPrevButtonProps> = ({
	currentSlide,
	slideCount,
	...rest
}) => {
	return (
		<>
			<Button
				title={`${currentSlide} / ${slideCount}`}
				shape={"circle"}
				icon={<LeftOutlined />}
				{...rest}
			/>
		</>
	)
}

export { CarouselPrevButton }
