import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { AxePuppeteer } from "@axe-core/puppeteer";
import puppeteer from "puppeteer-core";

const rootUrl = "http://127.0.0.1:3000";
const routes = ["/", "/arbeitsweise", "/projects/data-quality"];
const chromeCandidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
].filter(Boolean);

const chromePath = await firstExecutable(chromeCandidates);
if (!chromePath) throw new Error("Chrome was not found; set CHROME_PATH for browser audits.");

const server = spawn("npm", ["run", "start"], {
  cwd: new URL("..", import.meta.url),
  env: { ...process.env },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverOutput = "";
server.stdout.on("data", (chunk) => { serverOutput += chunk; });
server.stderr.on("data", (chunk) => { serverOutput += chunk; });

try {
  await waitForSite(`${rootUrl}/`);
  await runAxe(chromePath);
  for (const route of routes) {
    await run(process.execPath, ["scripts/lighthouse-gate.mjs", `${rootUrl}${route}`], {
      CHROME_PATH: chromePath,
    });
  }
} finally {
  server.kill("SIGTERM");
}

async function runAxe(executablePath) {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });
  try {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.goto(`${rootUrl}${route}`, { waitUntil: "networkidle0" });
      const results = await new AxePuppeteer(page)
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      if (results.violations.length > 0) {
        const summary = results.violations
          .map((violation) => `${violation.id}: ${violation.nodes.length} node(s)`)
          .join(", ");
        throw new Error(`${route} Axe violations: ${summary}`);
      }
      console.log(`${rootUrl}${route} axe=0`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

async function firstExecutable(candidates) {
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next known Chrome location.
    }
  }
  return null;
}

async function waitForSite(url) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Site server exited early:\n${serverOutput}`);
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Site did not become ready:\n${serverOutput}`);
}

function run(command, args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: new URL("..", import.meta.url),
      env: { ...process.env, ...extraEnv },
      stdio: "inherit",
    });
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
    child.on("error", reject);
  });
}
