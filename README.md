# Technical writer

Skills for writing technical documents in a strict house style: conclusion first, every claim traceable to a source, one fact in one home, and a banned-constructions list that catches machine text. Distilled from writing conventions proven across my own repositories.

One core skill holds the shared rules; five document-type skills build on it.

| Skill | Use when |
|---|---|
| [technical-writing](plugins/technical-writer/skills/technical-writing/SKILL.md) | Any technical document. The foundation: read-first, doc classification, hard rules, audience, the pre-draft checkpoint. Carries [style.md](plugins/technical-writer/skills/technical-writing/style.md) (sentences, words, headings, banned constructions) and [truth.md](plugins/technical-writer/skills/technical-writing/truth.md) (claims, sourcing, confidence, staleness). |
| [writing-design-docs](plugins/technical-writer/skills/writing-design-docs/SKILL.md) | Proposals, RFCs, design docs, specs, migration plans. Skeleton, Why & What box, completeness checks. |
| [recording-decisions](plugins/technical-writer/skills/recording-decisions/SKILL.md) | ADRs and decision log entries. |
| [writing-changelogs](plugins/technical-writer/skills/writing-changelogs/SKILL.md) | Changelog entries and release notes. |
| [writing-runbooks](plugins/technical-writer/skills/writing-runbooks/SKILL.md) | Runbooks, setup guides, troubleshooting, procedures. |
| [reviewing-technical-prose](plugins/technical-writer/skills/reviewing-technical-prose/SKILL.md) | Reviewing or rewriting someone else's text; severity mapping; the delivery checklist. |

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
.releaserc.json                          # release config; stamps versions into the plugin manifests
plugins/technical-writer/
  .claude-plugin/plugin.json             # per-platform plugin manifests
  .codex-plugin/plugin.json
  .cursor-plugin/plugin.json
  skills/
    technical-writing/                   # core: SKILL.md, style.md, truth.md
    writing-design-docs/
    recording-decisions/
    writing-changelogs/
    writing-runbooks/
    reviewing-technical-prose/
```

## Releases

Conventional Commits on `main` drive semantic-release: commit subjects become the changelog, and the release stamps the version into `package.json` and all three plugin manifests. `CHANGELOG.md` is generated; do not hand-edit it.

## License

MIT
