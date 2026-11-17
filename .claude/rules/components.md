---
paths:
  - 'src/app/**/*.ts'
  - 'src/app/**/*.html'
---

# Angular components

- Same conventions as the webapp: no suffix, `cw-` selectors, signal inputs and outputs, control flow.
- Visual bricks from `@cadenway/ui`; Tailwind over `@cadenway/tokens`.

## Review example

For example, keep pricing calculations with the pricing feature and give the presentational
component the values it displays. Verify the calculation independently and use the shared controls
to render and update the values.
