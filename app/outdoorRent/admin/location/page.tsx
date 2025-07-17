"use client";

import {
  ActionType,
  ModalForm,
  ProColumnType,
  ProFormSelect,
  ProFormText,
  ProTable,
} from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space } from "antd";
import React, { useRef, useState } from "react";

import { getUsers, UserRole } from "@/services/outdoorService";
import {
  addOrModifyLocation,
  deleteLocation,
  getLocationList,
  ILocationModel,
} from "@/services/outdoorService";

const IndexPage = () => {
  const [messageApi, ctx] = message.useMessage();
  const tableRef = useRef<ActionType>();
  const [editing, setEditing] = useState<ILocationModel | null>(null);

  const columns: ProColumnType<ILocationModel>[] = [
    { title: "Name", dataIndex: "name" },
    { title: "Detail", dataIndex: "locationDetail" },
    {
      title: "Manager",
      dataIndex: "managerName",
    },
    {
      title: "Operation",
      valueType: "option",
      render: (_, record) => (
        <Space>
          <a
            key="edit"
            onClick={() => {
              setEditing(record);
            }}
          >
            edit
          </a>
          <Popconfirm
            onConfirm={async () => {
              const res = await deleteLocation(record.id);
              if (res.success) {
                messageApi.success("Delete location successfully");
                tableRef.current?.reload();
              } else {
                messageApi.error("Delete failed");
              }
            }}
            title="Are you sure to delete?"
          >
            <a key="delete">delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 新增/编辑表单提交
  const handleFinish = async (values: any) => {
    let res;
    if (editing) {
      res = await addOrModifyLocation({ ...editing, ...values });
      if (res.success) {
        messageApi.success("Update location successfully");
        setEditing(null);
        tableRef.current?.reload();
        return true;
      } else {
        messageApi.error(res.data || "Update failed");
        return false;
      }
    } else {
      res = await addOrModifyLocation(values);
      if (res.success) {
        messageApi.success("Add location successfully");
        tableRef.current?.reload();
        return true;
      } else {
        messageApi.error(res.data || "Add failed");
        return false;
      }
    }
  };

  // 抽取表单弹窗组件
  const LocationFormModal = ({
    open,
    onOpenChange,
    initialValues,
    title,
    trigger,
  }: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    initialValues?: any;
    title: string;
    trigger?: React.ReactElement;
  }) => (
    <ModalForm
      title={title}
      open={open}
      trigger={trigger}
      modalProps={{
        destroyOnClose: true,
        width: 400,
        onCancel: () => onOpenChange?.(false),
      }}
      initialValues={initialValues}
      onFinish={handleFinish}
      onOpenChange={onOpenChange}
    >
      <ProFormText
        name="name"
        label="Location Name"
        rules={[{ required: true }]}
      />
      <ProFormText
        name="locationDetail"
        label="Location Detail"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        name="managerId"
        label="Manager"
        rules={[{ required: true }]}
        request={async () => {
          const res = await getUsers();
          return res.data
            .filter((i) => i.roles.includes(UserRole.Manager))
            .map((u) => ({ label: u.name, value: u.id }));
        }}
      />
    </ModalForm>
  );

  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      {ctx}
      <ProTable
        rowKey="id"
        request={getLocationList}
        actionRef={tableRef}
        columns={columns}
        search={false}
        headerTitle={
          <LocationFormModal
            title="Add Location"
            trigger={<Button type="primary">Add Location</Button>}
            open={addOpen}
            onOpenChange={setAddOpen}
          />
        }
      />
      {/* 编辑弹窗 */}
      <LocationFormModal
        title="Edit Location"
        open={!!editing}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
        initialValues={editing || {}}
      />
    </>
  );
};

export default IndexPage;
