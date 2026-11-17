# Development and verification

[Documentation index](README.md) · [Repository overview](../.github/README.md) · [Repository instructions](../AGENTS.md)

## Status

The checkout contains the [package scripts](../package.json), the Angular application, and the
[CI workflow](../.github/workflows/ci.yml). Run Git, pnpm, build and test commands with this
repository as the working directory.

## Before making a change

- `docs/maquette/source/Vitrine.dc.html` and `Legal.dc.html` (or the live mockup).
- The [repositories document](https://claude.ai/artifact/BPinmYxoF3mbK8w9BMB43N), section "cadenway-website".
- [package.json](../package.json) for versions and scripts.

## Local setup

Requirements: Node.js LTS and pnpm (versions in `package.json`), and Docker.

1. Clone this repository next to the other Cadenway repositories, flat, in one folder.
2. To run it with the rest of Cadenway, start the stack from `cadenway-ops`; it builds the sibling
   folders. The planned `core` profile provides the core backend. Start this frontend
   separately as shown below:

   ```bash
   cd ../cadenway-ops/compose
   docker compose -f compose.yaml -f compose.local.yaml --profile core up -d
   ```

3. To work on this repository alone:

   ```bash
   pnpm install
   pnpm start                  # http://localhost:4300
   ```

## Minimum checks by change

Start with the [checks by change](../AGENTS.md#commands-and-quality-gates).

## Full local quality gate

Use [`/cw-quality`](../.claude/commands/cw-quality.md) in Claude Code or
[`$cw-quality`](../.codex/skills/cw-quality/SKILL.md) in Codex.

- With a spec glob, run only `pnpm test --include "<spec-glob>"`, passing the glob as one argument.
  When no tests execute, report `0 tests executed` and mark the behavior as unverified.
- Without a glob, run `pnpm quality` from this checkout. Its steps are declared in
  [package.json](../package.json) and stop at the first failure.
  The gate includes the architecture check, Angular unit tests and the prerendering build.

Report the commands and their results, including checks that did not run or are unavailable.

Run the browser checks separately once the stack is available. Pass the actual spec path to
`pnpm e2e --` for a targeted run.

## Collaboration and release

- Trunk-based: work branches come from `main`, named `<type>/<lowercase-kebab-description>` with a
  type among `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`,
  `revert`; put the Cadenway task id first when there is one (`feat/cad-482-sso-screen`). Never an
  agent name as a prefix. Validate with `git check-ref-format --branch <name>`.
- Commits and PR titles follow Conventional Commits: `type(scope): subject`, English, imperative,
  lowercase subject, no trailing period, at most 100 characters; `!` only for a breaking change.
- Pull requests target `main` and are squash-merged after review and green CI. release-please opens the release pull request; its merge tags, publishes the image and lets the deploy workflow write the version into cadenway-ops.
- Stage only the files of your task; preserve other people's changes in the working tree.

Keep credentials, private keys, decrypted environment files and Terraform state out of documentation and logs. Follow the hard limits in [AGENTS.md](../AGENTS.md); setup instructions do not authorize deployments or changes to real infrastructure.
