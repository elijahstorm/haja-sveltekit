import { getTeam } from "$lib/content/team/TeamContent"

/** @type {import('./[id]').RequestHandler} */
export const GET = async ({ params }) => {
	let error: string | null = null

	let team = await getTeam({
		id: params.id
	})

	if (typeof team === "string") {
		error = team
		team = null
	}

	return {
		body: { team, error }
	}
}
