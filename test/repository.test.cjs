const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { existsSync, readdirSync, readFileSync } = require('node:fs');
const { dirname, extname, join, relative, resolve } = require('node:path');
const test = require('node:test');

const root = resolve(__dirname, '..');
const skillsRoot = join(root, 'plugins/technical-writer/skills');

const pluginManifestFiles = [
  'plugins/technical-writer/.claude-plugin/plugin.json',
  'plugins/technical-writer/.codex-plugin/plugin.json',
  'plugins/technical-writer/.cursor-plugin/plugin.json',
];

const descriptiveManifestFiles = [
  '.claude-plugin/marketplace.json',
  ...pluginManifestFiles,
];

const jsonFiles = [
  '.agents/plugins/marketplace.json',
  ...descriptiveManifestFiles,
  'package.json',
  '.releaserc.json',
];

const skillFiles = readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => join(skillsRoot, entry.name, 'SKILL.md'))
  .sort();

const markdownFiles = walk(root)
  .filter((file) => extname(file) === '.md')
  .filter((file) => !file.includes(`${join(root, 'node_modules')}/`));

const coreSkill = read('plugins/technical-writer/skills/technical-writing/SKILL.md');
const styleReference = read('plugins/technical-writer/skills/technical-writing/style.md');
const changelogSkill = read('plugins/technical-writer/skills/writing-changelogs/SKILL.md');

const MIT_LICENSE_SOURCE = 'https://spdx.org/licenses/MIT.txt';
const EXPECTED_LICENSE_SHA256 = '596de79bba18ad5370b07346f8d323ef711e26350fa6b0dab56110938e8efbe6';

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules') return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function read(path) {
  return readFileSync(resolve(root, path), 'utf8');
}

function sha256(text) {
  return createHash('sha256').update(text).digest('hex');
}

function localMarkdownLinks(text) {
  return [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
    .map((match) => match[1].trim().replace(/^<|>$/g, ''))
    .filter((target) => !/^(?:[a-z]+:|#|\/)/i.test(target))
    .map((target) => decodeURIComponent(target.split('#')[0]))
    .filter(Boolean);
}

test('skill frontmatter is structurally valid', () => {
  assert.equal(skillFiles.length, 7);

  for (const file of skillFiles) {
    const text = readFileSync(file, 'utf8');
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---/);
    assert.ok(frontmatter, `${relative(root, file)} has YAML frontmatter`);
    assert.match(frontmatter[1], /^name: [a-z0-9-]+$/m);
    assert.match(frontmatter[1], /^description: Use when .+$/m);
  }
});

test('JSON manifests parse and plugin versions match the package', () => {
  for (const file of jsonFiles) JSON.parse(read(file));

  const packageVersion = JSON.parse(read('package.json')).version;
  for (const file of pluginManifestFiles) {
    assert.equal(JSON.parse(read(file)).version, packageVersion, file);
  }
});

test('local Markdown links resolve', () => {
  for (const file of markdownFiles) {
    for (const target of localMarkdownLinks(readFileSync(file, 'utf8'))) {
      assert.ok(
        existsSync(resolve(dirname(file), target)),
        `${relative(root, file)} -> ${target}`,
      );
    }
  }
});

test('metadata describes all six specialized skills', () => {
  const readme = read('README.md');
  assert.match(readme, /one core skill[^.]*six specialized skills/i);
  assert.match(readme, /writing-issues\//);

  for (const file of descriptiveManifestFiles) {
    assert.match(read(file), /issues|tracker/i, file);
  }
});

test('shared and specialized rules declare their precedence', () => {
  assert.match(coreSkill, /## Rule precedence/);
  assert.doesNotMatch(coreSkill, /Matching the existing practice outranks every style rule/);
  assert.match(coreSkill, /pinned commit may appear solely as claim evidence/i);
  assert.doesNotMatch(coreSkill, /stop and ask; do not guess/i);
  assert.match(coreSkill, /fewer than two comparable documents/i);
  assert.match(changelogSkill, /Document-type exception/);
  assert.doesNotMatch(styleReference, /templates\.md/);
});

test('LICENSE matches the downloaded SPDX text', () => {
  const license = resolve(root, 'LICENSE');
  assert.ok(existsSync(license), `LICENSE must come from ${MIT_LICENSE_SOURCE}`);
  assert.equal(
    sha256(readFileSync(license, 'utf8')),
    EXPECTED_LICENSE_SHA256,
    `LICENSE must match ${MIT_LICENSE_SOURCE}`,
  );
});
