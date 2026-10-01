import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'helix-alm',
  version: '0.1.0',
});

// Read-only tools. These should be backed by a Helix ALM REST client.
server.tool(
  'helix_list_projects',
  'List accessible Helix ALM projects (read only).',
  {},
  { readOnlyHint: true, destructiveHint: false },
  async () => ({
    content: [{ type: 'text', text: 'Not implemented: connect Helix REST client.' }],
  }),
);

server.tool(
  'helix_get_issue',
  'Fetch an issue by id (read only).',
  { id: z.string() },
  { readOnlyHint: true, destructiveHint: false },
  async ({ id }) => ({
    content: [{ type: 'text', text: `Issue lookup placeholder: ${id}` }],
  }),
);

// Write tools are intentionally separated and should require explicit enablement.
server.tool(
  'helix_create_issue',
  'Create a Helix ALM issue (write operation).',
  { title: z.string(), description: z.string().optional() },
  { readOnlyHint: false, destructiveHint: false },
  async () => ({
    content: [{ type: 'text', text: 'Write operations disabled until configured.' }],
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
