import { z } from 'zod';
import { readOnlyAnnotations, writeAnnotations } from './types.js';

export function registerIssueTools(server: any, client: any) {
  server.tool('helix_search_issues', 'Search Helix ALM issues.', {
    query: z.string(),
  }, readOnlyAnnotations, async ({ query }: { query: string }) => ({
    content: [{ type: 'text', text: JSON.stringify(await client.searchIssues(query), null, 2) }],
  }));

  server.tool('helix_update_issue', 'Update a Helix ALM issue. Requires write enablement.', {
    id: z.string(),
    fields: z.record(z.string(), z.unknown()),
  }, writeAnnotations, async ({ id, fields }: { id: string; fields: Record<string, unknown> }) => ({
    content: [{ type: 'text', text: JSON.stringify(await client.updateIssue(id, fields), null, 2) }],
  }));
}
