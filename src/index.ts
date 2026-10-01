import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { loadConfig } from './config.js';
import { HelixClient } from './client/helix-client.js';
import { assertWriteEnabled } from './security/policy.js';
import { readOnlyAnnotations, writeAnnotations } from './tools/types.js';
import { registerRequirementTools } from './tools/requirements.js';
import { registerTestTools } from './tools/tests.js';
import { registerIssueTools } from './tools/issues.js';
import { registerUserTools } from './tools/users.js';

const config = loadConfig();
const client = new HelixClient(config);
const server = new McpServer({ name: 'helix-alm', version: '0.3.0' });

server.tool('helix_list_projects', 'List Helix ALM projects.', {}, readOnlyAnnotations, async () => ({
  content: [{ type: 'text', text: JSON.stringify(await client.listProjects(), null, 2) }],
}));

server.tool('helix_get_issue', 'Get issue by id.', { id: z.string() }, readOnlyAnnotations, async ({ id }) => ({
  content: [{ type: 'text', text: JSON.stringify(await client.getIssue(id), null, 2) }],
}));

server.tool('helix_create_issue', 'Create issue. Requires explicit write enablement.', { title: z.string(), description: z.string().optional() }, writeAnnotations, async () => {
  assertWriteEnabled();
  return { content: [{ type: 'text', text: 'Create issue endpoint pending API mapping.' }] };
});

registerRequirementTools(server, client);
registerTestTools(server, client);
registerIssueTools(server, client);
registerUserTools(server, client);

await server.connect(new StdioServerTransport());
