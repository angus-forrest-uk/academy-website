import { z } from "astro/zod";
import raw from "@/content/links.yaml?raw";
import { readYaml } from "@/lib/yaml";

// The fields of an entry in src/content/links.yaml, described there.
const link = z
  .object({
    title: z.string(),
    url: z.url(),
    kind: z.string(),
    note: z.string().optional(),
  })
  .strict();

const group = z
  .object({
    group: z.string(),
    links: z.array(link).min(1),
  })
  .strict();

export type Link = z.infer<typeof link>;

/** The groups of links, in the order they come in the file. */
export const linkGroups = readYaml(raw, z.array(group), "src/content/links.yaml");
