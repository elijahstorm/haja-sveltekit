import { getDocument } from "$lib/firebase/firestore"
import type { ContentConfig } from "../Content"

export interface TeamContentConfig extends ContentConfig {
	picture?: string
	private?: boolean
	users?: string[]
	contentType: "team"
}

export const getTeam: (input: { id: string }) => Promise<TeamContentConfig | string> = async ({
	id
}) => {
	let doc,
		error: string | null = null

	try {
		doc = await getDocument({ isTeam: true, id })
	} catch (e) {
		error = e
		return e
	}

	if (doc.exists()) {
		const data = doc.data() as TeamContentConfig

		return {
			contentType: "team",
			id: data.id ?? doc.id,
			title: data.title?.trim(),
			caption: data.caption?.trim(),
			picture: `${import.meta.env.VITE_STORAGE_URL_PREFIX}${data.picture}`,
			private: data.private,
			users: data.users
		}
	}

	return "This team does not exist!"
}
