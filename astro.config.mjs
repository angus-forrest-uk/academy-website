import { defineConfig } from 'astro/config';
import { rehypeShiki, unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkPublicImages from './src/plugins/remark-public-images.ts';
import rehypeTableScroll from './src/plugins/rehype-table-scroll.ts';
import rehypeImageCaption from './src/plugins/rehype-image-caption.ts';

export default defineConfig({
	site: 'https://USERNAME.github.io',
	output: 'static',
	trailingSlash: 'never',
	build : { format: 'file'},
	vite : {
		build: {cssMinify: 'esbuild'},
	},
	integrations: [sitemap()],
	markdown: {
		syntaxHighlight: false,
		processor: unified({
			remarkPlugins: [remarkMath, remarkPublicImages],
			rehypePlugins: [
				rehypeKatex,
				[rehypeShiki, { themes: { light: 'github-light', dark: 'github-dark'}}],
				rehypeTableScroll,
				rehypeImageCaption,
			],
		}),
	},
});
