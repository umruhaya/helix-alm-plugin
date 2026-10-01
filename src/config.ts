export interface HelixConfig {
  baseUrl: string;
  apiKey?: string;
  username?: string;
  password?: string;
  allowWrites: boolean;
  timeoutMs: number;
}

export function loadConfig(): HelixConfig {
  const baseUrl = process.env.HELIX_ALM_URL;
  if (!baseUrl) throw new Error('HELIX_ALM_URL is required');

  return {
    baseUrl: baseUrl.replace(/\/$/, ''),
    apiKey: process.env.HELIX_ALM_API_KEY,
    username: process.env.HELIX_ALM_USERNAME,
    password: process.env.HELIX_ALM_PASSWORD,
    allowWrites: process.env.HELIX_ALM_ALLOW_WRITES === 'true',
    timeoutMs: Number(process.env.HELIX_ALM_TIMEOUT_MS ?? 10000),
  };
}
