"use client";

import { PageContainer, ProLayout } from "@ant-design/pro-components";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function RentLayout(props: PropsWithChildren) {
  const baseUrl = "/outdoorRent/admin";
  return (
    <ProLayout
      menuItemRender={(itemProps, defaultDom, props) => {
        console.log("@@@@", props);
        return <Link href={`${baseUrl}${itemProps.path}`}>{defaultDom}</Link>;
      }}
      route={{
        path: "/outdoorRent/admin",
        name: "首页",
        component: "./Welcome",
        icon: "home",
        routes: [
          {
            path: "/dashboard",
            name: "仪表盘",
            icon: "dashboard",
          },
          {
            path: "/user",
            name: "用户",
            icon: "user",
          },
        ],
      }}
    >
      <PageContainer>{props.children}</PageContainer>
    </ProLayout>
  );
}
