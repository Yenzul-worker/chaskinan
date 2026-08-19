# PROGRESS.md — ChaskiNan (8-week comeback program)
<!-- If you chose ChaskiYachay, replace the name everywhere -->

## Status
- Current week: 2 (Aug 7 – Aug 13, 2026) — budget 15h
- Week 1 total spent: [~6] / 10
- Week 2 spent so far: 3 / 15
- Total spent: [3] / ~145h
- Phase: 1 (by hand — no agents write code or design docs)

## Decisions locked
- Product: coach–runner training platform, trail/road focus
- Name: ChaskiNan  
- v1 scope: docs/scope.md (US-01..US-10; Phase 2: US-11..US-14)
- Runner ↔ coach link: invitation code (marketplace deferred to Phase 2)
- Plan assignment: copy-on-assign (snapshot); runner/coach links are
  references — rule: "as-it-was-then → copy, as-it-is-now → reference"
- v1 measures compliance (completed/partial/missed), NOT execution
  quality (HR, splits) — known limitation, addressed by Phase 2 US-12
- Hosting: Azure free tiers; Next.js-on-Azure timeboxed 2h, fallback Vercel
- Stack: .NET API + Next.js App Router; LLM via Anthropic API key (Phase 2)
- DEFERRED (docs/scope.md §5): watch sync, payments, video hosting,
  coach marketplace, multi-coach runners

## Standing rules
- Design docs hand-written in Phase 1; AI may critique, never draft
- Every defended decision names its cost + best counter-argument
- Invariants must pass the if-statement test
- All design artifacts live in the repo as Markdown

## Checkpoints
- [x] CP1: Scope doc — PASSED (4 drafts + defense quiz)
- [x] CP1-bis quiz: Q1✓ Q2◐ Q3✗ Q4◐ Q5✓ — Q2/Q3 gaps closed via drills
- [x] Drills: pharmacy (glossary/invariants), restaurant (copy vs reference)
- [x] Step 1: repo + scope.md + PROGRESS.md committed
- [x] Step 2 / CP4: walking skeleton deployed (API + Next.js + CI) — 2.5h
- [ ] Step 3 / CP2: docs/domain.md hand-written — 2.5h
- [ ] CP3: API contracts — week 2

## Open gaps / risks
- Week-1 skeleton slipped into week 2 (cost: contract-design time compresses)
- Open design question for domain.md: coach edits a session in the
  assigned copy AFTER the runner logged against it — what happens?
- Watch: invariant coverage skews easy — hard rules (plan editing,
  temporal) must not be skipped

## Next step
- Finish Step 1, reply with repo URL + week-1 hours