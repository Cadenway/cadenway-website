---
description: "Run the local quality gate, stopping at the first failure."
allowed-tools: Bash(pnpm format:check), Bash(pnpm test:lint), Bash(pnpm lint), Bash(pnpm typecheck), Bash(pnpm test:architecture), Bash(pnpm test), Bash(pnpm build)
---

Run in order and stop at the first failure: `pnpm format:check`, `pnpm test:lint`, `pnpm lint`, `pnpm typecheck`, `pnpm test:architecture`, `pnpm test`, `pnpm build`. A missing script is reported as **not available**. End with one line per step: PASS, FAIL, not run or not available.
