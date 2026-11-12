# cadenway-website: Claude Code tooling

This `.claude/` folder ships the Claude Code tooling of cadenway-website: **10 agents**,
11 slash commands, 7 rules, 10 skills, 3 hooks, the project
settings and launch configuration. The application launch requires the planned package scripts.

Start from [AGENTS.md](../AGENTS.md) (the rules every assistant follows) and [CLAUDE.md](../CLAUDE.md)
(the Claude entry point).

## Settings (`settings.json`)

- **Hooks** are wired through `${CLAUDE_PROJECT_DIR}` so they resolve from any working directory:
  `guard.mjs` before every `Write` / `Edit` / `MultiEdit`, `guard-git.mjs` before every `Bash` /
  `PowerShell` command, and `format.mjs` after matching edit events for supported files.
  Apply the repository rules across tools.
- **Permissions** allow specific repository commands and read-only Git commands. The project
  denies `Read` on `.env` and `.env.*`. Follow the repository secret-handling rules across tools.
  The project does not pre-approve `git push`, `gh` writes or arbitrary shell commands.
- **Fast mode is off** (`fastMode: false` and `CLAUDE_CODE_DISABLE_FAST_MODE=1`). Agent models and
  efforts are explicit in each agent's frontmatter; do not silently substitute a model.
- **MCP**: `enabledMcpjsonServers` enables `angular`, `playwright`, `context7` from the root `.mcp.json`.
- **No plugins** are enabled (`enabledPlugins: {}`). The folder is itself a plugin
  (`.claude-plugin/plugin.json`, `hooks/hooks.json`) for installations outside this checkout.

## Working with the sibling repositories

Start from this checkout and attach the peers you need, for example:

```powershell
claude --add-dir ../cadenway-design-system ../cadenway-webapp ../cadenway-api-contracts
```

Their `.claude/agents/` are discovered too, so their `cw-*` roles become available. Peer checkouts
are **read-only** from a cadenway-website session (the guard refuses edits there): change them in their
own session and pull request.

## Agents

Builders write only assigned files, inherit permissions and preserve concurrent work. Reviewers are
read-only: their tools exclude `Edit` and `Write`, and they ask the parent for the output of any
check that writes files. No agent delegates further.

| Agent | Responsibility | Model | Effort | Mode |
| --- | --- | --- | --- | --- |
| `cw-site-page-builder` | Routes and pages, prerendered. | sonnet | high | Assigned writes |
| `cw-site-section-builder` | Home sections from the Vitrine artboard. | sonnet | high | Assigned writes |
| `cw-site-form-builder` | Newsletter and contact forms. | sonnet | high | Assigned writes |
| `cw-site-test-writer` | Unit and e2e tests. | sonnet | high | Assigned writes |
| `cw-site-seo-reviewer` | Metadata, prerendering, structure. | sonnet | high | Read-only |
| `cw-site-a11y-auditor` | Accessibility of the public site. | sonnet | high | Read-only |
| `cw-site-design-reviewer` | Fidelity to the Vitrine artboard. | sonnet | high | Read-only |
| `cw-site-performance-reviewer` | Weight and loading of the public pages. | sonnet | high | Read-only |
| `cw-site-copy-reviewer` | French copy against the mockup. | sonnet | medium | Read-only |
| `cw-site-github-maintainer` | Workflows, templates and community files in .github/. | sonnet | medium | Assigned writes |

## Commands

| Command | What it does | Runs |
| --- | --- | --- |
| `/cw-page` | Add or change a page. | `cw-site-page-builder` |
| `/cw-section` | Build a home section. | `cw-site-section-builder` |
| `/cw-form` | Build the newsletter or contact form. | `cw-site-form-builder` |
| `/cw-test` | Write tests. | `cw-site-test-writer` |
| `/cw-seo-review` | Review SEO readiness. | `cw-site-seo-reviewer` |
| `/cw-a11y` | Audit accessibility. | `cw-site-a11y-auditor` |
| `/cw-design-review` | Compare with the mockup. | `cw-site-design-reviewer` |
| `/cw-perf-review` | Review page weight. | `cw-site-performance-reviewer` |
| `/cw-copy-review` | Check French copy. | `cw-site-copy-reviewer` |
| `/cw-github` | Change workflows, templates or community files in .github/. | `cw-site-github-maintainer` |
| `/cw-quality` | Run the local quality gate, stopping at the first failure. | runs the commands itself |

## Rules

| File | Subject | Loads for |
| --- | --- | --- |
| `pages.md` | Pages | `src/app/pages/**`, `src/app/app.routes.ts` |
| `sections.md` | Home sections | `src/app/sections/**` |
| `components.md` | Angular components | `src/app/**/*.ts`, `src/app/**/*.html` |
| `language.md` | Language | always |
| `git-and-commits.md` | Git and commits | always |
| `comments.md` | Comments and docblocks | `src/**/*.ts`, `src/**/*.html` |
| `github.md` | GitHub files | `.github/**` |

## Skills

See [skills/](skills/) for the complete inventory, including the technology guides.

| Skill | Use |
| --- | --- |
| `cw-context` | What Cadenway is, where the mockup, the integration guide and the repository map live, the product vocabulary (spaces, lists, sprints, tasks, statuses, milestones) and the multi-repository ownership rules. |
| `cw-website-sections` | The sections of the Vitrine artboard in order, with their behaviors and the pricing rules. |
| `cw-seo-basics` | The metadata and structure every prerendered page of the website needs. |

## Hooks

| Hook | When | What it refuses or does |
| --- | --- | --- |
| `guard.mjs` | before `Write`, `Edit` or `MultiEdit` | Sibling checkouts, generated trees, lockfiles, `.git/`, secrets and tokens, edits of the mockup copy and reactive forms, unpinned third-party actions and `pull_request_target` in workflows. |
| `guard-git.mjs` | before `Bash` or `PowerShell` | Pushes to `main`, tag pushes, force-pushes, rewrites of pushed commits, hook bypasses, destructive resets, registry publishing, branch names outside `<type>/<kebab>`. Adapted from the dentalstock guard. |
| `format.mjs` | after a successful `Write`, `Edit` or `MultiEdit` | Formats supported files with the repository's Prettier; a no-op until the formatter is installed. |
