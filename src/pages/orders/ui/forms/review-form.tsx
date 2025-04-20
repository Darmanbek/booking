import { Collapse, Flex, Form, type FormProps, Input, Modal, Rate } from "antd"
import { type FC } from "react"
import { type Booking } from "src/services/booking"
import { useGetCategoriesQuery } from "src/services/categories"
import {
	type HotelReviewChange,
	useCreateHotelsBySlugReviewsMutation
} from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { useModalStore } from "src/shared/store"

const ReviewForm: FC = () => {
	const [form] = Form.useForm<HotelReviewChange>()
	const { open, resetParams } = useModalStore()
	const params = useModalStore((state) => state.getParams<Booking>())
	const { t } = useTranslation()

	const { data: categories } = useGetCategoriesQuery()
	const { mutate: addReview, isPending } = useCreateHotelsBySlugReviewsMutation(
		params?.hotel_info?.slug
	)

	const onFinish: FormProps<HotelReviewChange>["onFinish"] = (values) => {
		if (params) {
			addReview(values, {
				onSuccess: () => {
					resetParams()
					form.resetFields()
				}
			})
		}
	}

	return (
		<Modal
			open={open}
			onCancel={() => {
				resetParams()
				form.resetFields()
			}}
			okButtonProps={{
				loading: isPending
			}}
			onOk={form.submit}
			okText={"Отправить"}
			centered={true}
			title={"Оставить отзыв"}
		>
			<Form
				onFinish={onFinish}
				form={form}
				layout={"vertical"}
				name={"review-form"}
			>
				<Form.Item<HotelReviewChange>
					label={"Рейтинг"}
					name={"rating"}
					initialValue={0}
				>
					<Rate count={10} />
				</Form.Item>
				<Collapse
					ghost={true}
					expandIconPosition={"end"}
					items={[
						{
							key: "item",
							styles: {
								header: {
									paddingInline: 0
								}
							},
							label: "Дополнительная оценка",
							children: (
								<Flex wrap={true} gap={8}>
									{categories?.data?.map((el, index) => (
										<Form.Item key={index} noStyle={true}>
											<Form.Item
												hidden={true}
												name={["category_ratings", index, "review_category_id"]}
												initialValue={el?.id}
											>
												<Input hidden={true} />
											</Form.Item>
											<Form.Item
												label={t(el?.name)}
												name={["category_ratings", index, "rating"]}
												style={{ margin: 0 }}
												initialValue={0}
											>
												<Rate count={10} />
											</Form.Item>
										</Form.Item>
									))}
								</Flex>
							)
						}
					]}
				/>
				<Form.Item<HotelReviewChange>
					label={"Комментарии"}
					name={"comment"}
					rules={[{ required: true }]}
				>
					<Input.TextArea rows={4} />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export { ReviewForm }
