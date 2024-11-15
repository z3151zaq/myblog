import { uniq } from "lodash";
import Image from "next/image";
import Link from "next/link";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import Home from "../components/Home";
import { getSortedPostsData } from "../lib/post";

const name = "熊熊熊熊熊🐻";

export default async function Page() {
  const allPostsData = getSortedPostsData();
  const allTags = uniq(
    allPostsData
      .map(item => item.tags ?? [])
      .filter(Boolean)
      .flat()
  );
  return (
    <>
      <header>
        <Image priority src='/images/avatar.png' height={144} width={144} alt={name} className='m-auto' />
        <h1 className='text-3xl font-bold text-center'>{name}</h1>
      </header>
      <section>
        <div className='text-2xl font-bold'>Some Demo</div>
        <div className='flex gap-4'>
          <Card className='w-1/2 p-0'>
            <CardHeader>
              <CardTitle>
                <Link href='/games/stepbystep/index.html' className='p-0 text-lg hover:underline'>
                  One Step Two Step
                </Link>
              </CardTitle>
              <CardDescription>A demo game using Cocos engine.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
      <Home allPostsData={allPostsData} allTags={allTags} />
    </>
  );
}
