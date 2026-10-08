import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { publishedPosts } from "@/lib/posts";
import { email, siteDescription, siteName } from "@/lib/site";

// The posts as an RSS feed, at /feed.xml, for feed readers.
export const GET: APIRoute = async ({ site }) => {
  const posts = await publishedPosts();
  return rss({
    title: siteName,
    description: siteDescription,
    site: site ?? "",
    // The site serves /posts/hello, not /posts/hello/.
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}`,
      // RSS wants an address here, with the name after it in brackets.
      author: `${email} (${post.data.author})`,
    })),
  });
};
