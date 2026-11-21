import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
};

// Same policy as vercel.json — `npm run preview` checks the built site with it.
const CSP =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; " +
  "form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5174, strictPort: true, headers: SECURITY_HEADERS },
  preview: { port: 4174, headers: { ...SECURITY_HEADERS, "Content-Security-Policy": CSP } },
  // No data: URI inlining, so the CSP can stay strict (font-src 'self').
  build: { target: "es2022", sourcemap: false, assetsInlineLimit: 0 },
});
