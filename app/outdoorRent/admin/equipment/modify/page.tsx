"use client";

import {
  ProCard,
  ProForm,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import {
  getEquipmentTypes,
  IEquipmentModel,
  myFetch,
  uploadBase64ToImgur,
} from "@/services/outdoorService";

const ModifyEquipmentPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const equipmentId = searchParams.get("id");
  const [initialValues, setInitialValues] = useState<IEquipmentModel>();

  useEffect(() => {
    if (equipmentId) {
      // Fetch equipment details if we're editing
      myFetch<IEquipmentModel>(`/api/outdoor/Equipment/${equipmentId}`).then(
        (res) => {
          if (res.success) {
            setInitialValues(res.data);
          }
        },
      );
    }
  }, [equipmentId]);

  const handleSubmit = async (values: any) => {
    // 1. 处理图片上传
    let imageUrls: string[] = [];
    if (values.images && Array.isArray(values.images)) {
      for (const file of values.images) {
        let originFile = file.originFileObj || file.file || file;
        if (originFile) {
          // 转为base64
          const toBase64 = (file: File) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                // 去掉data:image/*;base64,前缀
                const result = reader.result as string;
                const base64 = result.split(",")[1];
                resolve(base64);
              };
              reader.onerror = (error) => reject(error);
            });
          const base64 = await toBase64(originFile);
          const uploadRes = await uploadBase64ToImgur(base64);
          if (uploadRes.url) {
            imageUrls.push(uploadRes.url);
          } else {
            messageApi.error(uploadRes.error || "Image upload failed");
            return false;
          }
        }
      }
    }

    // 2. 构造提交数据
    const submitData: any = {
      ...values,
      images: imageUrls,
    };
    if (equipmentId) {
      submitData.id = equipmentId;
    }

    // 3. 调用创建或更新接口
    const res = await fetch(
      `/api/outdoor/Equipment/${equipmentId ? "update" : "create"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      },
    );
    const json = await res.json();
    if (json.success) {
      messageApi.success(
        `${equipmentId ? "Update" : "Create"} equipment successfully`,
      );
      router.push("/outdoorRent/admin/equipment");
    } else {
      messageApi.error(json.message || "Operation failed");
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {contextHolder}
      <ProCard title={`${equipmentId ? "Edit" : "Add"} Equipment`}>
        <ProForm
          initialValues={initialValues}
          onFinish={handleSubmit}
          submitter={{
            resetButtonProps: {
              onClick: () => router.push("/outdoorRent/admin/equipment"),
            },
          }}
        >
          <ProFormSelect
            name="typeId"
            label="Equipment Type"
            rules={[{ required: true }]}
            request={async () => {
              const res = await getEquipmentTypes();
              return res.data.map((type) => ({
                label: type.typeName,
                value: type.id,
              }));
            }}
          />

          <ProFormText
            name="location"
            label="Location"
            rules={[{ required: true }]}
          />

          <ProFormSelect
            name="availability"
            label="Availability"
            rules={[{ required: true }]}
            valueEnum={{
              Available: "Available",
              InUse: "In Use",
              UnderMaintenance: "Under Maintenance",
              Retired: "Retired",
            }}
          />

          <ProFormMoney
            name="pricePerDay"
            label="Price per Day"
            rules={[{ required: true }]}
            min={0}
            locale="en-US"
          />

          <ProFormTextArea
            name="descriptions"
            label="Description"
            rules={[{ required: true }]}
          />

          <ProFormSelect
            name="condition"
            label="Condition"
            rules={[{ required: true }]}
            valueEnum={{
              New: "New",
              Good: "Good",
              Fair: "Fair",
              Poor: "Poor",
            }}
          />

          <ProFormUploadButton
            name="images"
            label="Equipment Images"
            max={5}
            fieldProps={{
              name: "images",
              listType: "picture-card",
            }}
            action="/api/outdoor/Equipment/upload-temp"
          />
        </ProForm>
      </ProCard>
    </Suspense>
  );
};

export default ModifyEquipmentPage;
