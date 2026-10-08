import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { siteName } from "./lib/site";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draftDate: z.coerce.date().optional(),
    pubDate: z.coerce.date(),
    recentDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    author: z.string().default(siteName),
  }),
});

export const collections = { posts };
