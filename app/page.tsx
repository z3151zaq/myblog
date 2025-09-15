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
  const programs = [
    {
      name: "My CV",
      desc: "My personal cv.",
      url: "/cv.html",
    },
    {
      name: "One Step Two Step",
      desc: "A demo game using Cocos engine.",
      url: "/games/stepbystep/index.html",
    },
    {
      name: "outdoorRent",
      desc: "Frontend was build with help from AI. Backend was build on ASP.NET core.",
      url: "/outdoorRent",
    },
    {
      name: "outdoorRent admin",
      desc: "The admin of outdoorRent.",
      url: "/outdoorRent/admin",
    },
    {
      name: "WeirdZoo",
      desc: "A multiple players online game based on MERN stack.",
      url: "https://github.com/z3151zaq/732groupwork",
    },
    {
      name: "OnlineMeeting",
      desc: "An online meeting app using WebRTC and SignalR.",
      url: "/onlineMeeting",
      extra: (
        <Link
          href="/posts/OnlineMeeting doc"
          className="ml-4 p-0 text-lg hover:underline text-blue-600"
        >
          {"[doc]"}
        </Link>
      ),
    },
  ];
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
          {programs.map((program) => (
            <Card className="w-80 p-0" key={program.name}>
              <CardHeader>
                <CardTitle>
                  <Link
                    href={program.url}
                    className="p-0 text-lg hover:underline"
                  >
                    {program.name}
                  </Link>
                  {program.extra}
                </CardTitle>
                <CardDescription>{program.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
      <Posts allPostsData={allPostsData} allTags={allTags} />
    </>
  );
}
