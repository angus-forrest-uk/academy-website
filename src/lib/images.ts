export const PUBLIC_IMAGE_BASE = "/images/";

export function isBareImageRef(url: string): boolean {
  if (!url) return false;
  if (URL.canParse(url)) return false;
  if (url.startsWith("/") || url.startsWith("#")) return false;
  if (url.startsWith("./") || url.startsWith("../")) return false;
  return true;
}

export function toPublicImagePath(url: string, origin = ""): string {
  return `${origin}${PUBLIC_IMAGE_BASE}${url}`;
}

const INLINE_IMAGE =
  /!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\s*\)/g;

export function rewriteMarkdownImages(source: string, origin = ""): string {
  return source.replace(INLINE_IMAGE, (match, alt, url, title = "") =>
    isBareImageRef(url) ? `![${alt}](${toPublicImagePath(url, origin)}${title})` : match,
  );
}
