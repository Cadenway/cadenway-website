# Legal

## Purpose

Own the privacy, terms and help pages, including the contact form.

## Routes

- `/aide` publishes organization support guidance. Privacy and terms require approved text before
  their public routes open.

## Public entry points

| Entry point    | Consumers |
| -------------- | --------- |
| `legal.routes` | app       |

## Dependencies

None yet.

## Invariants

Each page is statically prerendered. Contact submission uses a public API route.
