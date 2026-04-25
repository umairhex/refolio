import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import BlogArticleClient from "./BlogArticleClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/app/components/ui/MDXComponents";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs
    .filter((slug: string) => slug.endsWith(".mdx"))
    .map((slug: string) => ({ slug: slug.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.summary,
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  return (
    <BlogArticleClient post={post}>
      <MDXRemote
        source={post.content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [
              [
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                rehypePrettyCode as any,
                {
                  theme: "vitesse-dark",
                  keepBackground: false,
                },
              ],
            ],
          },
        }}
      />
    </BlogArticleClient>
  );
}
