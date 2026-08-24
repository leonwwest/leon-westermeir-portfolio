import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the portfolio and its evidence path", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]+lang="de"/i);
  assert.match(html, /Leon Westermeir/);
  assert.match(html, /Cloud aus Code\./);
  assert.match(html, /azure-platform-demo\.mp4/);
  assert.match(html, /DevOps \/ Platform Engineering/);
  assert.match(html, /Leon Work OS/);
  assert.match(html, /Azure Platform IaC/);
  assert.match(html, /Incident Automation Lab/);
  assert.match(html, /Engineering-Belege zum Prüfen/);
  assert.match(html, /CloudScrobble/);
  assert.match(html, /v1\.2\.0/);
  assert.match(html, /Entscheidung/);
  assert.match(html, /Microsoft 365/);
  assert.doesNotMatch(html, /Was die Nachweise/);
  assert.match(html, /Passender Einstieg nach Rolle/);
  assert.match(html, /Cloud &amp; Platform/);
  assert.match(html, /Microsoft &amp; Automation/);
  assert.match(html, /Data &amp; Business Applications/);
  assert.match(html, /href="#project=azure-platform"/);
  assert.match(html, /href="#project=m365-automation"/);
  assert.match(html, /href="\/projects\/data-quality"/);
  assert.match(html, /Demo pausieren/);
  assert.match(html, /Original öffnen/);
  assert.match(html, /13\/13 Tests/);
  assert.match(html, /v1\.3\.0/);
  assert.doesNotMatch(html, /18 \/ 18|v1\.2\.0[^<]{0,80}18 Tests/);
  assert.match(html, /<video[^>]*autoplay/i);
  assert.doesNotMatch(html, /-demo\.gif/);
  assert.doesNotMatch(html, /aria-atomic/i);
  assert.equal((html.match(/aria-live=/g) ?? []).length, 1);
  assert.match(html, /row-indicator/);
  assert.doesNotMatch(html, /row-arrow/);
  assert.doesNotMatch(html, /57\+|Sechs Systeme|Keine erfundene/);
  assert.match(html, /leon\.westermeir@ibmw-engineering\.com/);
  assert.match(html, /href="\/Leon_Westermeir_Lebenslauf\.pdf"/);
  assert.match(html, /github\.com\/leonwwest\/private-ai-lab/);
  assert.doesNotMatch(html, /github\.com\/leonwwest\/ludo-club/);
  assert.doesNotMatch(html, /github\.com\/leonwwest\/ludo_club/);
  const projectHtml = html.slice(html.indexOf('id="projekte"'));
  assert.ok(projectHtml.indexOf("Azure Platform IaC") < projectHtml.indexOf("GitOps Platform Lab"));
  assert.ok(projectHtml.indexOf("GitOps Platform Lab") < projectHtml.indexOf("Incident Automation Lab"));
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("server-renders the working-method route", async () => {
  const response = await render("/arbeitsweise");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Schnell lernen/);
  assert.match(html, /Was die Nachweise/);
  assert.match(html, /Unklarheit eingrenzen/);
  assert.match(html, /Grenzen gehören zum Beleg/);
  assert.match(html, /Read-only zuerst/);
});

test("server-renders the Data Quality detail route with specific metadata", async () => {
  const response = await render("/projects/data-quality");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Datenqualität, die im Betrieb erklärbar bleibt/);
  assert.match(html, /27\/27 Tests/);
  assert.match(html, /6 Quality Checks/);
  assert.match(html, /Gate 100\/100/);
  assert.match(html, /Damit kann ich im Team anschließen/);
  assert.match(html, /property="og:url" content="https:\/\/ibmw-automations\.de\/projects\/data-quality"/);
  assert.match(html, /property="og:image" content="https:\/\/ibmw-automations\.de\/projects\/data-quality\.png"/);
});

test("keeps verified project evidence internally consistent", async () => {
  const source = JSON.parse(await readFile(path.join(root, "content/project-evidence.json"), "utf8"));
  for (const [id, project] of Object.entries(source.projects)) {
    const suiteTotal = Object.values(project.testSuites).reduce((sum, count) => sum + count, 0);
    assert.equal(project.testTotal, suiteTotal, `${id} testTotal must equal its suite sum`);
    assert.match(project.verifiedRef, /^[0-9a-f]{7,40}$/i);
    assert.match(project.ciRun, /^https:\/\/github\.com\/leonwwest\/.+\/actions\/runs\/\d+$/);
    assert.ok(project.highlights.length >= 3, `${id} needs recruiter-readable highlights`);
    assert.ok(project.boundary.length > 30, `${id} needs an explicit evidence boundary`);
  }
  assert.deepEqual(source.projects["gitops-platform"].highlights[0], "24/24 Tests");
  assert.equal(source.projects["gitops-platform"].release, "v1.3.0");
});

test("ships every referenced evidence video and poster", async () => {
  const assets = [
    "azure-platform-demo.mp4",
    "azure-platform.png",
    "gitops-platform-demo.mp4",
    "gitops-platform.png",
    "incident-response-demo.mp4",
    "incident-response.png",
    "m365-automation-demo.mp4",
    "m365-automation.png",
  ];
  await Promise.all(assets.map((asset) => access(path.join(root, "public/projects", asset))));
});

test("server-renders the sanitized Work OS evidence route", async () => {
  const response = await render("/work-os-evidence");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Restore-Drill/);
  assert.match(html, /20 \/ 20/);
  assert.match(html, /2\.898/);
  assert.match(html, /kein[\s\S]*Produktions-RTO/i);
  assert.doesNotMatch(html, /tailscale|vps-|sha256|\/var\/lib/i);
});

test("server-renders both legal routes", async () => {
  const [impressum, datenschutz] = await Promise.all([render("/impressum"), render("/datenschutz")]);
  assert.equal(impressum.status, 200);
  assert.equal(datenschutz.status, 200);
  assert.match(await impressum.text(), /Angaben gemäß § 5 DDG/);
  assert.match(await datenschutz.text(), /Art\. 6 Abs\. 1 lit\. f DSGVO/);
});
