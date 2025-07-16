"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";

export default function NavigateButton(
  props: PropsWithChildren<{ target: string }>,
) {
  const router = useRouter();
  const { target } = props;

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => router.push(target)}
    >
      {props.children}
    </Button>
  );
}
