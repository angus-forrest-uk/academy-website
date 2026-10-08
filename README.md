# Academy Website Template

This is a simple template for an academic personal website.

I have tried to keep the structure of the website simple, so that
anyone with the ability to utilise an editor, a simple command line,
and git, will be able to easily maintain and build upon it.

## Explanation

The easiest to maintain websites are static. Static in this context
means that the files that correspond to the website's pages and content
are immutable, and don't change depending on a visitor's interaction.
When we build a website, we are making a brochure that doesn't change
once built, we create a distribution folder that can then in essence be
where visitors "request" the files from.

Thankfully there are some niceties that have been developed to allow
for an easy writing and development stage, where we either add content
to the website or are changing the layout of the website. In this case
we can utilise a software framework called `astro` that provides a `dev`
environment that launches a local version of the website to see changes
to content in real time. How neat!

To add content and artifacts, the easiest and most maintainable is to
utilise text formats. In our case we should focus upon `markdown` a
standard that anyone familiar with GitHub will be well acquainted with.
In principle we can extend the functionality of `markdown` as well to
add new shorthand commands, similar to `latex`, where the markdown renderer
swaps out the macros for the intended visual or component.

## Structure

For academic folk, which this template is targeted towards, your main goal
of having a website is a way to document your research, contact information,
personal writings, images, relevant offsite links, and CV/Resume. This template
gives an example website for how to structure the content for all these
functions. However for the CV/Resume in particular, I have created a separate
repository [academy-resume](https://github.com/angus-forrest-uk/academy-resume)
documenting how to utilise `Typst`, a new alternative to `latex` to create a
Resume/CV. 

## Installation

To start your development environment for your website use the commands below.
This should create a folder called `academy-website` move you into it, install
the `bun` runner (after the install you usually need to restart your terminal and
navigate back), install the template's dependencies, and then start up the
development environment. You should then be able to navigate to the template's root
folder in your preferred editor. I would highly recommend
[vscode](https://code.visualstudio.com/) if you are not familiar with another code
editor. If everything has gone well, you should then be able to find the local template
website at [http://localhost:4321](http://localhost:4321), if that doesn't work, look
at the output from the `bun run dev` as that may show a different local URL if you are
running other local services like another Astro project.

```bash
git clone https://github.com/angus-forrest-uk/academy-website && cd academy-website
curl -fsSL https://bun.sh/install | bash
bun install
bun run dev
```

## Add a Post

Go to the `src/content/posts` folder and create a new post. I have included a
`template.md` to showcase how you could possibly structure a post on the website.
I highly recommend copying the `template.md` for the first couple of posts so that you
can learn the format of a post. You'll be able to recite the structure in no time! 
The post markdown also includes something that you may have not encountered before,
frontmatter. Frontmatter is a key value list at the start of a markdown file that
gets read by the renderer for important information about the post, this could include
information like initial publication date, most recent update date, search engine
optimisation information like title and descriptions, and whether the post is a draft
or is a completed document. Frontmatter key value lists can be extended within the
renderer easily. Have a look if you are interested in adding something like a hero
image or an author field. The schema file can be found at `src/TODO`. When choosing
your filenames it is important to pick sensible ones, as they are used as part of the
post's URL on the live site. You should keep explicit language out of your filenames!

```markdown
---
title: "Template Post"
draftDate: 2026-10-08
pubDate: 2026-10-31
recentDate: 2026-10-31
description: "Halloween 2026, Spooky fun!"
draft: true
---

```


## Build

Once you are happy with your alterations you need to build your website! This is where
the website turns into a series of static files that can be moved onto a web hosting
platform and be served to your users. These static files take the form of `HTML`, `css`,
`javascript`, `images` (`png`,`avif`,`webp`), and `audio` (`wav`,`ogg`,`mp3`) files.
To build the static files use the `bun` runner, it will create a folder called `dist/`
at the root of the project. This step is automated in the deployment workflow so you
don't need to do it manually if you are deploying to GitHub Pages, however if you are
using another hosting solution, dist/ is the folder you copy over, and index.html is
the entry into the website.

```bash
bun run build  
```


## Deployment

The easiest way once you are happy with your website is to create a GitHub Pages website
that utilises your GitHub username. For example my GitHub username is `angus-forrest-uk`
so my personal website hosted on GitHub Pages should be `angus-forrest-uk.github.io`.
You can find my [example personal website](https://angus-forrest-uk.github.io),
however my [actual personal website](https://angusforrest.com) uses a much more
extensively customised Astro build (Open an issue if you'd like a feature added).
To deploy your website to GitHub Pages, you will need to create a repo located at
your website's URL e.g. `angus-forrest-uk/angus-forrest-uk.github.io`. This repo has
GitHub workflows which will run when you create a repo with this repo name structure,
that will attempt to build and deploy to your GitHub Pages. If everything works
correctly, once you create and push to the GitHub repo, you should be able to navigate
to your chosen personal website. How auto-magic!

To do all this please replace `CHANGEME` with your GitHub username. Create an empty
repo called `USERNAME.github.io` on GitHub before running these commands. You must also
enable GitHub pages in the GitHub repo before the personal website becomes live.
In the repo, go to Settings -> Pages -> Source and choose GitHub Actions.

```bash
export USERNAME=CHANGEME

git remote set-url origin "https://github.com/${USERNAME}/${USERNAME}.github.io.git"
sed -i.bak -E "s|site: *['\"][^'\"]*['\"]|site: 'https://${USERNAME}.github.io'|" astro.config.mjs && rm astro.config.mjs.bak
git add astro.config.mjs && git commit -m "Set site URL" && git push -u origin main
```

## License

Released under the MIT License, see LICENSE.
