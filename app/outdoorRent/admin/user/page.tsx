"use client";

import { ProColumnType, ProTable } from "@ant-design/pro-components";

const IndexPage = () => {
  const columns: ProColumnType<any>[] = [
    { title: "email", dataIndex: "email" },
  ];
  return <ProTable columns={columns}>welcome</ProTable>;
};

export default IndexPage;
