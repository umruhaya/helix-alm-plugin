import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { loadConfig } from './config.js';
import { HelixClient } from './client/helix-client.js';
import { assertWriteEnabled } from './security/policy.js';

const config = loadConfig();
const client = new HelixClient(config);

const server = new McpServer({ name: 'helix-alm', version: '0.2.0' });

server.tool('helix_list_projects', 'List Helix ALM projects.', {}, { readOnlyHint: true, destructiveHint: false }, async () => ({
  content: [{ type: 'text', text: JSON.stringify(await client.listProjects(), null, 2) }],
}));

server.tool('helix_get_issue', 'Get issue by id.', { id: z.string() }, { readOnlyHint: true, destructiveHint: false }, async ({ id }) => ({
  content: [{ type: 'text', text: JSON.stringify(await client.getIssue(id), null, 2) }],
}));

server.tool('helix_create_issue', 'Create issue. Disabled unless explicitly enabled.', { title: z.string() }, { readOnlyHint: false, destructiveHint: false }, async () => {
  assertWriteEnabled();
  return { content: [{ type: 'text', text: 'Create issue endpoint not enabled in this release.' }] };
});

await server.connect(new StdioServerTransport());
