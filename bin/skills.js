#!/usr/bin/env node

import { addSkill, listSkills, removeSkill } from '../lib/skills.js';

const args = process.argv.slice(2);
const command = args[0];

function printUsage() {
  console.log(`
Usage: skills <command> [options]

Commands:
  add <owner/repo>     Add skills from a GitHub repository
  list                 List installed skills
  remove <name>        Remove an installed skill

Examples:
  skills add octocat/my-skills
  skills add octocat/my-skills#branch
  skills list
  skills remove my-skills
`);
}

async function main() {
  if (!command || command === '--help' || command === '-h') {
    printUsage();
    process.exit(0);
  }

  switch (command) {
    case 'add': {
      const repo = args[1];
      if (!repo) {
        console.error('Error: Missing repository argument');
        console.error('Usage: skills add <owner/repo>');
        process.exit(1);
      }
      await addSkill(repo);
      break;
    }

    case 'list': {
      await listSkills();
      break;
    }

    case 'remove': {
      const name = args[1];
      if (!name) {
        console.error('Error: Missing skill name');
        console.error('Usage: skills remove <name>');
        process.exit(1);
      }
      await removeSkill(name);
      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      printUsage();
      process.exit(1);
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
