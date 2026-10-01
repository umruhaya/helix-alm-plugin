import type { HelixConfig } from '../config.js';

export class HelixClient {
  constructor(private config: HelixConfig) {}

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.config.timeoutMs);

    try {
      const headers = new Headers(init.headers);
      headers.set('Accept', 'application/json');
      if (this.config.apiKey) headers.set('Authorization', `Bearer ${this.config.apiKey}`);
      if (this.config.username && this.config.password) {
        headers.set('Authorization', `Basic ${btoa(`${this.config.username}:${this.config.password}`)}`);
      }

      const response = await fetch(`${this.config.baseUrl}${path}`, {
        ...init,
        headers,
        signal: controller.signal,
        redirect: 'error',
      });

      if (!response.ok) throw new Error(`Helix API ${response.status}: ${await response.text()}`);
      return await response.json() as T;
    } finally {
      clearTimeout(timer);
    }
  }

  listProjects() {
    return this.request('/api/v0/projects');
  }

  getIssue(id: string) {
    return this.request(`/api/v0/issues/${encodeURIComponent(id)}`);
  }
}
