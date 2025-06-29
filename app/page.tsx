import { uniq } from "lodash";
// import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Posts from "../components/Posts";
import { getSortedPostsData } from "../lib/post";

const name = "Winnie Xiong";

export default async function Page() {
  const allPostsData = getSortedPostsData();
  const allTags = uniq(
    allPostsData
      .map((item) => item.tags ?? [])
      .filter(Boolean)
      .flat(),
  );
  return (
    <>
      <header>
        {/* <Image
          priority
          src="/images/avatar.png"
          height={144}
          width={144}
          alt={name}
          className="m-auto"
        /> */}
        <h1 className="text-3xl font-bold text-center">{name}</h1>
      </header>
      <section className="mx-auto max-w-2xl">
        <div className="text-2xl font-bold">Some Demo</div>
        <div className="flex flex-wrap gap-2">
          <Card className="w-80 p-0">
            <CardHeader>
              <CardTitle>
                <Link href="/cv.html" className="p-0 text-lg hover:underline">
                  My CV
                </Link>
              </CardTitle>
              <CardDescription>My personal cv.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-80 p-0">
            <CardHeader>
              <CardTitle>
                <Link
                  href="/games/stepbystep/index.html"
                  className="p-0 text-lg hover:underline"
                >
                  One Step Two Step
                </Link>
              </CardTitle>
              <CardDescription>A demo game using Cocos engine.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-80 p-0">
            <CardHeader>
              <CardTitle>
                <Link
                  href="/outdoorRent"
                  className="p-0 text-lg hover:underline"
                >
                  oudoorRent
                </Link>
              </CardTitle>
              <CardDescription>
                Frontend was build with help from AI. Backend was build on
                ASP.NET core.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-80 p-0">
            <CardHeader>
              <CardTitle>
                <Link
                  href="http://www.weirdzoo.fun"
                  className="p-0 text-lg hover:underline"
                  target="_blank"
                >
                  WeirdZoo
                </Link>
              </CardTitle>
              <CardDescription>
                A multiple players online game based on MERN stack.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
      <Posts allPostsData={allPostsData} allTags={allTags} />
    </>
  );
}
