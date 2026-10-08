import type { APIRoute, GetStaticPaths } from "astro";
import { bibtex } from "@/lib/bibtex";
import { publications, type Publication } from "@/lib/publications";

// One .bib file per paper: what the export link downloads when the citation
// cannot be copied to the clipboard instead.
export const getStaticPaths: GetStaticPaths = () =>
  publications.map((publication) => ({
    params: { bibcode: publication.bibcode },
    props: { publication },
  }));

export const GET: APIRoute<{ publication: Publication }> = ({ props }) =>
  new Response(bibtex(props.publication), {
    headers: { "Content-Type": "application/x-bibtex; charset=utf-8" },
  });
