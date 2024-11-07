import { uniq } from "lodash";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/post";
// import utilStyles from "../styles/utils.module.css";

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
  const [filter, setFilter] = useState("all");
  const router = useRouter();
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <div className='text-3xl font-bold'>hello world</div> */}
      <section>
        <div className='text-2xl font-bold'>Some Demo</div>
        <div className='flex gap-4'>
          <Card className='w-1/2 p-0'>
            <CardHeader>
              <CardTitle>
                <Button onClick={() => router.push("/games/stepbystep/index.html")} variant='link' className='p-0 text-lg'>
                  One Step Two Step
                </Button>
              </CardTitle>
              <CardDescription>A demo game using Cocos engine.</CardDescription>
            </CardHeader>
          </Card>
          {/* <Card className='w-1/2 p-0'>
            <CardHeader>
              <CardTitle>
                <Button onClick={() => router.push("/games/stepbystep/index.html")} variant='link' className='p-0'>
                  One Step Two Step
                </Button>
              </CardTitle>
              <CardDescription>A demo game using Cocos engine.</CardDescription>
            </CardHeader>
          </Card> */}
        </div>
      </section>

      {/* <section>
        <Link href={`/games/stepbystep/index.html`}>一步两步</Link>
      </section> */}
      <section className='mt-4'>
        <div className='flex gap-5'>
          <span className='text-2xl font-bold'>My Articles</span>
          <Tabs onValueChange={setFilter} value={filter}>
            <TabsList>
              <TabsTrigger value='all'>All</TabsTrigger>
              {allTags?.map(i => (
                <TabsTrigger value={i} key={i}>
                  {i}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <ul>
          <Separator className='my-2' />
          {allPostsData
            .filter(post => (filter !== "all" ? post.tags?.includes(filter) : true))
            .map(({ id, date, title }) => (
              <>
                <li key={id}>
                  <Button onClick={() => router.push(`/posts/${id}`)} variant='link' className='p-0 text-lg'>
                    {title}
                  </Button>

                  <br />
                  <small>
                    <Date dateString={date} />
                  </small>
                  <Separator className='my-2' />
                </li>
              </>
            ))}
        </ul>
      </section>
    </Layout>
  );
}
