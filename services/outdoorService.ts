import { toast } from "sonner";

interface IResponse<T> {
  data: T;
  success: boolean;
  statusCode: number;
}

interface IEquipmentTypeModel {
  typeName: string;
  id: string;
}

import { RequestInit } from "next/dist/server/web/spec-extension/request";

export async function myFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<IResponse<T>> {
  const res = await fetch(url, options);
  const json: IResponse<T> = await res.json();

  if (!json.success) {
    console.log("Request failed:", json);
    // 统一处理业务失败，例如弹 toast、日志记录等
    toast.error((json.data as string) || "There is an unknown error on server");
    console.log("此时应该有一条消息", json);
  }

  return json;
}

export async function getEquipmentTypes() {
  const res = await myFetch<IEquipmentTypeModel[]>(
    `/api/outdoor/EquipmentType/types`,
  );
  return res;
}

interface IAddEquipmentTypeBody {
  typeName: string;
}

export async function addEquipmentType(data: IAddEquipmentTypeBody) {
  const res = await fetch(`/api/outdoor/EquipmentType/type`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  return body;
}

export interface IEquipmentCategoryModel {
  id: number;
  categoryName: string;
  equipmentTypes: {
    id: number;
    typeName: string;
  }[];
}

export async function getEquipmentCategories() {
  const res = await fetch(`/api/outdoor/EquipmentType/category`);
  const body = (await res.json()) as IResponse<IEquipmentCategoryModel[]>;
  return body;
}
interface IUpdataEquipmentCategoryBody {
  id?: number;
  categoryName: "string";
  typeIds: [0];
}

export async function addEquipmentCategory(data: IUpdataEquipmentCategoryBody) {
  const res = await fetch(`/api/outdoor/EquipmentType/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const body = (await res.json()) as IResponse<boolean>;
  return body;
}

export interface IUserModel {
  id: number;
  email: string;
  name: string;
  roles: UserRole[];
}

export async function getUsers() {
  const res = await fetch(`/api/outdoor/User`);
  const body = (await res.json()) as IResponse<IUserModel[]>;
  return body;
}

export enum UserRole {
  Manager,
  Admin,
  Normal,
}

export interface ICreateUserBody {
  email: string;
  name: string;
  age: number;
  code: string;
  roles: UserRole[];
}

export async function createNewUser(data: ICreateUserBody) {
  const res = await fetch(`/api/outdoor/User/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const body = (await res.json()) as IResponse<boolean>;
  return body;
}

export interface IGrantUserAdminBody {
  id: number;
  roles: UserRole[];
}

export async function grantUserAdmin(data: IGrantUserAdminBody) {
  const res = await fetch(`/api/outdoor/User/grant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const body = (await res.json()) as IResponse<boolean>;
  return body;
}

export async function deleteUser(data: { id: number }) {
  const res = await fetch(`/api/outdoor/User/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const body = (await res.json()) as IResponse<boolean>;
  return body;
}

export interface IEquipmentModel {
  id: number;
  location: string;
  managerId: number;
  managerName: string;
  typeId: number;
  typeName: string;
  categoryNames: string[];
  availability: string;
  pricePerDay: number;
  descriptions: string;
  condition: string;
}

export async function getEquipmentList() {
  const res = await fetch(`/api/outdoor/Equipment`);
  const body = (await res.json()) as IResponse<IEquipmentModel[]>;
  return body;
}

export interface IPlaceRentOrderData {
  userId: number;
  equipmentId: number;
  startDate: string;
  endDate: string;
}

export async function placeRentOrder(data: IPlaceRentOrderData) {
  const res = await myFetch<boolean>(`/api/outdoor/Order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
}
