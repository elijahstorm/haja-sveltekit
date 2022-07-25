/** @type {import('./[id]').RequestHandler} */
export async function GET({ params }) {
	let error: string | null = null

	const { requestLink } = params
	let validation: string = ""

	return {
		body: { validation, error, requestLink }
	}
}
