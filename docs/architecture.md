# Architecture and ownership

[Documentation index](README.md) · [Repository instructions](../AGENTS.md)

## Status

At the time this documentation was written, this checkout has no `package.json`, application source tree, or GitHub workflow files. The target architecture, scripts, and workflows in this guide must be created and verified during bootstrap.

The following architecture is the target recorded in [AGENTS.md](../AGENTS.md). Paths and integrations are design boundaries, not evidence that files or services already exist.

## Purpose and target structure

cadenway-website is the public site: the Vitrine artboard (marketing, pricing, FAQ) and the Legal pages (privacy, terms, help with a contact form). Angular 22 with static prerendering of every route, served as a Docker image of static files behind Traefik on `www.<domain>`. Created after the first version of the app.

Open inconsistency to settle before shipping pricing: the free plan reads "10 membres, 5 Go" here and "5 membres, 2 Go" in the app.

## Architectural ownership

- `src/app/pages/`: one folder per route (home, privacy, terms, help).
- `src/app/sections/`: the home sections.
- `src/app/forms/`: newsletter and contact.

## Boundaries

- No session, no private API route.
- Nothing here links to private data; "Se connecter" and "Démarrer" go to the webapp.
- No local design system; no second component library.
- `docs/maquette/` is a read-only reference.

## Cross-repository changes

Each checkout owns its implementation and release. Use published `@cadenway/*` packages instead of sibling source imports or local dependency links. For contract changes, make the contract and generated package available first, then update the producing service, gateways and listeners, and finally the webapp. Each step should remain deployable independently.
