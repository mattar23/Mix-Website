// Prefixes a public asset path with the base path, so the site also works
// from a GitHub project URL such as /Mix-Website/ before the domain is
// connected. next/link handles this itself; raw src attributes do not.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
