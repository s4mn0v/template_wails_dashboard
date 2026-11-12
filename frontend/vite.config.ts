import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import wails from "@wailsio/runtime/plugins/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: Number(process.env.WAILS_VITE_PORT) || 9245,
    strictPort: true,
  },
  plugins: [
    vue(),
    // Icons compile to inline SVG Vue components at build time — zero
    // runtime cost, fully offline, and only the icons actually imported end
    // up in the bundle. Pulls from any installed @iconify-json/* package;
    // `autoInstall: false` keeps the icon-set list explicit in package.json
    // instead of silently installing new ones on first use.
    Icons({ compiler: "vue3", autoInstall: false }),
    wails("./bindings"),
  ],
});
