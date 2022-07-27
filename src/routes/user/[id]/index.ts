import { getUser } from "$lib/content/user/UserContent"

/** @type {import('./[id]').RequestHandler} */
export async function GET({ params }) {
	let error: string | null = null

	let user = await getUser({
		id: params.id
	})

	if (typeof user === "string") {
		error = user
		user = null
	}

	return {
		body: { user, error }
	}
}
