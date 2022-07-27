import { getTodo } from "$lib/content/todo/TodoContent"

/** @type {import('./[id]').RequestHandler} */
export async function GET({ params }) {
	let error: string | null = null
	const { id, source } = params
	const isTeam = params.isTeam === "1"

	let todo = await getTodo({
		source,
		isTeam,
		id
	})

	if (typeof todo === "string") {
		error = todo
		todo = null
	}

	return {
		body: { todo, error, source, isTeam }
	}
}
