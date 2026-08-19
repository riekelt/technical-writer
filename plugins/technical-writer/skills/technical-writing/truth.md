# Truth: claims, sourcing, and staleness

The rules that keep a document true, and true tomorrow.

## Grounding claims

- Every load-bearing claim traces to a source stated in the document: a `file:line`, a pinned commit, a test, an exact query, or a primary source. If a claim is not backed, say so in the document; "I read this from empty files" is a stronger sentence than a confident guess.
- When facts are handed to you without sources, never invent a citation and never block: use the fact, mark it `**[source wanted: <what and from whom>]**`, and continue. The owner fills the gap before the document is final.
- Within one document, one section owns the numbers (usually the grounding or summary section); a decision box or later chapter cites that section (`ch. 1`) or restates a derived form ("drops by more than half"), never a second copy of the raw figure.
- Ground in the real artifact, not in another document's summary of it. A document's own status header is not evidence of anything; verify against the code or history before building on it.
- Print the command behind a count, and run it against committed state (HEAD), never the working tree. Say when a number was checked and that numbers drift.
- Prefer primary sources. When official sources conflict, document the conflict and state which source wins and why; never silently pick the favorable value.
- Unknowns stay explicitly unknown: "not stated by the vendor" means no public statement was found, not that the thing is absent. Define the placeholder's meaning for the reader.
- Third-party behavior is perishable: any vendor, model, API, or library claim carries the date and commit at which it was observed. Prices, versions, and limits are always dated, never stated as permanent.
- Date a claim once, next to the claim, instead of sprinkling freshness copy through the document.

## Confidence labels

When a document mixes evidence grades, define the tiers in a "How to read this" section and use them consistently:

- **Measured**: reproduced from the repo or a script named in the document.
- **Sourced**: traced to a named primary source, cited where the claim is made.
- **Estimated**: model or judgment output, labeled as such with what it depends on.

Never claim a state you have not verified. Distinguish written (exists in the repo) from shipped (live) from externally verified (checked in the external system). "Verified" always names what was checked: "PASS (checked X and Y)", never a bare checkmark.

## Fact versus proposal versus hypothesis

- Analysis is factual and verifiable; phasing and recommendations are not. Say explicitly which part is which.
- Keep hypotheses labeled as hypotheses until repeated evidence supports them; keep the interpretation in a separate column or sentence so it cannot become evidence by repetition.
- Carry known weaknesses forward instead of quietly dropping them. A deliberate limitation "has a known cost and it should be stated rather than discovered later."
- Name the role or the dependency on a process problem, never the person, in a document that circulates.

## Keeping documents true

- **Docs update in the same change** as the thing they describe. Documentation is part of done, not a follow-up ticket.
- **When a fact changes, sweep every surface that states it.** Enumerate the affected pages, fix them all, and scope the sweep precisely so it does not become a rewrite.
- **Correct visibly.** Say what you corrected rather than quietly rewriting it. Delete only what is wrong; age alone is not a reason.
- **Superseded documents get a banner**, not deletion: what superseded it, where authority moved, and why the file still exists. A decommissioned document becomes a pointer ("the backlog now lives in X; do not re-add items here") with a note where the old content went.
- **A document that names its own stale regions is more trustworthy than one that is merely current.** Surface staleness as a visible note instead of leaving a wrong picture in place.
- **Retired false claims get a regression check** (a grep in CI or a checklist line) so they cannot silently come back.
- **Indexes are derived artifacts.** Rebuild them from the leaves and verify counts against the actual files; every entry gets a one-line purpose.
- **Diagrams are source-controlled text** (Mermaid, PlantUML), rendered output is derived: delete stale renders rather than letting them mislead, and note which sources await re-rendering. Everything legible in an image is a claim, subject to the same rules as prose; a picture does not look like a claim, which is exactly why it escapes review.
- **Tense must match status.** A dormant system cannot take the present tense; an unreleased one cannot imply availability.
- **Sentence-level history ban:** "was refactored to", "now uses", "replaces the old" describe an edit, not the system. Explain what the system does; keep the diff only where the history itself is the evidence (migration docs, release notes).

## Rules about rules

When a conventions document accumulates its own rules:

- A new rule records the incident that created it (trigger, instruction, added-after, example). Rules without provenance get cargo-culted or wrongly deleted.
- Add a rule when the same mistake happens twice; once is learning.
- Refine a rule that keeps triggering (sharper trigger, clearer instruction, an example); retire a rule whose underlying cause is fixed. "Be careful" is not a rule.
- Exceptions live next to the rule they bend, not only in the artifact that needed them.
- Automate only the mechanically decidable rules (grep for banned dashes, banned phrases, ticket keys), and mask code blocks and quotations so a document explaining a banned phrase does not fail on its own example. State where the linter stops and judgment starts.
