# Helix ALM MCP Plugin

Production-oriented Model Context Protocol server for Perforce Helix ALM.

## Design goals

- MCP compatible architecture
- Separate read-only, write, and destructive capabilities
- Least privilege by default
- Externalized credentials
- Direct Helix ALM server API integration

## Security model

The plugin runs read-only by default.

```bash
HELIX_ALM_URL=https://your-server
HELIX_ALM_API_KEY=...
HELIX_ALM_ALLOW_WRITES=false
```

Write and destructive capabilities require explicit deployment enablement.

## Tool classes

Read tools:
- projects
- issues
- requirements
- test cases
- test runs

Write tools:
- create/update operations

Destructive tools:
- delete operations

Every MCP tool declares capability annotations:
- `readOnlyHint`
- `destructiveHint`
- `idempotentHint`

## Production roadmap

- Complete Helix REST resource mappings
- Add MCP resources for ALM traceability graphs
- Add integration tests
- Add packaging and deployment artifacts
