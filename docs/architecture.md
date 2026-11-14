# Architecture and ownership

[Documentation index](README.md) · [Repository instructions](../AGENTS.md)

## Status

The checkout contains the Angular bootstrap, static prerender configuration and smoke tests. The
feature ownership described below is the target; the pages and forms have not been implemented yet.

## Purpose and target structure

cadenway-website is the public site: the Vitrine artboard (marketing, pricing, FAQ) and the Legal pages (privacy, terms, help with a contact form). Angular 22 with static prerendering of every route, served as a Docker image of static files behind Traefik on the domain itself (`cadenway.com`), with `www.` redirecting there. Created after the first version of the app.

Open inconsistency to settle before shipping pricing: the free plan reads "10 membres, 5 Go" here and "5 membres, 2 Go" in the app.

## Architectural ownership

The application profile of the [Angular architecture checker](https://github.com/Cadenway/cadenway-tooling/tree/main/packages/angular-testing) checks authored source, file names and import boundaries using the application TypeScript config. Run `pnpm test:architecture` to run it on its own. Both `pnpm quality` and the CI quality gate run it.

- `src/app/features/home/`: home page, sections and newsletter form.
- `src/app/features/legal/`: privacy, terms, help and contact form.
- `src/app/core/`: application-wide infrastructure; `layouts/`: shell composition;
  `shared/`: generic non-visual primitives. Create folders only when needed.
- Features own their routes, UI, data access and public entries documented in `FEATURE.md`.
  A feature's `ui/` contains its pages, forms and compositions; `data-access/services/` calls
  the generated API client and `data-access/adapters/` maps its DTOs.
- `core` does not import features or layouts. Cross-feature dependencies use the owning feature's
  documented public entry; layouts consume public widgets and ports rather than concrete stores.
- Use the `@app`, `@core`, `@features`, `@layouts`, `@shared` and `@env` aliases across boundaries.
  Place unit tests and local test helpers beside their subject without a `testing/` directory;
  browser scenarios live in `tests/e2e/`.

## Boundaries

- No session, no private API route.
- Nothing here links to private data; "Se connecter" and "Démarrer" go to the webapp.
- No local design system; no second component library.
- `docs/maquette/` is a read-only reference.

## Cross-repository changes

Each checkout owns its implementation and release. Use published `@cadenway/*` packages instead of sibling source imports or local dependency links. For contract changes, make the contract and generated package available first, then update the producing service, gateways and listeners, and finally the webapp. Each step should remain deployable independently.
