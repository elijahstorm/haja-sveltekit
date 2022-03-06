import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		paths: {
			base: '/_'
		},
		adapter: adapter({
			hostineSite: 'data',
			fallback: 'index.html'
		})
	}
};

export default config;
