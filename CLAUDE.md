# cadenway-website: Claude Code instructions

> **Source of truth.** This file is the entry point for Claude Code. The normative rules live in
> [AGENTS.md](AGENTS.md), imported below: read it, do not paraphrase it from memory.

@AGENTS.md

> **Read on demand, deliberately not `@`-imported**: the mockup artboards `Vitrine.dc.html`, `VitrineMobile.dc.html`, `Legal.dc.html`, the [integration guide](https://claude.ai/artifact/CpJHVCiFfF9j3KbHQ2S1Et). Importing them would
> cost context in every session. The path-scoped rules in `.claude/rules/` load automatically when
> you open a matching file and carry the few things that must never be got wrong there.

## TL;DR for every task

1. Every page is prerendered to static HTML; nothing depends on a session.
2. Sections follow `Vitrine.dc.html` in order: hero with the animated app demo, logos, 7 features, key figures, integrations, migration (Trello, Jira, CSV), comparison, pricing, testimonials, FAQ, final call.
3. The pricing calculator covers 1 to 5 000 members. Confirm the free-plan limits, plan prices and
   yearly discount before shipping pricing. See the [pricing notes](docs/integration.md#public-site-boundaries).
4. Visuals from `@cadenway/ui` and `@cadenway/tokens`; French copy word for word from the mockup.
5. Scroll reveals and the demo stop under `prefers-reduced-motion`.
6. Only public API routes are called (newsletter, contact form).

## Boundaries (hard rules)

- No session, no private API route.
- Nothing here links to private data; "Se connecter" and "Démarrer" go to the webapp.
- No local design system; no second component library.
- `docs/maquette/` is a read-only reference.

## Target quality gate

Use the [minimum checks by change](docs/development.md#minimum-checks-by-change) first.
Run `/cw-quality` without arguments for the full local gate when applicable. Report unavailable
checks during bootstrap.

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build                 # prerenders every route
```

## Tooling: this repository ships its own `.claude/`

Open `cadenway-website/` as the workspace root to activate it. The `cw-site-*` agents, the `/cw-*`
commands, the skills and the hooks are described in [.claude/README.md](.claude/README.md). Two things
the session listing does not tell you:

- **Rules** in `.claude/rules/` load at session start unless they declare `paths`. Scoped rules
  load when Claude reads a matching file.
- **Hooks** cover the edit and shell tool events matched in `.claude/settings.json`.
  `guard.mjs` refuses edits that break a hard rule
  (generated trees, lockfiles, secrets, sibling checkouts, edits of the mockup copy and reactive forms, unpinned third-party actions and `pull_request_target` in workflows), `guard-git.mjs`
  refuses pushes to `main`, tag pushes, force-pushes, rewrites of pushed commits, hook bypasses and
  registry publishing, and `format.mjs` formats supported files when its formatter is available.
  Apply the repository rules across tools. Resolve a refusal without bypassing the hook.

The sibling repositories (`../cadenway-design-system`, `../cadenway-webapp`, `../cadenway-api-contracts`, `../cadenway-ops`) are read-only references
from here; add them to the session (`--add-dir`) when a task needs to read them.
