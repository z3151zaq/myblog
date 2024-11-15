import dynamic from "next/dynamic";
import Head from "next/head";

import { getAllPostIds } from "@/lib/post";

import Art, { metadata } from "./ha.mdx";

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map(i => i.params);
}

export default async function Post({ params }) {
  const id = (await params).id;
  const Article = dynamic(() => import(`@/posts/${decodeURIComponent(id)}.md`));
  console.log("@@@", Article.metadata, metadata);
  return (
    <>
      
      <article>
        <Article />
      </article>
    </>
  );
}
