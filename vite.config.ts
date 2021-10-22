import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svg from "vite-plugin-react-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), svg({ defaultExport: "component" })]
})
