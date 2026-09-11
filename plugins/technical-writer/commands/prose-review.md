---
description: Run the fresh-eyes house review on one or more documents
argument-hint: "[file ...]"
---

Run the house prose review on the documents named in the arguments. When no file is named, review the working tree's Markdown: `git diff --name-only --diff-filter=d HEAD -- '*.md'` plus `git ls-files --others --exclude-standard -- '*.md'`, and say which files that resolved to before starting.

Arguments: `$ARGUMENTS`

For each file:

1. Compute its SHA-256 (`shasum -a 256`); the verdict binds to the exact version reviewed.
2. Dispatch one `prose-reviewer` agent per file, passing the path and the digest. The reviewer reviews; it does not edit.
3. Relay the findings and the verdict to the user unaltered, most severe first, with the digest each verdict binds to.

Apply no fixes in this command. When the user asks for fixes afterward, apply them and remind them that edits void the verdict: an edited file re-reviews, and the new digest binds the new verdict.
