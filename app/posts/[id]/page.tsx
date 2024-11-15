import dynamic from "next/dynamic";

import { getAllPostIds } from "@/lib/post";


export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map(i => i.params);
}

export default async function Post({ params }) {
  const id = (await params).id;
  const Article = dynamic(() => import(`@/posts/${decodeURIComponent(id)}.md`));
  return (
      <article>
        <Article />
      </article>
  );
}
