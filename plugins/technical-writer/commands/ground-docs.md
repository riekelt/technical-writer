---
description: Launch a legacy documentation campaign for a codebase or directory
argument-hint: "[path]"
---

Launch a documentation campaign for the system at the given path (default: the current repository) per the `documenting-legacy-codebases` skill, which governs everything this command does not state.

Arguments: `$ARGUMENTS`

Sequence:

1. **Load the skill first**: `documenting-legacy-codebases`, with `technical-writing` as its required background. The skill's body is the authority; this command is only the entry point.
2. **Survey before prose.** Enumerate the system's surfaces per the skill's inventory list, with the command and date behind every count.
3. **Present the plan before writing**: the derived docs tree, the coverage denominators, and the model tiers per campaign phase. Wait for the user's go on the plan.
4. **Run the campaign** per the skill's fan-out: `doc-grounder` agents ground per subsystem, each pipelined into a `prose-reviewer` for the fresh-eyes pass. Pass each agent an explicit model per the skill's tier labels (small to mid-sized for grounding, mid-sized for review); the agents' own defaults do not enforce the ceiling. You are the campaign's only writer: write each returned document to its planned path in the docs tree, and keep the coverage ledger, findings note, and unknowns file current as results land.
5. **Assemble last** per the skill, then report the ledger: what is drafted, what is reviewed, what is unknown, and what landed in the findings note for the owner.

On interruption at any point, the ledger is the hand-off: leave it stating exactly what is done and what is outstanding.
