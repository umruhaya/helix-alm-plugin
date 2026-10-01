# Helix ALM MCP Plugin

MCP server for Perforce Helix ALM built with Bun and TypeScript.

> ⚠️ **Development status:** This project is currently intended for local development and testing only. It is **not production ready**. Do not deploy it with production Helix ALM credentials or expose it to untrusted users until authentication, deployment, auditing, and hardening work is complete.

## Design goals

- MCP compatible architecture
- Separate read-only, write, and destructive capabilities
- Least privilege by default
- Externalized credentials
- Direct Helix ALM server API integration

## Local development setup

### Requirements

Install:

- Bun (latest stable)
- Access to a Helix ALM Server with API access enabled
- A Helix ALM API key or test account credentials

### Install dependencies

```bash
bun install
```

### Configure environment variables

Create a local environment file:

```bash
cp .env.example .env
```

Configure:

```bash
HELIX_ALM_URL=https://your-helix-alm-server
HELIX_ALM_API_KEY=your-api-key
HELIX_ALM_ALLOW_WRITES=false
HELIX_ALM_TIMEOUT_MS=10000
```

For local testing, keep writes disabled unless you are intentionally testing write operations.

### Run the MCP server

Start the server:

```bash
bun run src/index.ts
```

The server communicates through MCP stdio transport. Configure your MCP client (Claude Desktop, Claude Code, Codex-compatible clients, or another MCP host) to launch this process.

Example MCP configuration:

```json
{
  "mcpServers": {
    "helix-alm": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/helix-alm-plugin/src/index.ts"],
      "env": {
        "HELIX_ALM_URL": "https://your-helix-alm-server",
        "HELIX_ALM_API_KEY": "your-api-key",
        "HELIX_ALM_ALLOW_WRITES": "false"
      }
    }
  }
}
```

## Security model

The plugin runs read-only by default.

```bash
HELIX_ALM_ALLOW_WRITES=false
```

Write and destructive capabilities require explicit deployment enablement.

Credentials should never be provided as MCP tool arguments. Use environment variables for local development and a managed secret provider for future hosted deployments.

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
- Add managed authentication support
- Add audit logging
