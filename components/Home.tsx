"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  allPostsData: any[];
  allTags: string[];
};

export default function Home({ allPostsData, allTags }: Props) {
  const [filter, setFilter] = useState("all");
  const router = useRouter();
  return (
    <section className="mt-4">
      <div className="flex gap-5">
        <span className="text-2xl font-bold">My Articles</span>
        <Tabs onValueChange={setFilter} value={filter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {allTags?.map((i) => (
              <TabsTrigger value={i} key={i}>
                {i}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Separator className="my-2" />
      {allPostsData
        .filter((post) =>
          filter !== "all" ? post.tags?.includes(filter) : true,
        )
        .map(({ id, date, title }) => (
          <li key={id}>
            <Button
              onClick={() => router.push(`/posts/${id}`)}
              variant="link"
              className="p-0 text-lg"
            >
              {title}
            </Button>

            <br />
            <small>
              <time dateTime={date}>{date}</time>
            </small>
            <Separator className="my-2" />
          </li>
        ))}
    </section>
  );
}
