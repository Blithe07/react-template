import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_APP_PUBLIC_PATH } = loadEnv(mode, process.cwd());
  return {
    base: VITE_APP_PUBLIC_PATH,
    plugins: [
      react(),
      AutoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.md$/, // .md
        ],

        // global imports to register
        imports: [
          // presets
          'react',
          // custom
          // {
          //   '@vueuse/core': [
          //     // named imports
          //     'useMouse', // import { useMouse } from '@vueuse/core',
          //     // alias
          //     ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          //   ],
          //   'axios': [
          //     // default imports
          //     ['default', 'axios'], // import { default as axios } from 'axios',
          //   ],
          //   '[package-name]': [
          //     '[import-names]',
          //     // alias
          //     ['[from]', '[alias]'],
          //   ],
          // },
          // example type import
          // {
          //   from: 'vue-router',
          //   imports: ['RouteLocationRaw'],
          //   type: true,
          // },
        ],
        // Auto import for module exports under directories
        // by default it only scan one level of modules under the directory
        dirs: [
          // './hooks',
          // './composables' // only root modules
          // './composables/**', // all nested modules
          // ...
        ],
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, './src'),
      }
    },
    server: {
      // host: "192.168.65.153",
      port: 5173,
      proxy: {
        "/ycmp-auth-center": "http://192.168.74.150:10018",
        "/yhinn-baseparam": "http://192.168.74.150:10018",
        "/ycmp-message-center": "http://192.168.74.150:10018",
        "/yhinn-etfpm": {
          target: "http://192.168.74.150:7006",
          rewrite: (path) => path.replace(/^\/yhinn-etfpm/, ""),
        },
      },
    },
  }
})
