import type { Metadata } from "next";
import NotFound, { metadata as notFoundMetadata } from "@/app/not-found";
import { getAllPosts, getPost } from "@/lib/content";
import { formatDate } from "@/lib/format";

// Every post is generated at build time. Any other slug is not emitted at all, so on
// CloudFront it falls through to /404.html via the 403 mapping (ADR-007).
export const dynamicParams = false;

// Static export fails the build when generateStaticParams() returns nothing, which happens
// when every post is a draft (ADR-006). Then this one placeholder is emitted instead, and it
// renders the 404 page, marked noindex. The underscore can never match a real post's file
// name. It renders <NotFound /> directly: notFound() here would export an empty page body
// and draw the 404 only once JavaScript runs.
const NO_POSTS = "_no-posts";

export function generateStaticParams() {
  const params = getAllPosts().map((post) => ({ slug: post.slug }));
  return params.length > 0 ? params : [{ slug: NO_POSTS }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (slug === NO_POSTS) return { ...notFoundMetadata, robots: { index: false } };
  const post = await getPost(slug);
  return { title: post.title, description: post.description };
}

// Unstyled on purpose; styling is GS-25.
export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  if (slug === NO_POSTS) return <NotFound />;
  const post = await getPost(slug);

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <p>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.draft && <strong> Draft (preview only)</strong>}
        </p>
        {post.image && (
          // Plain <img>: there is no image optimizer in a static export (ADR-005), so
          // photos are resized by hand before they are added.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image.src} alt={post.image.alt} />
        )}
        {/* HTML comes from our own Markdown, sanitised by remark-html in lib/content.ts. */}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </main>
  );
}
