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

import { getEquipmentList, IEquipmentModel } from "@/services/outdoorService";

const IndexPage = () => {
  const [messageApi, ctx] = message.useMessage();
  const tableRef = useRef<ActionType>();
  const columns: ProColumnType<IEquipmentModel>[] = [
    { title: "type", dataIndex: "typeName" },
    { title: "availability", dataIndex: "availability" },
    { title: "price/day", dataIndex: "pricePerDay" },
    { title: "description", dataIndex: "descriptions" },
    { title: "condition", dataIndex: "condition" },

    {
      title: "operation",
      valueType: "option",
      render: (text, record) => (
        <Space>
          <a
            key="grant"
            // onClick={async () => {
            //   const res = await grantUserAdmin({
            //     id: record.id,
            //     roles: [...record.roles, UserRole.Admin],
            //   });
            //   if (res.success) {
            //     messageApi.success("Grant admin successfully");
            //     tableRef.current?.reload();
            //   }
            // }}
          >
            grant admin
          </a>

          <a key="edit" onClick={() => console.log("Edit user", record)}>
            edit
          </a>
          <a
            key="delete"
            // onClick={async () => {
            //   const res = await deleteUser({ id: record.id });
            //   if (res.success) {
            //     messageApi.success("Delete admin successfully");
            //     tableRef.current?.reload();
            //   }
            // }}
          >
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
        // headerTitle={
        //   <ModalForm
        //     title="add a new type"
        //     trigger={<Button type="primary">Add a new user</Button>}
        //     modalProps={{
        //       destroyOnClose: true,
        //       width: 400,
        //     }}
        //     onFinish={async (values) => {
        //       const res = await createNewUser({
        //         ...values,
        //         code: values.email,
        //         roles: values.roles.map((role) => Number(role)),
        //         age: 18,
        //       });
        //       if (res.success) {
        //         messageApi.success("Create new user successfully");
        //         tableRef.current?.reload();
        //         return true;
        //       }
        //       return false;
        //     }}
        //   >
        //     <ProFormText
        //       name="name"
        //       label="user name"
        //       rules={[{ required: true }]}
        //     />
        //     <ProFormText
        //       name="email"
        //       label="email"
        //       rules={[{ required: true }]}
        //     />
        //     <ProFormSelect
        //       name="roles"
        //       label="roles"
        //       fieldProps={{ mode: "multiple" }}
        //       rules={[{ required: true }]}
        //       valueEnum={{
        //         [UserRole.Admin]: "admin",
        //         [UserRole.Manager]: "manager",
        //         [UserRole.Normal]: "normal",
        //       }}
        //     />
        //   </ModalForm>
        // }
        columns={columns}
        request={async () => {
          const res = await getEquipmentList();
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
