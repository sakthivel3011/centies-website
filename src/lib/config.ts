/**
 * Where the separate registration form site lives: https://register.centies.in. VITE_FORM_URL in .env overrides it
 * (http://localhost:5173 while testing both sites on this PC); a production build never uses a localhost address.
 */
const envFormUrl = (import.meta.env.VITE_FORM_URL as string | undefined)?.replace(/\/$/, "");
export const FORM_URL = envFormUrl && !(import.meta.env.PROD && /\/\/(localhost|127\.0\.0\.1)/.test(envFormUrl)) ? envFormUrl : import.meta.env.PROD ? "https://register.centies.in" : "http://localhost:5173";
export const REGISTER_URL = `${FORM_URL}/onboarding`;
export const DEMO_URL = `${FORM_URL}/onboarding/demo`;

/** Public address of this website, used for canonical links and the sitemap. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://www.centies.in";
