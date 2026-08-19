---
name: recording-decisions
description: Use when a decision needs recording - an ADR, a decision log entry, or when someone asks to write down why something was chosen, rejected, or superseded.
---

# Recording decisions

**REQUIRED BACKGROUND:** the `technical-writing` skill (hard rules, truth rules, style).

## Overview

Two formats, by weight. A full ADR for a decision with architecture-level consequences; a decision log entry for the running stream of smaller choices. Both are append-only: an accepted decision is immutable, and new context is a new entry that supersedes the old one.

## When to invoke, and not

Invoke when a choice has been made and needs recording, when someone asks "write down why we did this", or when an existing decision is superseded. Do NOT invoke for a decision still being argued (that is `writing-design-docs`; the Why & What box becomes the ADR once accepted), and never edit an accepted ADR or an existing log entry: supersede it.

Record the decision before citing it. A chat session is not a durable source: put the dated substance in the log, quote the decider where wording matters, and commit it first. Record the smallest complete decision, not a transcript.

## ADR

Nygard format. One decision per ADR.

```markdown
# ADR-[number]: [short title of the decision]

| | |
|---|---|
| **Status** | Proposed / Accepted / Superseded by ADR-XXX |
| **Date** | YYYY-MM-DD |
| **Deciders** | [who took part] |

## Context
[The forces at play: technical, organizational, political. What must be solved.
Factual, without giving away the decision.]

## Decision
[What was decided. Active voice: "We release on tags", not "it was decided that".]

## Consequences
**Positive:** [what gets easier]
**Negative:** [what gets harder, which trade we accept]
**Neutral:** [what changes without being better or worse]

## Alternatives considered
**[Alternative]** - For: [...] Against: [...] Why not chosen: [...]

## References
[Evidence, related decisions, measurements]
```

**Negative is mandatory and may not be empty.** A decision without downsides is a decision that was not thought through. Each alternative carries its strongest argument for; a rejection without it is a strawman.

## Decision log (lightweight)

For the running log a full ADR would kill. Cheap enough to actually maintain:

```markdown
## YYYY-MM-DD

### [Decision stated as an imperative sentence]
[One paragraph: the rule.]
Why:
- [reason]
- [reason]
```

The decision-as-title reads in a table of contents. Recording the rejected option and the reason is what makes the entry worth revisiting.

## Rules

- Append-only. A wrong entry gets a new dated entry that supersedes it, never an edit. Convert relative dates to absolute.
- Record the why, not only the what. Rationale is the part git history cannot reconstruct.
- When a written rule and shipped reality have diverged, record which was intended; an unowned topic is how the wrong document gets cited as authority. Every doctrine document states what it owns and what it does not govern.
- Scope guard at the top when a sibling could overlap: "product ideas live in ROADMAP.md; this file is for engineering decisions."
- Capture negative results and unknowns explicitly: "four theories, four disproved, cause not found" is a result. A search returning nothing is a result.
