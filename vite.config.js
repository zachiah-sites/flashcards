import { sveltekit } from '@sveltejs/kit/vite';
import Windicss from 'vite-plugin-windicss';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [Windicss(), sveltekit()]
};

export default config;
