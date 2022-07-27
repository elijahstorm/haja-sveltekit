import { getDocument } from "$lib/firebase/firebase"
import type { ContentConfig } from "../Content"

export interface UserContentConfig extends ContentConfig {
	picture?: string
	email?: string
	pronouns?: string[]
	private?: boolean
	verified?: boolean
	following?: string[]
	contentType: "user"
}

export const getUser: (input: { id: string }) => Promise<UserContentConfig | string> = async ({
	id
}) => {
	let doc,
		error: string | null = null

	try {
		doc = await getDocument({ isTeam: false, id })
	} catch (e) {
		error = e
		return e
	}

	if (doc.exists()) {
		const data = doc.data() as UserContentConfig

		return {
			contentType: "user",
			id: data.id ?? doc.id,
			title: data.title?.trim(),
			caption: data.caption?.trim(),
			picture: `${import.meta.env.VITE_STORAGE_URL_PREFIX}${data.picture}`,
			email: data.email,
			pronouns: data.pronouns,
			private: data.private,
			verified: data.verified,
			following: data.following
		}
	}

	return "This user does not exist!"
}
