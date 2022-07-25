import { getTodo } from "$lib/content/todo/TodoContent"

/** @type {import('./[id]').RequestHandler} */
export async function GET({ params }) {
	let error: string | null = null

	let todo = await getTodo({
		source: params.source,
		isTeam: params.isTeam === "1",
		id: params.id
	})

	if (typeof todo === "string") {
		error = todo
		todo = null
	}

	return {
		body: { todo, error }
	}
}
