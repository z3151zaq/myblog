"use client";

import {
  ActionType,
  ModalForm,
  ProColumnType,
  ProFormSelect,
  ProFormText,
  ProTable,
} from "@ant-design/pro-components";
import { Button, message, Space, Tag } from "antd";
import { useRef } from "react";

import { IEquipmentCategoryModel } from "@/services/outdoorService";
import {
  addEquipmentCategory,
  addEquipmentType,
  getEquipmentCategories,
  getEquipmentTypes,
} from "@/services/outdoorService";

const IndexPage = () => {
  const [messageApi, ctx] = message.useMessage();
  const columns: ProColumnType<IEquipmentCategoryModel>[] = [
    { title: "category name", dataIndex: "categoryName" },
    {
      title: "types",
      dataIndex: "equipmentTypes",
      render(dom, entity) {
        return (
          <Space>
            {entity.equipmentTypes.map((type) => (
              <Tag key={type.id}>{type.typeName}</Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: "operation",
      render: (text, record, _, action) => [
        <ModalForm
          key="edit"
          title="edit category"
          trigger={<a>edit</a>}
          modalProps={{
            destroyOnClose: true,
            width: 400,
          }}
          initialValues={{
            ...record,
            typeIds: record.equipmentTypes.map((i) => i.id),
          }}
          onFinish={async (values) => {
            const res = await addEquipmentCategory({
              ...values,
              id: record.id,
            });
            if (res.success) {
              messageApi.success("Update equipment category successfully");
              action?.reload();
              return true;
            }
            return false;
          }}
        >
          <ProFormText
            name="categoryName"
            label="category name"
            placeholder="please input category name"
            rules={[{ required: true, message: "This field is required." }]}
          />
          <ProFormSelect
            name="typeIds"
            label="types"
            placeholder="please select including types"
            fieldProps={{
              mode: "multiple",
            }}
            request={async () => {
              const res = await getEquipmentTypes();
              return res.data.map((i) => ({
                label: i.typeName,
                value: i.id,
              }));
            }}
          />
        </ModalForm>,
      ],
    },
  ];
  const tableRef = useRef<ActionType>();
  const submitAddNewType = async (values) => {
    const res = await addEquipmentType(values);
    if (res.success) {
      messageApi.success("Add equipment type successfully");
    }
    return true;
  };
  return (
    <>
      {ctx}
      <ProTable
        actionRef={tableRef}
        headerTitle={
          <Space>
            <ModalForm
              title="add a new type"
              trigger={<Button type="primary">Add new equipment type</Button>}
              modalProps={{
                destroyOnClose: true,
                width: 400,
              }}
              onFinish={submitAddNewType}
            >
              <ProFormText
                name="typeName"
                label="type name"
                placeholder="please input type name"
                rules={[{ required: true, message: "This field is required." }]}
              />
            </ModalForm>
            <ModalForm
              title="add a new categoty"
              trigger={<Button type="primary">Add new category</Button>}
              modalProps={{
                destroyOnClose: true,
                width: 400,
              }}
              onFinish={async (values) => {
                const res = await addEquipmentCategory(values);
                if (res.success) {
                  messageApi.success("Add equipment category successfully");
                  tableRef.current?.reload();
                  return true;
                }
                return false;
              }}
            >
              <ProFormText
                name="categoryName"
                label="category name"
                placeholder="please input type name"
                rules={[{ required: true, message: "This field is required." }]}
              />
              <ProFormSelect
                name="typeIds"
                label="types"
                placeholder="please select including types"
                fieldProps={{
                  mode: "multiple",
                }}
                request={async () => {
                  const res = await getEquipmentTypes();
                  return res.data.map((i) => ({
                    label: i.typeName,
                    value: i.id,
                  }));
                }}
              />
            </ModalForm>
          </Space>
        }
        columns={columns}
        request={async () => {
          const res = await getEquipmentCategories();
          return {
            data: res.data,
            success: res.success,
            total: res.data.length,
          };
        }}
        rowKey="id"
        search={false}
      >
        welcome
      </ProTable>
    </>
  );
};

export default IndexPage;
