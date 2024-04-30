import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import basicSsl from '@vitejs/plugin-basic-ssl'


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    mode: "directory",
    platformProxy: {
      enabled: true
    }
  }),
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
});