import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  PUBLIC_ROUTES,
  SITE,
  getCanonicalUrl,
} from '../src/seo/siteMetadata.js';
import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_FILENAME,
  INDEXNOW_KEY_LOCATION,
} from './indexnow-config.mjs';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDirectory, '..');
const keyFilePath = join(projectRoot, 'public', INDEXNOW_KEY_FILENAME);
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const requestedUrls = args.filter((arg) => !arg.startsWith('--'));
const expectedOrigin = new URL(SITE.url).origin;

function normalizeUrl(value) {
  const url = new URL(value, `${expectedOrigin}/`);

  if (url.origin !== expectedOrigin) {
    throw new Error(`IndexNow URL must belong to ${expectedOrigin}: ${value}`);
  }

  url.hash = '';
  return url.href;
}

function unique(values) {
  return [...new Set(values)];
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function retryDelay(response, attempt) {
  const retryAfter = response.headers.get('retry-after');
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds)) return Math.min(seconds * 1_000, 60_000);

    const retryAt = Date.parse(retryAfter);
    if (Number.isFinite(retryAt)) return Math.min(Math.max(retryAt - Date.now(), 0), 60_000);
  }

  return attempt * 5_000;
}

async function verifyLocalKey() {
  const keyFile = (await readFile(keyFilePath, 'utf8')).trim();
  if (keyFile !== INDEXNOW_KEY) {
    throw new Error(`IndexNow key file does not contain the configured key: ${keyFilePath}`);
  }
}

async function verifyHostedKey() {
  const response = await fetch(INDEXNOW_KEY_LOCATION, {
    headers: { accept: 'text/plain', 'cache-control': 'no-cache' },
    signal: AbortSignal.timeout(15_000),
  });
  const body = await response.text();

  if (!response.ok || body.trim() !== INDEXNOW_KEY) {
    throw new Error(
      `IndexNow key is not live at ${INDEXNOW_KEY_LOCATION} `
      + `(HTTP ${response.status}). Deploy the key file before submitting URLs.`,
    );
  }
}

async function submit(payload) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30_000),
    });
    const responseBody = await response.text();

    if (response.status === 200 || response.status === 202) {
      return response.status;
    }

    if (response.status === 429 && attempt < maxAttempts) {
      const delay = retryDelay(response, attempt);
      console.warn(`IndexNow rate-limited the request. Retrying in ${Math.ceil(delay / 1_000)} seconds.`);
      await wait(delay);
      continue;
    }

    throw new Error(
      `IndexNow rejected the submission (HTTP ${response.status})${responseBody ? `: ${responseBody}` : '.'}`,
    );
  }

  throw new Error('IndexNow submission failed after all retry attempts.');
}

await verifyLocalKey();

const urlList = unique(
  (requestedUrls.length ? requestedUrls : PUBLIC_ROUTES.map(({ path }) => getCanonicalUrl(path)))
    .map(normalizeUrl),
);

if (!urlList.length) throw new Error('No URLs were provided for IndexNow submission.');
if (urlList.length > 10_000) throw new Error('IndexNow accepts at most 10,000 URLs per request.');

const payload = {
  host: INDEXNOW_HOST,
  key: INDEXNOW_KEY,
  keyLocation: INDEXNOW_KEY_LOCATION,
  urlList,
};

if (dryRun) {
  console.log(`IndexNow dry run: ${urlList.length} URL${urlList.length === 1 ? '' : 's'} ready.`);
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

await verifyHostedKey();
const status = await submit(payload);
console.log(`IndexNow accepted ${urlList.length} URL${urlList.length === 1 ? '' : 's'} (HTTP ${status}).`);
