---
name: writing-runbooks
description: Use when writing operational documentation - runbooks, setup guides, release procedures, troubleshooting entries, or any ordered procedure someone will execute under time pressure. Encodes the runbook skeleton, the risk legend, and the symptom-first troubleshooting format. Use whenever someone will execute the text, even if it is called a "guide" or "setup notes".
---

# Writing runbooks

**REQUIRED BACKGROUND:** the `technical-writing` skill (hard rules, truth rules, style).

## Overview

A runbook is read by someone in a hurry, often mid-incident. Every rule here serves that reader: order, one action per step, copy-pasteable commands, and danger marked where the eye already is.

Write from a real run: every step one actually taken, every failure named one that actually happened. A procedure imagined at the desk is a draft, not a runbook.

## When to invoke, and not

Invoke for anything a person will execute: runbooks, setup and release procedures, troubleshooting entries, operational checklists, and the operator-facing strings inside a system. Do NOT invoke for design rationale (`writing-design-docs`) or for reference material nobody executes. If the procedure has not been run at least once, either run it first or label the document a draft; publishing an untested procedure as a runbook is the defect, not the labeling.

## Structure

- Title carries the scope: "MVP runbook (Reddit)", "Release runbook".
- Open with what this document is relative to its siblings: "this doc is the sequence; deep detail per step lives in X." State what it does NOT cover.
- **Legend up front** when steps differ in risk, applied to every command: safe to run anytime / operator-only (writes to production) / manual step outside the terminal.
- **TL;DR happy path first**, then the same steps broken out as numbered sections for when the reader needs only one.
- Version-pinned prerequisites before any command, each with a check command to confirm it.
- Numbered ordinal steps (not bullets), one action each, present tense or imperative, with a visible actor.
- Every command copy-pasteable as-is, with concrete placeholder values ("common paths: `/public_html/`, `/www/`"). Label variants inside the code block:

```bash
# safe mode
app sync run --channel=reddit --limit=100

# live mode (writes to the provider)
app sync run --live --approval-token=...
```

- Ordered steps state the consequence of wrong ordering inline: "deploy jar, then DB cleanup; wrong order = silent data loss."
- End with a "verify it worked" section: the observable end state and the command that proves it.
- Mark the preferred path "(recommended)" when several paths exist; document UI and CLI for the same task side by side rather than twice.
- If the runbook will shrink when tooling lands, say so: "when X lands, steps 2 to 4 become one command and this document keeps only the judgment."

## Troubleshooting entries

Symptom-first, because the reader arrives with an error message and no vocabulary:

```markdown
## <symptom as the user sees it>
**Symptom**: verbatim error strings (searchable)
**Cause**: ...
**Fix**: exact commands
```

Order diagnostic steps cheapest first. Group entries by failure class. Cross-link the deeper doc instead of inlining it.

## Operator-facing strings

Error messages and log lines are runbook prose with the shortest reading window: keep remediation specific and actionable, and make error states visible rather than letting workflows appear healthy.
