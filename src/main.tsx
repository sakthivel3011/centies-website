import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { createBrowserRouter, matchRoutes, RouterProvider, type RouteObject } from "react-router";
import "@fontsource-variable/inter";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "./index.css";
import { routes } from "./routes";

// Scroll animations and smooth scrolling start once the page is ready (Layout in routes.tsx, src/lib/aos.ts and smooth.ts).

// Load the code for the current page before hydrating, so the pre-rendered HTML is reused without a flash.
for (const m of matchRoutes(routes, window.location) ?? []) {
  const route = m.route as RouteObject & { lazy?: () => Promise<Partial<RouteObject>> };
  if (typeof route.lazy === "function") {
    Object.assign(route, await route.lazy());
    delete route.lazy;
  }
}

const router = createBrowserRouter(routes);
const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// Pages are pre-rendered at build time; hydrate them. The dev server serves an empty shell instead.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
