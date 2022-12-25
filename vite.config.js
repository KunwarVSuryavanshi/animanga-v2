import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6969,
    // proxy: {
    //   "/test": {
    //     target: "https://jsonplaceholder.typicode.com/users",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    //   "/foo": "https://api.consumet.org/",
    // },
  },
});
