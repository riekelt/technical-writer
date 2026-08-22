# Technical writer

[![skills.sh](https://skills.sh/b/riekelt/technical-writer)](https://skills.sh/riekelt/technical-writer)

Skills for writing technical documents in a strict house style: conclusion first, every claim traceable to a source, one fact in one home, and a banned-constructions list that catches machine text. Distilled from writing conventions used across my own repositories.

One core skill holds the shared rules; seven specialized skills build on it.

| Skill | Use when |
|---|---|
| [technical-writing](plugins/technical-writer/skills/technical-writing/SKILL.md) | Any technical document. The foundation: read-first, doc classification, hard rules, audience, the pre-draft checkpoint. Carries [style.md](plugins/technical-writer/skills/technical-writing/references/style.md) (sentences, words, headings, banned constructions) and [truth.md](plugins/technical-writer/skills/technical-writing/references/truth.md) (claims, sourcing, confidence, staleness). |
| [writing-design-docs](plugins/technical-writer/skills/writing-design-docs/SKILL.md) | Proposals, RFCs, design docs, specs, migration plans. Skeleton, Why & What box, completeness checks. |
| [recording-decisions](plugins/technical-writer/skills/recording-decisions/SKILL.md) | ADRs and decision log entries. |
| [writing-changelogs](plugins/technical-writer/skills/writing-changelogs/SKILL.md) | Changelog entries and release notes. |
| [writing-runbooks](plugins/technical-writer/skills/writing-runbooks/SKILL.md) | Runbooks, setup guides, troubleshooting, procedures. |
| [writing-issues](plugins/technical-writer/skills/writing-issues/SKILL.md) | Tracker items: epics, stories, tasks, bug reports, spikes, acceptance criteria. |
| [writing-postmortems](plugins/technical-writer/skills/writing-postmortems/SKILL.md) | Postmortems, incident reports, root-cause analyses, near misses. |
| [reviewing-technical-prose](plugins/technical-writer/skills/reviewing-technical-prose/SKILL.md) | Reviewing or rewriting someone else's text; severity mapping; the delivery checklist. |

## Influences and prior art

The rules are house-composed, but most stand on named public constructs. What each one contributed, and where this skill set deliberately diverges:

| Construct | What it contributed | Where it landed |
|---|---|---|
| [Nygard ADRs](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) and [MADR](https://adr.github.io/madr/) | The decision record format: context, decision, consequences, alternatives; immutability once accepted | `recording-decisions`. Divergence: the Negative consequences section is mandatory and may not be empty |
| [Keep a Changelog](https://keepachangelog.com/) | Categories, newest-first ordering, one entry per change | `writing-changelogs`. Divergence: entries also log known issues, deferred items, and deliberate omissions, which generated changelogs cannot know |
| [ASD-STE100](https://www.asd-ste100.org/) simplified technical English | One instruction per sentence, sentence-length ceilings, controlled-language procedure mechanics | `references/style.md` sentence rules, `writing-runbooks` |
| Zinsser, On Writing Well | Plain-prose discipline: active voice, cut clutter, one term per concept | `references/style.md` |
| [Google developer documentation style guide](https://developers.google.com/style/headings) | Heading types: noun phrases for concepts, task headings for procedures; sentence-case headings | `references/style.md` headings |
| [digital.gov plain language](https://digital.gov/guides/plain-language/) | The case against question headings outside real FAQs | `references/style.md` headings |
| [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) and humanizer-style catalogs | The machine-tell inventory: negative parallelism, rule of three, importance announcements, cursed vocabulary | `references/style.md` banned constructions. Divergence: scoped to technical documents, coupled to review severities, and paired with a what-not-to-flag list to protect human text |
| [Diátaxis](https://diataxis.fr/) | The insight that document types must not mix | The classification table in `technical-writing`. Divergence: the kinds here are keyed to the edit rule (normative, descriptive, historical, runbook, reference), not to reader need |
| BLUF (bottom line up front) | Conclusion first at every level | `technical-writing` workflow, the design-doc summary |
| [Conventional Commits](https://www.conventionalcommits.org/) and [semantic-release](https://semantic-release.gitbook.io/) | Commit subjects as the changelog, automated versioning | The release pipeline of this repo |
| [multi-agent-review](https://github.com/riekelt/multi-agent-review) | The plugin and marketplace repository structure, and the severity-tagged finding format with a named empty case | The repo layout, `reviewing-technical-prose` |

No prior art turned up for these parts when I searched public agent skills, style guides, and tooling in August 2026:

- the per-kind edit semantics (never water a normative doc down to match violating code)
- claim provenance with confidence tiers
- the staleness rules
- one fact one home, with "the source wins and the index is the bug"
- the rewrite rule that an added fact counts as an error like a lost one
- the remove-the-name test

## Install

Claude Code:

```
/plugin marketplace add riekelt/technical-writer
/plugin install technical-writer@technical-writer
```

Other agents: point the platform's plugin loader at `plugins/technical-writer/`, or symlink the directories under `plugins/technical-writer/skills/` into the agent's skills directory.

## Repository layout

```
.claude-plugin/marketplace.json          # Claude Code marketplace manifest
.agents/plugins/marketplace.json         # generic agents marketplace manifest
.github/workflows/release.yml            # semantic-release on push to main
.releaserc.json                          # release config; stamps versions into package.json and the plugin manifests
plugins/technical-writer/
  .claude-plugin/plugin.json             # Claude Code plugin manifest
  .codex-plugin/plugin.json              # Codex plugin manifest
  .cursor-plugin/plugin.json             # Cursor plugin manifest
  evals/                                 # skill trigger and behavior evals
  skills/
    technical-writing/                   # core: SKILL.md, references/style.md, references/truth.md
    writing-design-docs/
    recording-decisions/
    writing-changelogs/
    writing-runbooks/
    writing-issues/
    writing-postmortems/
    reviewing-technical-prose/
```

## Releases

Conventional Commits on `main` drive semantic-release: commit subjects become the changelog, and the release stamps the version into `package.json` and all three plugin manifests. `CHANGELOG.md` is generated; do not hand-edit it.

## License

MIT
