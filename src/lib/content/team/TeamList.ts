import { awaitMyId, storeQuery } from "$lib/firebase/firebase"
import type { DocumentData, QuerySnapshot } from "firebase/firestore"
import type { TeamContentConfig } from "./TeamContent"

export const getTeamList: (input: {
	query?: string
	value?: string | Promise<string>
	amount?: number
}) => Promise<TeamContentConfig[] | string> = async ({
	query = "users",
	value = awaitMyId(),
	amount = 10
}) => {
	const isTeam = true
	let list: QuerySnapshot<DocumentData>,
		response: TeamContentConfig[] = []
	let error: string | null = null

	value = await value

	try {
		list = await storeQuery({
			isTeam,
			amount,
			queries: [
				{
					type: query,
					compare: "array-contains",
					value
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
			contentType: "team",
			id: data.id ?? doc.id,
			title: data.title?.trim(),
			caption: data.caption?.trim(),
			picture: `${import.meta.env.VITE_STORAGE_URL_PREFIX}${data.picture}`,
			private: data.private,
			users: data.users
		})
	})

	return response
}
