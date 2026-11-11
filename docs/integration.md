# Domain and integration

[Documentation index](README.md) · [Repository instructions](../AGENTS.md)

**Status:** This page records the target design from repository instructions and skills. Its behavior has not been verified as implemented in this snapshot.

## Public-site boundaries

The public site is intended to prerender its routes and link visitors to the webapp for private workflows. It does not own sessions or private API routes. [The mockup copy](maquette/README.md) is read-only. Pricing is unresolved: the site and app show different free-plan limits. Resolve the discrepancy before shipping pricing. The vitrine also advertises a 20% yearly discount, but €5 instead of €6 per member per month is a 16.7% reduction. Confirm the intended prices and discount together. The sections below are mockup-derived targets.

## Seo Basics

Source: `wp-seo-basics` ([Claude](../.claude/skills/wp-seo-basics/SKILL.md), [Codex](../.codex/skills/wp-seo-basics/SKILL.md)).

- `<title>` and `<meta name="description">` unique per page; canonical link; Open Graph title,
  description and image.
- Prerendered HTML contains the content (no client-only rendering of text).
- Sitemap and robots generated at build time.

## Website Sections

Source: `wp-website-sections` ([Claude](../.claude/skills/wp-website-sections/SKILL.md), [Codex](../.codex/skills/wp-website-sections/SKILL.md)).

| #   | Section      | Behavior                                                                                                                                                              |
| --- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Header       | Anchor navigation with scroll-spy, mobile menu, Se connecter, Démarrer                                                                                                |
| 2   | Hero         | Animated app demo in sequence                                                                                                                                         |
| 3   | Logos        | Continuous marquee                                                                                                                                                    |
| 4   | Features     | 7 features                                                                                                                                                            |
| 5   | Key figures  | Counters                                                                                                                                                              |
| 6   | Integrations | Orbit of logos                                                                                                                                                        |
| 7   | Migration    | Tabs Trello, Jira, CSV with a typing terminal (dark)                                                                                                                  |
| 8   | Comparison   | Table                                                                                                                                                                 |
| 9   | Pricing      | Monthly or yearly (−20 %), 6 or 5 € per member per month, members 1 to 5 000 (±5 buttons, arrows ±1), plans Gratuit, Équipe (highlighted), Entreprise (contact toast) |
| 10  | Testimonials | Cards                                                                                                                                                                 |
| 11  | FAQ          | Accordion                                                                                                                                                             |
| 12  | Final call   | Buttons                                                                                                                                                               |
| 13  | Footer       | Newsletter, 3 link columns                                                                                                                                            |

## References

[Interactive mockup](https://claude.ai/artifact/KYRM7AnsYLiBLBLKy8i4HE), [integration guide](https://claude.ai/artifact/CpJHVCiFfF9j3KbHQ2S1Et), and [repositories and packages](https://claude.ai/artifact/BPinmYxoF3mbK8w9BMB43N). Use [AGENTS.md](../AGENTS.md) as the local source for ownership and hard limits.
