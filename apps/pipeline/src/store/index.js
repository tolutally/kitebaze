import { createAppwriteStore } from './appwriteStore.js';
import { localStore } from './localStore.js';

// Kitebaze's Appwrite project. These identify the project and are not secrets; env vars override them.
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://tor.cloud.appwrite.io/v1';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || '6afdd34c0009ec87e52f';
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'crm';
const teamId = import.meta.env.VITE_APPWRITE_TEAM_ID || 'pipeline';

// VITE_PIPELINE_DEMO=true runs the board on sample data kept in the browser instead.
export const store = import.meta.env.VITE_PIPELINE_DEMO === 'true' ? localStore : createAppwriteStore({ endpoint, projectId, databaseId, teamId });
