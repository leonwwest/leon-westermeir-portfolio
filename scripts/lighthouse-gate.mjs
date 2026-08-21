import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const url = process.argv[2] ?? "http://127.0.0.1:3000/";
const thresholds = {
  // Mobile simulation baseline for the Vinext/RSC build; fail on measurable regressions below it.
  performance: 0.75,
  accessibility: 0.95,
  "best-practices": 0.9,
  seo: 0.95,
};

const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH,
  chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
});

try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: Object.keys(thresholds),
  });
  if (!result?.lhr) throw new Error(`Lighthouse returned no report for ${url}`);
  const scores = Object.fromEntries(
    Object.entries(thresholds).map(([category]) => [category, result.lhr.categories[category].score]),
  );
  console.log(`${url} ${Object.entries(scores).map(([key, score]) => `${key}=${Math.round(score * 100)}`).join(" ")}`);
  for (const [category, minimum] of Object.entries(thresholds)) {
    assertScore(category, scores[category], minimum, result.lhr);
  }
} finally {
  await chrome.kill();
}

function assertScore(category, score, minimum, report) {
  if (typeof score !== "number" || score < minimum) {
    const diagnostics = report.categories[category].auditRefs
      .filter((reference) => reference.weight > 0 && report.audits[reference.id]?.score < 0.9)
      .map((reference) => {
        const audit = report.audits[reference.id];
        return `${audit.title}${audit.displayValue ? ` (${audit.displayValue})` : ""}`;
      })
      .join("; ");
    if (diagnostics) console.error(`${category} diagnostics: ${diagnostics}`);
    throw new Error(`${category} score ${Math.round((score ?? 0) * 100)} is below ${Math.round(minimum * 100)}`);
  }
}
