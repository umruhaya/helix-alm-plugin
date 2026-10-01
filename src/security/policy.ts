export function assertWriteEnabled() {
  if (process.env.HELIX_ALM_ALLOW_WRITES !== 'true') {
    throw new Error('Write operations are disabled. Set HELIX_ALM_ALLOW_WRITES=true explicitly.');
  }
}
