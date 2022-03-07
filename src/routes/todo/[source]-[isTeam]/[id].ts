import { type TodoContentConfig, getTodo } from '$lib/content/todo/TodoContent';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
	let todo: TodoContentConfig = await getTodo({
		source: params.source,
		isTeam: params.isTeam === '1',
		id: params.id
	});

	if (!todo) {
		todo = {
			title: 'Todo not found',
			id: new Date().toLocaleTimeString(),
			caption: '',
			color: '',
			date: new Date(),
			status: '[broken]',
			type: ''
		};
	}

	return {
		body: { todo }
	};
}
