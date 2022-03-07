import { getDocument } from '$lib/firebase';

export type TodoContentConfig = {
	id: string;
	title: string;
	caption: string;
	color: string;
	date: Date;
	status: string;
	type: string;
};

export const getTodo = async ({ source, isTeam = false, id }): Promise<TodoContentConfig> => {
	const doc = await getDocument({ source: source, isTeam: isTeam, id: id, type: 'todo' });

	if (doc.exists()) {
		const data = doc.data();
		return {
			id: data.id,
			title: data.title,
			caption: data.caption,
			color: data.color,
			date: data.date.toDate(),
			status: data.status,
			type: data.type
		};
	}

	return null;
};

declare module '../Content' {
	interface ContentHolder {
		TodoContent: TodoContentConfig;
	}
}
