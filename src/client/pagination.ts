export interface Page<T> {
  items: T[];
  next?: string;
}

export async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  let last: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      last = error;
      if (attempt === retries) break;
      await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
    }
  }
  throw last;
}

export async function collectPages<T>(fetchPage: (cursor?: string) => Promise<Page<T>>) {
  const items: T[] = [];
  let cursor: string | undefined;
  do {
    const page = await fetchPage(cursor);
    items.push(...page.items);
    cursor = page.next;
  } while (cursor);
  return items;
}
