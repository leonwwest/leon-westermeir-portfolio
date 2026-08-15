import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const modified = new Date("2026-08-15");
  return [
    { url: "https://ibmw-automations.de", lastModified: modified, changeFrequency: "monthly", priority: 1 },
    { url: "https://ibmw-automations.de/impressum", lastModified: modified, changeFrequency: "yearly", priority: 0.2 },
    { url: "https://ibmw-automations.de/datenschutz", lastModified: modified, changeFrequency: "yearly", priority: 0.2 },
    { url: "https://ibmw-automations.de/work-os-evidence", lastModified: modified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
