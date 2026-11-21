import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import { documentTitle, metaFor, routes, staticPaths } from "./routes";

export { staticPaths };
export { EVENT } from "./content/event";
export { ORG } from "./content/site";

/** Renders one URL to HTML at build time (see scripts/prerender.mjs). */
export async function render(path: string) {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(`http://localhost${path}`));
  if (context instanceof Response) throw new Error(`unexpected redirect for ${path}`);
  const router = createStaticRouter(handler.dataRoutes, context);
  const html = renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  );
  const meta = metaFor(context.matches.map((m) => ({ params: m.params, handle: m.route.handle })));
  return { html, title: documentTitle(meta), shortTitle: meta.title, description: meta.description };
}
