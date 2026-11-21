/** Where the separate registration form site lives. Set VITE_FORM_URL in .env / Vercel (e.g. https://register.centies.in). */
export const FORM_URL = (import.meta.env.VITE_FORM_URL as string | undefined)?.replace(/\/$/, "") || "http://localhost:5173";
export const REGISTER_URL = `${FORM_URL}/register`;
export const DEMO_URL = `${FORM_URL}/register/demo`;

/** Public address of this website, used for canonical links and the sitemap. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://www.centies.in";
