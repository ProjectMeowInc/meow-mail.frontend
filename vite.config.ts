import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import vitePluginSvgr from "vite-plugin-svgr"

export default defineConfig({
    base: "/",
    plugins: [react(), vitePluginSvgr()],
})
