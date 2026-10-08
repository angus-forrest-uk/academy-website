
import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export function isPublished(post: Post, now: Date = new Date()): boolean {
  if (import.meta.env.DEV) return true;
  return !post.data.draft && post.data.pubDate.getTime() <= now.getTime();
}

export async function publishedPosts(): Promise<Post[]> {
  const posts = (await getCollection("posts")).filter((post) => isPublished(post));
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export const isHidden = (post: Post, now: Date = new Date()) =>
  post.data.draft || post.data.pubDate.getTime() > now.getTime();

const LONG = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const longDate = (date: Date) => LONG.format(date);

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
