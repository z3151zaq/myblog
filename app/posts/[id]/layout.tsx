// import "./atom-one-dark.css";

import "highlight.js/styles/atom-one-dark.css";

import Link from "next/link";
import React from "react";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <>
      <div className="mx-auto max-w-4xl prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
        <div>
          <Link href="/">←Back to home</Link>
        </div>
        {children}
      </div>
    </>
  );
}
