import { ButtonLink } from "../components/ui";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <img src="/images/decor/pattern.webp" alt="" width={736} height={368} className="mx-auto mb-10 aspect-[2/1] w-full max-w-sm rounded-xl object-cover" />
      <p className="text-[13px] font-semibold text-royal-600">Error 404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Page not found</h1>
      <p className="mt-3 text-muted">The page you are looking for has moved or does not exist.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2">
        <ButtonLink to="/">Go home</ButtonLink>
        <ButtonLink to="/downloads" variant="secondary">
          Downloads
        </ButtonLink>
      </div>
    </div>
  );
}
