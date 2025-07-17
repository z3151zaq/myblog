"use client";

import {
  FormInstance,
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
import { useEffect, useRef, useState } from "react";

import {
  addOrModifyEquipment,
  getEquipmentById,
  getEquipmentTypes,
  getLocationList,
  IEquipmentModel,
  myFetch,
  uploadBase64ToImgur,
} from "@/services/outdoorService";

const ModifyEquipmentPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const formRef = useRef<FormInstance>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const equipmentId = searchParams.get("id");

  const [initialValues, setInitialValues] = useState<any>();

  useEffect(() => {
    if (equipmentId) {
      getEquipmentById(Number(equipmentId)).then((res) => {
        console.log("@@@res", res);
        const data = res.data;
        if (res.success) {
          setInitialValues({
            typeId: data.typeId,
            location: data.location,
            condition: data.condition,
            availability: data.availability,
            pricePerDay: data.pricePerDay,
            descriptions: data.descriptions,
          });
        }
      });
    } else {
      setInitialValues({});
    }
  }, [equipmentId]);

  const handleSubmit = async (values: any) => {
    const submitData: any = {
      ...values,
    };
    if (equipmentId) {
      submitData.id = equipmentId;
    }
    const res = await addOrModifyEquipment(submitData);
    if (res.success) {
      messageApi.success(
        `${equipmentId ? "Update" : "Create"} equipment successfully`,
      );
      router.push("/outdoorRent/admin/equipment");
    }
  };

  return (
    <>
      {contextHolder}
      <ProCard title={`${equipmentId ? "Edit" : "Add"} Equipment`}>
        {initialValues && (
          <ProForm
            initialValues={initialValues}
            onFinish={handleSubmit}
            formRef={formRef}
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

            <ProFormSelect
              name="location"
              label="Location"
              rules={[{ required: true }]}
              request={async () => {
                const res = await getLocationList();
                return res.data.map((loc) => ({
                  label: `${loc.name}(${loc.locationDetail})`,
                  value: loc.name,
                }));
              }}
            />

            <ProFormSelect
              name="condition"
              label="Condition"
              rules={[{ required: true }]}
              valueEnum={{
                Excellent: "Excellent",
                Good: "Good",
                Normal: "Normal",
                Bad: "Bad",
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
              // rules={[{ required: true }]}
            />

            <ProFormText
              name="availability"
              label="Availability"
              // rules={[{ required: true }]}
            />
          </ProForm>
        )}
      </ProCard>
    </>
  );
};

export default ModifyEquipmentPage;
