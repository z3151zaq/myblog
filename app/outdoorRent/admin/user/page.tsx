"use client";

import { ProColumnType, ProTable } from "@ant-design/pro-components";
import {
  ActionType,
  ModalForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, message, Space, Tag } from "antd";
import { useRef } from "react";

import { createNewUser, getUsers, UserRole } from "@/services/outdoorService";

const IndexPage = () => {
  const [messageApi, ctx] = message.useMessage();
  const tableRef = useRef<ActionType>();
  const columns: ProColumnType<any>[] = [
    { title: "email", dataIndex: "email" },
    { title: "name", dataIndex: "name" },
    {
      title: "roles",
      dataIndex: "roles",
      render: (_, record) => {
        return record.roles.map((role: string) => (
          <Tag key={role}>{UserRole[role]}</Tag>
        ));
      },
    },
    {
      title: "operation",
      valueType: "option",
      render: (text, record, _, action) => (
        <Space>
          <a key="edit" onClick={() => console.log("Edit user", record)}>
            grant admin
          </a>
          <a key="edit" onClick={() => console.log("Edit user", record)}>
            edit
          </a>
          <a key="delete" onClick={() => console.log("Delete user", record)}>
            delete
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      {ctx}
      <ProTable
        actionRef={tableRef}
        headerTitle={
          <ModalForm
            title="add a new type"
            trigger={<Button type="primary">Add a new user</Button>}
            modalProps={{
              destroyOnClose: true,
              width: 400,
            }}
            onFinish={async (values) => {
              const res = await createNewUser({
                ...values,
                code: values.email,
                roles: values.roles.map((role) => Number(role)),
                age: 18,
              });
              if (res.success) {
                messageApi.success("Create new user successfully");
                tableRef.current?.reload();
                return true;
              }
              return false;
            }}
          >
            <ProFormText
              name="name"
              label="user name"
              rules={[{ required: true }]}
            />
            <ProFormText
              name="email"
              label="email"
              rules={[{ required: true }]}
            />
            <ProFormSelect
              name="roles"
              label="roles"
              fieldProps={{ mode: "multiple" }}
              rules={[{ required: true }]}
              valueEnum={{
                [UserRole.Admin]: "admin",
                [UserRole.Manager]: "manager",
                [UserRole.Normal]: "normal",
              }}
            />
          </ModalForm>
        }
        columns={columns}
        request={async () => {
          const res = await getUsers();
          return {
            data: res.data,
            total: res.data.length,
            success: true,
          };
        }}
      />
    </>
  );
};

export default IndexPage;
