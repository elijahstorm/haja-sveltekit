import { getDocument } from "$lib/firebase/firebase"
import type { Timestamp } from "firebase/firestore"
import type { ContentConfig } from "../Content"

export type TodoStatus = "todo" | "done" | "[broken]"
export type TodoColor = "" | "var(--primary)" | `#${any}`

export interface TodoContentConfig extends ContentConfig {
	color?: TodoColor
	date?: Date
	status?: TodoStatus
	type?: string
	contentType: "todo"
}

interface IncomingDocument extends ContentConfig {
	color: TodoColor
	status: TodoStatus
	type: string
	date: Timestamp
}

export const getTodo: (input: {
	id: string
	source: string
	isTeam?: boolean
}) => Promise<TodoContentConfig | string> = async ({ id, source, isTeam = false }) => {
	let doc,
		error: string | null = null

	try {
		doc = await getDocument({ source, isTeam, id, type: "todo" })
	} catch (e) {
		error = e
		return e
	}

	if (doc.exists()) {
		const data = doc.data() as IncomingDocument

		return {
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
		}
	}

	return "This todo does not exist!"
}
