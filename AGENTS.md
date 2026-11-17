# cadenway-website: agent instructions

Apply these instructions in every assistant. Explicit user instructions take precedence over
procedures, within the hard limits below. Follow the rules for the affected paths and load only
the skills relevant to the task.

## First read

- Before UI changes, consult the relevant `docs/maquette/source/` artboard (`Vitrine.dc.html`,
  `VitrineMobile.dc.html` or `Legal.dc.html`) or the live mockup and its integration guide section.
- For home page changes, use `cw-website-sections` for section order and calculator limits. Stop
  scroll reveals and the demo under `prefers-reduced-motion` as required by the sections rule.
  Confirm free-plan limits, plan prices and yearly discount before shipping pricing. See the
  [pricing notes](docs/integration.md#public-site-boundaries).
- For ownership decisions, consult the website section of the repositories document.
- Get versions and scripts from `package.json`. Keep version declarations there.

## What this repository is

The public site prerenders every Vitrine and Legal route. See the
[deployment and target structure](docs/architecture.md#purpose-and-target-structure)
and check the checkout for available files and commands.

Open inconsistency to settle before shipping pricing: the free plan reads "10 membres, 5 Go"
here and "5 membres, 2 Go" in the app.

## Language

- Everything written in the repository is **English**: code, comments, docs, agent prompts, rules,
  skills, commit messages, branch names, PR titles and descriptions.
- User-facing copy is **French**, word for word from the mockup; keep it out of logic so a later
  `@angular/localize` extraction is mechanical.
- Follow the user's language in the conversation only. No emojis.
- Never invent facts about the product, the contracts, the mockup or the tooling: cite the file or
  the document. When something does not exist yet, say so and say which step of the start-up plan
  brings it.

## Architectural ownership

- `src/app/features/home/`: the public home page, its sections and newsletter form.
- `src/app/features/legal/`: privacy, terms, help and the contact form.
- `src/app/core/`: application-wide infrastructure. `layouts/` composes shells and `shared/`
  contains generic non-visual primitives. Create folders when they have an implementation.
- Features own their routes, presentation, data access and documented public entries. `core` never
  imports a feature or layout; cross-feature imports use the owner's documented public entries.
- Use `@app`, `@core`, `@features`, `@layouts`, `@shared` and `@env` across boundaries. Place specs
  and their local fixtures beside the subject, without `testing/` directories.

## Boundaries (hard rules)

- No session, no private API route. Only the public newsletter and contact form routes are called.
- Nothing here links to private data; "Se connecter" and "Démarrer" go to the webapp.
- No local design system; no second component library.
- `docs/maquette/` is a read-only reference.

## GitHub files (`.github/`)

Use the `github.md` rule for this checkout's [GitHub homepage](.github/README.md), community
files, templates, owners and workflows. Cadenway has no organization `.github` repository.
Keep complete CI, release and deploy workflows here, without reusable workflows from siblings.
Keep Renovate local without a shared preset. Apply common changes through a PR in each affected
repository.

## Code quality

- Read the affected entry point, its callers, and its relevant tests before editing.
  Preserve the behavior callers rely on unless the task changes it.
- Keep the diff focused. Use names that express intent and reuse existing code when
  it preserves the required behavior. Extract code when it clarifies a responsibility.
- Keep business decisions with their owning module. Validate external inputs at the
  boundary and use documented public interfaces across modules and repositories.
- For writes that can fail, overlap, or be retried, verify the resulting state.
  Check transaction boundaries, tenant scope, and repeated delivery where relevant.
- For collections and repeated work, check what grows with input size. Measure or
  inspect the bottleneck before adding an index, cache, worker, or replica.
- Run the repository checks that cover the affected behavior. Report the commands
  and their results, including checks that did not run and tests that selected zero cases.

## Commands and quality gates

Use the scripts declared in [package.json](package.json). Start with the narrowest check that
covers the change, then widen where needed.

| Changed                         | Minimum check                                     |
| ------------------------------- | ------------------------------------------------- |
| Pages, sections                 | `pnpm test --include "<spec-glob>"`, `pnpm build` |
| SEO or metadata                 | `pnpm build` and `cw-site-seo-reviewer`           |
| Forms                           | `pnpm test --include "<spec-glob>"`               |
| Docs or agent instructions only | Scoped formatting and link review                 |

See the [full local quality gate](docs/development.md#full-local-quality-gate) for the shared
Codex and Claude Code procedure.

## Git and branch flow

Use the `git-and-commits.md` rule for work off `main`, branch names and Conventional
Commits. Validate a branch name with `git check-ref-format --branch <name>`. Target `main` with
reviewed PRs and squash-merge after green CI. release-please opens the release PR. CI publishes
the image and the deploy workflow writes its version into cadenway-ops. Stage only task files
and preserve existing changes.

## Hard limits (never without the user's explicit request in this conversation)

- Never push to `main`, merge into it locally, create or push Git tags, or bump a version by hand.
- Never run a registry publish (`npm publish`, `pnpm publish`): this repository ships as a Docker image built by CI.
- Never force-push, and never amend or rebase commits that are already pushed.
- Never bypass the Git hooks (`--no-verify`, `core.hooksPath` overrides, `ALLOW_MAIN_PUSH=1`,
  `CW_SKIP_PUSH_CHECKS=1`).
- Never write a token, password or private key anywhere; `.npmrc` keeps `${NODE_AUTH_TOKEN}`. Do
  not read or write secret environment files; new variables are documented in `.env.example`.
- Never edit generated trees (`dist/`, `node_modules/`, `coverage/`) or lockfiles by hand.
- Never modify a sibling checkout (`../cadenway-*`) from a task in this repository.

The agent hooks enforce most of these mechanically; a refused command is a signal to stop and ask,
not to find another way around it.

## Agent tooling

Use the [Codex](.codex/README.md) and [Claude Code](.claude/README.md) guides for rules,
skills, hooks and the [specialist inventory](.claude/README.md#agents). Builders have
assigned write scopes and reviewers are read-only. Specialists are optional. When delegating,
assign disjoint files and explicit checks, then integrate the results yourself.

## Repository hygiene

- Reuse existing commands, tools and test infrastructure before adding files.
- Prefer inline commands or a task-specific temporary directory for one-off diagnostics; clean up
  disposable files before delivery.
- Keep a permanent script only when it provides a reusable capability that existing tooling cannot.
- Add permanent tests for meaningful behavior or regressions, in the existing test structure.
- Before delivery, inspect untracked files and remove only the disposable artifacts of the current
  task. Report every new permanent tooling file and why it needs to stay.
- Report material failures, skipped checks and limitations, including non-blocking ones. Ask for
  user input only when a missing decision or authorization blocks the dependent work.

## References

- [Interactive mockup](https://claude.ai/artifact/KYRM7AnsYLiBLBLKy8i4HE), [integration guide](https://claude.ai/artifact/CpJHVCiFfF9j3KbHQ2S1Et) and
  [repositories and packages](https://claude.ai/artifact/BPinmYxoF3mbK8w9BMB43N) (living documents).
