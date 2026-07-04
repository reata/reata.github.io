import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: process.env.SITE_URL || 'https://reata.github.io',
  server: { port: 3000 },
  outDir: 'dist',
  trailingSlash: 'always',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'solarized-light',
    },
  },
  redirects: {
    '/big-data/parser/sqllineage-a-sql-lineage-analysis-tool/': '/blog/sqllineage-a-sql-lineage-analysis-tool/',
    '/python/unicode/how-python-does-unicode/': '/blog/how-python-does-unicode/',
    '/kaggle/classification/kaggle-instacart-market-basket-analysis-retrospect/': '/blog/kaggle-instacart-market-basket-analysis-retrospect/',
    '/big-data/log/a-review-of-log/': '/blog/a-review-of-log/',
    '/web/realtime/to-build-a-real-time-system-starting-with-websocket/': '/blog/to-build-a-real-time-system-starting-with-websocket/',
  },
});
