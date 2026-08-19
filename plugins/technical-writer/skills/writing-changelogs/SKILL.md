---
name: writing-changelogs
description: Use when writing a changelog entry, release notes, or a "what shipped" summary after completing work.
---

# Writing changelogs

**REQUIRED BACKGROUND:** the `technical-writing` skill (hard rules, truth rules, style).

## Overview

The changelog is the one place where describing the change, not the current state, is the job. It is historical: entries are never rewritten, only appended.

## When to invoke, and not

Invoke after shipping a meaningful change (a feature, a fix of real size, a removal), when writing release notes, or when summarizing what shipped. Do NOT invoke for trivial edits (a threshold of roughly three changed files or commits keeps the log meaningful), and never rewrite or delete existing entries: the changelog is historical by classification.

## Rules

- One entry per shipped change, newest first, ISO dates, grouped by version where versions exist. Strict, not marketing.
- Standard categories where the file uses them: Added / Changed / Fixed / Removed / Security.
- User-visible impact over implementation detail; present tense, active voice; no jargon the reader would not know; group related changes; never duplicate an existing entry.
- Record removals, not just additions: readers chase dead concepts otherwise.

## Entry shape

**Document-type exception:** the bold leads required below override the shared ban on bold-lead bullets. The exception covers changelog outcomes and the named known-issue, deferred-item, and omission categories only. Repeated label-value bullets remain banned elsewhere.

**Bold lead stating the outcome**, then root cause, then the fix, with exact names inline:

```markdown
- **Reference-to-video routing fixed.** The resolver only knew three operation
  kinds, so requests with reference media routed to image-to-video. A
  `hasReferenceMedia()` check now gives reference-to-video a higher-priority
  branch.
```

Fixed entries explain the failure mode, not the diff. A "why it matters" clause turns a change list into something a reader can triage.

## Honesty conventions

The entries almost nobody writes, and the reason a changelog becomes citable:

- **Known issues** surfaced but not fixed in this change, named as such.
- **Deferred items** still owed ("one deploy needed to restore the webhook key").
- **Deliberate omissions**, described by category, so the same omission is not re-litigated or mistaken for an oversight.

Never mark anything shipped, deployed, or verified unless that exact action was completed and checked. Distinguish implemented (in the repo) from deployed (live) from externally verified.

## Handover / completion summary

For handing finished work to a reviewer or operator, the sections most handovers lack and readers most need:

1. Why this work exists
2. What shipped
3. Where to point the review (the decisions a reviewer must understand before judging)
4. Verification status: exact commands and their results, never a bare checkmark
5. Honest caveats and things I got wrong
6. Residual risks and what NOT to do
7. State and what is owed (merged-not-pushed, migrations, ordered steps with the consequence of wrong ordering)

Naming a section for self-reported error makes it socially safe to write.
