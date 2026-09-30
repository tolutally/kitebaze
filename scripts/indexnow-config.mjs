import { SITE } from '../src/seo/siteMetadata.js';

export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
export const INDEXNOW_KEY = 'f72e1baa78d90fa50003b80fbcae34c7';
export const INDEXNOW_KEY_FILENAME = `${INDEXNOW_KEY}.txt`;
export const INDEXNOW_HOST = new URL(SITE.url).hostname;
export const INDEXNOW_KEY_LOCATION = `${SITE.url}/${INDEXNOW_KEY_FILENAME}`;
