import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { NgmiPolyfill } from 'vite-plugin-ngmi-polyfill'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import url from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  define: {
    ...(process.env.NODE_ENV === 'development' ? { global: 'window' } : {}),
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
      strictRequires: true,
      transformMixedEsModules: true,
    },
  },
  // optimizeDeps: {
  //   disabled: false,
  // },
  resolve: {
    alias: {
      "@": url.fileURLToPath(new URL("./src", import.meta.url)),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
})
