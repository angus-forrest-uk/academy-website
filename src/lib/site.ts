export const siteName = "Your Name";

export const siteDescription = "Researcher in your field. Publications, writing and contact details.";

export const email = "you@example.com";

export const profiles: { label: string; href: string; icon: "orcid" | "github" | "linkedin" | "link" }[] = [
  { label: "ORCID", href: "https://orcid.org/0000-0000-0000-0000", icon: "orcid" },
  { label: "GitHub", href: "https://github.com/angus-forrest-uk", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
];


export interface Section {
  href: string;
  label: string;
  summary: string;
}

export const sections: Section[] = [
  {
    href: "/about",
    label: "About",
    summary: "Who I am, what I work on, and how to get in touch.",
  },
  {
    href: "/research",
    label: "Research",
    summary: "My publications, each with its abstract, a link to its record and a BibTeX citation to copy.",
  },
  {
    href: "/posts",
    label: "Posts",
    summary: "Longer writing: notes on papers, talks, methods and whatever else seemed worth writing down.",
  },
  {
    href: "/links",
    label: "Links",
    summary: "Talks, code, data and other places my work lives off this site.",
  },
  {
    href: "/cv",
    label: "CV",
    summary: "My curriculum vitae.",
  },
];

export const pagePath = (pathname: string) => pathname.replace(/\.html$/, "").replace(/\/(index)?$/, "") || "/";

export function sectionOf(pathname: string): Section | undefined {
  const path = pagePath(pathname);
  return sections.find(({ href }) => path === href || path.startsWith(`${href}/`));
}
