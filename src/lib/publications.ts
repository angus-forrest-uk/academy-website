
import { z } from "astro/zod";
import raw from "@/content/publications.yaml?raw";
import { dateText, moment, parts } from "@/lib/dates";
import { readYaml } from "@/lib/yaml";

const author = z
  .object({
    given: z.string(),
    family: z.string(),
    orcid: z
      .url()
      .regex(/^https:\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/, "Give the full https://orcid.org/ address.")
      .optional(),
  })
  .strict();

const paper = z
  .object({
    bibcode: z.string(),
    date: dateText,
    kind: z.enum(["article", "proceedings", "preprint"]),
    title: z.string(),
    venue: z.string(),
    volume: z.coerce.string().optional(),
    issue: z.coerce.string().optional(),
    page: z.coerce.string(),
    primaryClass: z.string().optional(),
    doi: z.string(),
    authors: z.array(author).min(1),
    abstract: z.string(),
  })
  .strict();

export type Author = z.infer<typeof author>;

export type Publication = z.infer<typeof paper> & { year: number; month: number; day?: number };

export const scixUrl = ({ bibcode }: Publication) => `https://scixplorer.org/abs/${bibcode}/abstract`;

export const doiUrl = ({ doi }: Publication) => `https://doi.org/${doi}`;

export const reference = ({ kind, venue, volume, page, year }: Publication) =>
  (kind === "preprint" ? page : [venue, volume, page].filter(Boolean).join(" ")) + ` (${year})`;

export const publications: Publication[] = readYaml(raw, z.array(paper), "src/content/publications.yaml")
  .map((entry) => ({ ...entry, ...parts(entry.date) }))
  .sort((a, b) => moment(b.date) - moment(a.date));
