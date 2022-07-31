import { storeQuery } from "$lib/firebase/firestore"
import type { DocumentData, QuerySnapshot } from "firebase/firestore"
import type { TodoContentConfig } from "./TodoContent"

export const getTodoList: (input: {
	source: string
	dateRange?: { start: Date; end: Date }
	isTeam?: boolean
	amount?: number
}) => Promise<TodoContentConfig[] | string> = async ({
	source,
	dateRange = { start: new Date(0), end: new Date() },
	isTeam = false,
	amount = 50
}) => {
	let list: QuerySnapshot<DocumentData>,
		response: TodoContentConfig[] = []
	let error: string | null = null

	try {
		list = await storeQuery({
			type: "todo",
			source,
			amount,
			isTeam,
			queries: [
				{
					type: "date",
					compare: ">=",
					value: dateRange.start
				},
				{
					type: "date",
					compare: "<",
					value: dateRange.end
				}
			]
		})
	} catch (e) {
		error = e
		return e
	}

	list.forEach((doc) => {
		const data = doc.data()

		response.push({
			contentType: "todo",
			id: data.id ?? doc.id,
			title: data.title?.trim(),
			caption: data.caption?.trim(),
			color:
				data.color == ""
					? "var(--primary)"
					: `#${data.color.substring(2) + data.color.substring(0, 2)}`,
			date: data.date.toDate(),
			status: data.status,
			type: data.type
		})
	})

	return response
}
