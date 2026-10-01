export const helixToolCatalog = {
  helix_list_projects: {
    category: 'read',
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
  helix_get_issue: {
    category: 'read',
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
  helix_search_issues: {
    category: 'read',
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
  helix_get_requirement: {
    category: 'read',
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
  helix_search_requirements: {
    category: 'read',
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true },
  },
  helix_update_issue: {
    category: 'write',
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false },
  },
  helix_delete_issue: {
    category: 'destructive',
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false },
  },
} as const;
