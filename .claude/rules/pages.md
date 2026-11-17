---
paths:
  - 'src/app/features/*/ui/pages/**'
  - 'src/app/app.routes.ts'
---

# Pages

- Put every route in the prerender list. Apply `cw-seo-basics` and give each page one `h1` and a distinct canonical URL.

## Review example

For a route or metadata change, check the rendered HTML for the expected title, description and
canonical URL. A route that renders in development still needs the prerender check.
