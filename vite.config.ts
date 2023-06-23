import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  workbox: {
    clientsClaim: true,
    skipWaiting: true,
    cleanupOutdatedCaches: false,
    sourcemap: true,
  },
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],

  manifest: {
    name: "CoRider",
    short_name: "CoRider",
    theme_color: "#008000",
    background_color: "#faf9f4",
    display: "standalone",
    scope: "/",
    start_url: "/",

    icons: [
      {
        src: "/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/logo384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/logo512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  devOptions: {
    enabled: true,
  },
};
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
});
