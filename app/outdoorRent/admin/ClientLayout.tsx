"use client";

import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { ConfigProvider, message } from "antd";
import enUS from "antd/lib/locale/en_US";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function RentLayout(props: PropsWithChildren) {
  const baseUrl = "/outdoorRent/admin";
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <ConfigProvider locale={enUS}>
      <ProLayout
        menuItemRender={(itemProps, defaultDom, props) => {
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
              name: "user management",
            },
            {
              path: "/equipmentType",
              name: "equipment type management",
            },
          ],
        }}
      >
        <PageContainer>
          {contextHolder}
          {props.children}
        </PageContainer>
      </ProLayout>
    </ConfigProvider>
  );
}
