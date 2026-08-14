import { rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const projectRoot = process.cwd();
const nextEnvPath = path.join(projectRoot, "next-env.d.ts");
const nextEnvForVinext = `/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "vinext/types/augmentations";
import "./.next/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
`;

await rm(path.join(projectRoot, ".next"), { recursive: true, force: true });

const child = spawn(
  process.execPath,
  [path.join(projectRoot, "node_modules/next/dist/bin/next"), "build"],
  { cwd: projectRoot, stdio: "inherit" },
);

const exitCode = await new Promise((resolve, reject) => {
  child.once("error", reject);
  child.once("exit", (code) => resolve(code ?? 1));
});

await writeFile(nextEnvPath, nextEnvForVinext, "utf8");
process.exitCode = exitCode;
