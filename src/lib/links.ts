export interface ResolvedLink {
  href: string;
  external: boolean;
}

export function resolveLink(value: string | null | undefined): ResolvedLink | null {
  const v = value?.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return { href: v, external: true };
  if (v.startsWith("/") && !v.startsWith("//")) return { href: v, external: false };
  return null;
}
