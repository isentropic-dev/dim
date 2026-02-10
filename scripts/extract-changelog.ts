/**
 * Extract changelog entries for a given version from all packages.
 * Used by the release workflow to build GitHub Release notes.
 *
 * Usage: deno run --allow-read scripts/extract-changelog.ts <version>
 */

import { PACKAGES } from "./packages.ts";

function extractSection(content: string, version: string): string | null {
  const header = `## ${version}`;
  const start = content.indexOf(header);
  if (start === -1) return null;

  // Find the end: next ## heading or end of file
  const afterHeader = start + header.length;
  const nextSection = content.indexOf("\n## ", afterHeader);
  const section = nextSection === -1
    ? content.slice(afterHeader)
    : content.slice(afterHeader, nextSection);

  // Trim the date suffix from the heading, just return the body
  const body = section.replace(/^\s*\([^)]*\)\s*/, "").trim();
  return body || null;
}

const version = Deno.args[0];
if (!version) {
  console.error("Usage: extract-changelog.ts <version>");
  Deno.exit(1);
}

const sections: string[] = [];

for (const [dir, name] of Object.entries(PACKAGES)) {
  const content = await Deno.readTextFile(`${dir}/CHANGELOG.md`);
  const body = extractSection(content, version);
  if (body) {
    sections.push(`## ${name}\n\n${body}`);
  }
}

if (sections.length === 0) {
  console.error(`No changelog entries found for version ${version}`);
  Deno.exit(1);
}

console.log(sections.join("\n\n"));
