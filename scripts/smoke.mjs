import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const base = process.env.MERIDIAN_URL ?? "http://127.0.0.1:4319";
const outDir = path.resolve("docs/screenshots");
const tilePattern = /openstreetmap|openfreemap|cartocdn|mapbox|tile\.openstreetmap|googleapis\.com\/maps/i;

const failures = [];
function check(name, ok, detail = "") {
  if (!ok) failures.push(`${name}${detail ? `: ${detail}` : ""}`);
  else console.log("ok", name);
}

async function overflow(page) {
  return page.evaluate(() => ({
    doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    body: document.body.scrollWidth - document.body.clientWidth,
  }));
}

async function shoot(page, name) {
  await page.screenshot({ path: path.join(outDir, name), fullPage: true });
  const extra = await overflow(page);
  check(`no overflow ${name}`, extra.doc <= 1 && extra.body <= 1, JSON.stringify(extra));
}

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const externalTiles = [];
page.on("request", (request) => {
  const url = request.url();
  if (tilePattern.test(url)) externalTiles.push(url);
});
const consoleErrors = [];
page.on("pageerror", (error) => consoleErrors.push(String(error)));

await mkdir(outDir, { recursive: true });

await page.goto(base, { waitUntil: "networkidle" });
await page.getByRole("heading", { name: "Five events" }).waitFor();
const robots = await page.locator('meta[name="robots"]').getAttribute("content");
check("noindex", (robots ?? "").includes("noindex"), robots ?? "missing");
await shoot(page, "home-desktop-light.png");

await page.getByRole("button", { name: "Dark theme" }).click();
await page.waitForTimeout(200);
check("dark class", await page.evaluate(() => document.documentElement.classList.contains("dark")));
await shoot(page, "home-desktop-dark.png");
await page.getByRole("button", { name: "Light theme" }).click();

await page.goto(`${base}/practice/set-01`, { waitUntil: "networkidle" });
await page.getByRole("heading", { name: /Event 1 of 5/ }).waitFor();
const map = page.getByTestId("world-map");
const box = await map.boundingBox();
if (!box) throw new Error("Map has no box");
const points = [
  [0.46, 0.42],
  [0.55, 0.38],
  [0.38, 0.48],
  [0.62, 0.5],
];
for (const [x, y] of points) {
  await page.mouse.click(box.x + box.width * x, box.y + box.height * y);
  const value = await page.getByTestId("lat-input").inputValue();
  if (value) break;
}
const lat = await page.getByTestId("lat-input").inputValue();
const lon = await page.getByTestId("lon-input").inputValue();
check("map click sets coordinates", lat !== "" && lon !== "", `lat=${lat} lon=${lon}`);
await page.getByTestId("year-input").fill("44");
await page.getByTestId("era-bc").click();
check("year field", (await page.getByTestId("year-input").inputValue()) === "44");
check("bc selected", (await page.getByTestId("era-bc").getAttribute("aria-checked")) === "true");
await shoot(page, "gameplay-desktop-light.png");

await page.getByTestId("submit-guess").click();
await page.getByTestId("reveal-panel").waitFor();
const revealText = await page.getByTestId("reveal-panel").innerText();
check("reveal shows a score", /Place/.test(revealText) && /\d/.test(revealText));
check("reveal names the event after locking", revealText.includes("Assassination of Julius Caesar"));
await shoot(page, "reveal-desktop-light.png");

for (let round = 0; round < 4; round += 1) {
  await page.getByTestId("next-round").click();
  await page.getByTestId("year-input").waitFor();
  await page.getByTestId("lat-input").fill("10");
  await page.getByTestId("lon-input").fill("10");
  await page.getByTestId("year-input").fill("1");
  await page.getByTestId("era-ad").click();
  await page.getByTestId("submit-guess").click();
  await page.getByTestId("reveal-panel").waitFor();
}
await page.getByTestId("next-round").click();
await page.getByTestId("results-panel").waitFor();
const share = await page.getByTestId("share-text").inputValue();
check("share omits the answer title", !share.includes("Caesar") && !share.includes("Rome"));
check("share omits eras", !/\bBC\b/.test(share) && !/\bAD\b/.test(share));
check("share has bands", share.includes("close") || share.includes("near") || share.includes("far"));
await shoot(page, "results-desktop-light.png");
check("no tile requests", externalTiles.length === 0, externalTiles.join(" "));

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base, { waitUntil: "networkidle" });
await page.getByRole("heading", { name: "Five events" }).waitFor();
await shoot(page, "home-mobile-light.png");
await page.getByRole("button", { name: "Dark theme" }).click();
await page.goto(`${base}/practice/set-02`, { waitUntil: "networkidle" });
await page.getByRole("heading", { name: /Event 1 of 5/ }).waitFor();
await page.getByTestId("lat-input").fill("51.5");
await page.getByTestId("lon-input").fill("-0.1");
await page.getByTestId("year-input").fill("1215");
await shoot(page, "gameplay-mobile-dark.png");
await page.getByTestId("submit-guess").click();
await page.getByTestId("reveal-panel").waitFor();
await shoot(page, "reveal-mobile-dark.png");

check("no page errors", consoleErrors.length === 0, consoleErrors.join(" | "));

await browser.close();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("smoke passed");
