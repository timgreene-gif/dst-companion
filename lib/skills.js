import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILLS_DIR = path.join(__dirname, '..', 'skills');
const SKILLS_MANIFEST = path.join(SKILLS_DIR, 'manifest.json');

/**
 * Parse a repository string into owner, repo, and optional branch
 * Supports formats: owner/repo or owner/repo#branch
 */
function parseRepo(repoString) {
  const [repoPath, branch = 'main'] = repoString.split('#');
  const parts = repoPath.split('/');

  if (parts.length !== 2) {
    throw new Error(`Invalid repository format: "${repoString}". Expected: owner/repo or owner/repo#branch`);
  }

  const [owner, repo] = parts;

  if (!owner || !repo) {
    throw new Error(`Invalid repository format: "${repoString}". Owner and repo cannot be empty.`);
  }

  return { owner, repo, branch };
}

/**
 * Fetch content from GitHub raw URLs
 */
async function fetchFromGitHub(owner, repo, branch, filePath) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

/**
 * Fetch skill manifest from a repository
 * Looks for skills.json or .skills/manifest.json
 */
async function fetchSkillManifest(owner, repo, branch) {
  // Try skills.json first
  let content = await fetchFromGitHub(owner, repo, branch, 'skills.json');

  if (!content) {
    // Try .skills/manifest.json
    content = await fetchFromGitHub(owner, repo, branch, '.skills/manifest.json');
  }

  if (!content) {
    throw new Error(`No skill manifest found in ${owner}/${repo}. Expected skills.json or .skills/manifest.json`);
  }

  try {
    return JSON.parse(content);
  } catch (e) {
    throw new Error(`Invalid JSON in skill manifest: ${e.message}`);
  }
}

/**
 * Load the local skills manifest
 */
async function loadManifest() {
  try {
    const content = await fs.readFile(SKILLS_MANIFEST, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    if (e.code === 'ENOENT') {
      return { skills: {} };
    }
    throw e;
  }
}

/**
 * Save the local skills manifest
 */
async function saveManifest(manifest) {
  await fs.mkdir(SKILLS_DIR, { recursive: true });
  await fs.writeFile(SKILLS_MANIFEST, JSON.stringify(manifest, null, 2));
}

/**
 * Add a skill from a GitHub repository
 */
export async function addSkill(repoString) {
  const { owner, repo, branch } = parseRepo(repoString);

  console.log(`Fetching skill from ${owner}/${repo}@${branch}...`);

  const skillManifest = await fetchSkillManifest(owner, repo, branch);

  // Validate skill manifest
  if (!skillManifest.name) {
    throw new Error('Skill manifest must include a "name" field');
  }

  const skillName = skillManifest.name;
  const skillDir = path.join(SKILLS_DIR, skillName);

  // Create skill directory
  await fs.mkdir(skillDir, { recursive: true });

  // Download skill files if specified
  if (skillManifest.files && Array.isArray(skillManifest.files)) {
    for (const file of skillManifest.files) {
      console.log(`  Downloading ${file}...`);
      const content = await fetchFromGitHub(owner, repo, branch, file);

      if (content === null) {
        console.warn(`  Warning: File not found: ${file}`);
        continue;
      }

      const filePath = path.join(skillDir, path.basename(file));
      await fs.writeFile(filePath, content);
    }
  }

  // Save skill manifest locally
  await fs.writeFile(
    path.join(skillDir, 'skill.json'),
    JSON.stringify(skillManifest, null, 2)
  );

  // Update global manifest
  const manifest = await loadManifest();
  manifest.skills[skillName] = {
    name: skillName,
    description: skillManifest.description || '',
    source: `${owner}/${repo}`,
    branch,
    version: skillManifest.version || '1.0.0',
    installedAt: new Date().toISOString()
  };
  await saveManifest(manifest);

  console.log(`\nSuccessfully added skill: ${skillName}`);

  if (skillManifest.description) {
    console.log(`  ${skillManifest.description}`);
  }
}

/**
 * List all installed skills
 */
export async function listSkills() {
  const manifest = await loadManifest();
  const skills = Object.values(manifest.skills);

  if (skills.length === 0) {
    console.log('No skills installed.');
    console.log('\nRun "skills add <owner/repo>" to add skills from GitHub.');
    return;
  }

  console.log('Installed skills:\n');

  for (const skill of skills) {
    console.log(`  ${skill.name} (v${skill.version})`);
    if (skill.description) {
      console.log(`    ${skill.description}`);
    }
    console.log(`    Source: ${skill.source}@${skill.branch}`);
    console.log('');
  }

  console.log(`Total: ${skills.length} skill(s)`);
}

/**
 * Remove an installed skill
 */
export async function removeSkill(skillName) {
  const manifest = await loadManifest();

  if (!manifest.skills[skillName]) {
    console.error(`Skill not found: ${skillName}`);
    console.log('\nRun "skills list" to see installed skills.');
    process.exit(1);
  }

  // Remove skill directory
  const skillDir = path.join(SKILLS_DIR, skillName);
  try {
    await fs.rm(skillDir, { recursive: true, force: true });
  } catch (e) {
    // Ignore if directory doesn't exist
  }

  // Update manifest
  delete manifest.skills[skillName];
  await saveManifest(manifest);

  console.log(`Successfully removed skill: ${skillName}`);
}
