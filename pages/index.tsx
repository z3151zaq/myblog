import { uniq } from "lodash";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/post";
import utilStyles from "../styles/utils.module.css";

type Props = {
  allPostsData: ReturnType<typeof getSortedPostsData>;
  allTags: string[];
};
export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
      allTags: uniq(
        allPostsData
          .map(item => item.tags)
          .filter(Boolean)
          .flat()
      )
    }
  };
};

export default function Home({ allPostsData, allTags }: Props) {
  const [filter, setFilter] = useState("");
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>一个肥宅lol</p>
      </section>
      <section className={utilStyles.headingMd}>
        <Link href={`/games/stepbystep/index.html`}>一步两步</Link>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <a onClick={() => setFilter("")}>all</a>
        {allTags?.map(i => (
          <a onClick={() => setFilter(i)} key={i}>
            {i}
          </a>
        ))}
        <ul className={utilStyles.list}>
          {allPostsData
            .filter(post => (filter ? post.tags?.includes(filter) : true))
            .map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
        </ul>
      </section>
    </Layout>
  );
}
