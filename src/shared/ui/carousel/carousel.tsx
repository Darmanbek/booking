import { Carousel as AntdCarousel, type CarouselProps } from "antd"
import type { CarouselRef } from "antd/es/carousel"
import { forwardRef } from "react"
import { CarouselNextButton, CarouselPrevButton } from "./"

const Carousel = forwardRef<CarouselRef, CarouselProps>((props, ref) => {
	return (
		<AntdCarousel
			ref={ref}
			draggable={true}
			arrows={true}
			prevArrow={<CarouselPrevButton />}
			nextArrow={<CarouselNextButton />}
			{...props}
		/>
	)
})
Carousel.displayName = "Carousel"

export { Carousel }
