
import type { Publication } from "@/lib/publications";

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

const LATEX: Record<string, string> = {
  "Ō": "{\\=O}",
  "ō": "{\\=o}",
  "–": "{\\textendash}",
  "—": "{\\textemdash}",
  "’": "'",
  "‘": "`",
  "“": "``",
  "”": "''",
  "ý": "{\\'y}",
  "&": "\\&",
};

const UNSAFE = new RegExp(`[${Object.keys(LATEX).join("")}]`, "g");
const latex = (text: string) => text.replace(UNSAFE, (char) => LATEX[char]);

export function bibtex(publication: Publication): string {
  const { bibcode, doi, kind, title, venue, year, month, volume, issue, page, primaryClass, authors } = publication;

  const fields: [string, string][] = [
    ["author", `{${authors.map(({ given, family }) => `{${latex(family)}}, ${latex(given)}`).join(" and ")}}`],
    ["title", `"{${latex(title)}}"`],
    [kind === "proceedings" ? "booktitle" : "journal", `{${latex(venue)}}`],
    ["year", String(year)],
    ["month", MONTHS[month - 1]],
  ];
  if (volume) fields.push(["volume", `{${volume}}`]);
  if (issue) fields.push(["number", `{${issue}}`]);
  fields.push(
    ["eid", `{${page}}`],
    ["pages", `{${page}}`],
    ["doi", `{${doi}}`],
  );
  if (kind === "preprint") {
    fields.push(["archivePrefix", "{arXiv}"], ["eprint", `{${page.replace(/^arXiv:/, "")}}`]);
    if (primaryClass) fields.push(["primaryClass", `{${primaryClass}}`]);
  }
  fields.push([
    "adsurl", `{https://ui.adsabs.harvard.edu/abs/${bibcode}}`,
  ]);

  const width = Math.max(...fields.map(([name]) => name.length));
  const body = fields.map(([name, value]) => `${name.padStart(width + 2)} = ${value}`).join(",\n");
  return `@${kind === "proceedings" ? "INPROCEEDINGS" : "ARTICLE"}{${bibcode},\n${body}\n}\n`;
}
