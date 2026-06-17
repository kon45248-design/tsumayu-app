import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const baseUrl = 'http://localhost:8098';
const outDir = path.resolve(process.argv[2] ?? 'docs/reports/phase-01-foundation');
fs.mkdirSync(outDir, { recursive: true });

const screens = [
  { key: 'passport', file: 'expo-passport.png' },
  { key: 'places', file: 'expo-places.png' },
  { key: 'food', file: 'expo-food.png' },
  { key: 'perks', file: 'expo-perks.png' },
  { key: 'account', file: 'expo-account.png' },
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
});
const page = await context.newPage();

for (const screen of screens) {
  await page.goto(`${baseUrl}/?screen=${screen.key}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`${screen.key}: scrollWidth=${scrollWidth} clientWidth=${clientWidth}`);

  await page.screenshot({ path: path.join(outDir, screen.file) });
}

await browser.close();
