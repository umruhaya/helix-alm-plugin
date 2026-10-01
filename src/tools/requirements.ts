import { z } from 'zod';
import { readOnlyAnnotations } from './types.js';

export function registerRequirementTools(server: any, client: any) {
  server.tool('helix_list_requirements', 'List Helix ALM requirements.', {
    projectId: z.string(),
  }, readOnlyAnnotations, async ({ projectId }: { projectId: string }) => ({
    content: [{ type: 'text', text: JSON.stringify(await client.listRequirements(projectId), null, 2) }],
  }));

  server.tool('helix_get_requirement', 'Get a Helix ALM requirement.', {
    id: z.string(),
  }, readOnlyAnnotations, async ({ id }: { id: string }) => ({
    content: [{ type: 'text', text: JSON.stringify(await client.getRequirement(id), null, 2) }],
  }));
}
