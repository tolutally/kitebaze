import { createAppwriteStore } from './appwriteStore.js';
import { localStore } from './localStore.js';

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'crm';

// Without Appwrite settings the board runs on demo data kept in this browser.
export const store = endpoint && projectId ? createAppwriteStore({ endpoint, projectId, databaseId }) : localStore;
