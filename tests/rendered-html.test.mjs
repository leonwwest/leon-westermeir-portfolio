import assert from "node:assert/strict";
import test from "node:test";

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
  assert.match(html, /Ich baue Systeme/);
  assert.match(html, /Leon Work OS/);
  assert.match(html, /Azure Platform IaC/);
  assert.match(html, /Fünf Kernsysteme/);
  assert.match(html, /CloudScrobble/);
  assert.match(html, /v1\.2\.0/);
  assert.match(html, /Entscheidung/);
  assert.match(html, /Microsoft 365/);
  assert.match(html, /Was die Nachweise/);
  assert.doesNotMatch(html, /57\+|Sechs Systeme|Keine erfundene/);
  assert.match(html, /leon\.westermeir@ibmw-engineering\.com/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
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
