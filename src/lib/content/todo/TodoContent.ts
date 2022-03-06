import { getDocument } from '$lib/firebase';

export type TodoContentConfig = {
	id: string;
	title: string;
	caption: string;
};

export const getTodo = async ({ source, isTeam = false, id }): Promise<TodoContentConfig> => {
	const doc = await getDocument({ source: source, isTeam: isTeam, id: id, type: 'todo' });

	if (doc.exists()) {
		const data = doc.data();
		return {
			id: data.id,
			title: data.title,
			caption: data.caption
		};
	}

	return {
		id: 'bad1',
		title: 'bad2',
		caption: 'bad'
	};
};

declare module '../Content' {
	interface ContentHolder {
		TodoContent: TodoContentConfig;
	}
}
