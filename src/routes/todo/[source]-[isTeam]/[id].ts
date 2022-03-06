import { type TodoContentConfig, getTodo } from '$lib/content/todo/TodoContent';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
	const todo: TodoContentConfig = await getTodo({
		source: params.source,
		isTeam: params.isTeam === '1',
		id: params.id
	});

	if (todo) {
		return {
			body: { todo }
		};
	}

	return {
		status: 404
	};
}
