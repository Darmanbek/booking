import { Card, Descriptions } from "antd"
import dayjs from "dayjs"
import { type FC } from "react"
import { useSearchStore } from "src/shared/store/use-search-store"

const ReverseInfoCard: FC = () => {
	const { search } = useSearchStore()
	return (
		<Card title={"Данные бронирования"}>
			<Descriptions
				layout={"vertical"}
				column={1}
				items={[
					{
						label: "Дата заезда",
						children: dayjs(search.dates[0]).format("dddd, D MMMM YYYY")
					},
					{
						label: "Дата отъезда",
						children: dayjs(search.dates[1]).format("dddd, D MMMM YYYY")
					},
					{
						label: "Число гостей",
						children: search.guests.reduce((total, guest) => total + guest, 0)
					},
					{ label: "Кол-во номеров", children: search.guests.length }
				]}
			/>
		</Card>
	)
}

export { ReverseInfoCard }
