import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = JSON.parse(
  await readFile(new URL("../content/project-evidence.json", import.meta.url), "utf8"),
);

for (const [id, project] of Object.entries(source.projects)) {
  const suiteTotal = Object.values(project.testSuites).reduce((sum, count) => sum + count, 0);
  assert.equal(project.testTotal, suiteTotal, `${id}: testTotal and suite sum differ`);
  assert.match(project.verifiedRef, /^[0-9a-f]{7,40}$/i, `${id}: invalid verifiedRef`);
  assert.match(project.release, /^v\d+\.\d+\.\d+$/, `${id}: invalid release`);
  assert.ok(project.highlights.length >= 3, `${id}: recruiter highlights missing`);
  assert.ok(project.boundary.length >= 40, `${id}: evidence boundary missing`);
}

if (process.argv.includes("--remote")) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "leon-westermeir-portfolio-evidence-check",
  };

  for (const [id, project] of Object.entries(source.projects)) {
    const slug = new URL(project.repository).pathname.replace(/^\//, "");
    const [repoResponse, releaseResponse] = await Promise.all([
      fetch(`https://api.github.com/repos/${slug}/commits/main`, { headers }),
      fetch(`https://api.github.com/repos/${slug}/releases/latest`, { headers }),
    ]);
    assert.equal(repoResponse.status, 200, `${id}: GitHub main lookup failed (${repoResponse.status})`);
    assert.equal(releaseResponse.status, 200, `${id}: GitHub release lookup failed (${releaseResponse.status})`);
    const [head, release] = await Promise.all([repoResponse.json(), releaseResponse.json()]);
    assert.ok(head.sha.startsWith(project.verifiedRef), `${id}: evidence is stale; main is ${head.sha.slice(0, 7)}`);
    assert.equal(release.tag_name, project.release, `${id}: release is stale`);
  }
}

console.log(`Verified ${Object.keys(source.projects).length} project evidence records${process.argv.includes("--remote") ? " against GitHub" : ""}.`);
