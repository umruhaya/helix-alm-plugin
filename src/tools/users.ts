import { z } from 'zod';
import { readOnlyAnnotations } from './types.js';

export function registerUserTools(server: any, client: any) {
  server.tool('helix_get_user', 'Get Helix ALM user information.', {
    id: z.string(),
  }, readOnlyAnnotations, async ({ id }: { id: string }) => ({
    content: [{ type: 'text', text: JSON.stringify(await client.getUser(id), null, 2) }],
  }));
}
