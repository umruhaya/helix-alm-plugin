# Helix ALM MCP Plugin

Bun + TypeScript MCP server scaffold for Perforce Helix ALM.

## Design goals

- MCP 2.0 compatible architecture
- Separate read-only and write capabilities
- Least privilege by default
- Externalized credentials
- No GUI automation; uses Helix ALM server APIs

## Tool classes

Read tools:
- list projects
- search issues
- fetch requirements
- fetch test cases

Write tools:
- create/update issues
- submit test results

Destructive operations should be disabled unless explicitly enabled by deployment policy.
