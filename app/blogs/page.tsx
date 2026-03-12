import { getAllPosts } from "@/lib/mdx";
import BlogList from "./BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal — M UMAIR KHAN",
  description: "Thoughts and insights on full-stack engineering, brutalist design, and cinematic movement.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  
  return <BlogList posts={posts} />;
}
