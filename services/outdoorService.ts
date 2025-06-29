interface IResponse<T> {
  data: T;
  success: boolean;
  statusCode: number;
}

interface IEquipmentTypeModel {
  typeName: string;
  id: string;
}

export async function getEquipmentTypes() {
  const res = await fetch(`/api/outdoor/EquipmentType/type`);
  const body = (await res.json()) as IResponse<IEquipmentTypeModel[]>;
  return body;
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
  roles: string[];
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
