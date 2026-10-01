import { z } from 'zod';
import { readOnlyAnnotations } from './types.js';

export function registerTestTools(server: any, client: any) {
  server.tool('helix_get_test_case', 'Get a Helix ALM test case.', {
    id: z.string(),
  }, readOnlyAnnotations, async ({ id }: { id: string }) => ({
    content: [{ type: 'text', text: JSON.stringify(await client.getTestCase(id), null, 2) }],
  }));

  server.tool('helix_list_test_runs', 'List test runs.', {
    projectId: z.string(),
  }, readOnlyAnnotations, async ({ projectId }: { projectId: string }) => ({
    content: [{ type: 'text', text: JSON.stringify(await client.listTestRuns(projectId), null, 2) }],
  }));
}
