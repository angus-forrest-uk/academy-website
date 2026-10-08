
import type { APIRoute } from "astro";
import { bibtex } from "@/lib/bibtex";
import { publications } from "@/lib/publications";

// Every paper in src/content/publications.yaml, as one BibTeX file.
export const GET: APIRoute = () =>
  new Response(publications.map(bibtex).join("\n"), {
    headers: { "Content-Type": "application/x-bibtex; charset=utf-8" },
  });
