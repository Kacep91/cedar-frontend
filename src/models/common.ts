import { GENDER, PLATFORM_OS, USER_TYPE } from "./constants";

export type TPlatform = keyof typeof PLATFORM_OS | string;
export type TGender = keyof typeof GENDER;
export type TUserType = keyof typeof USER_TYPE;

export type TEmail = string;

export type PageImpl<T> = {
  content: T[];
  pageable: PageableObject;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: SortObject;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type SortObject = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type PageableObject = {
  offset: number;
  sort: SortObject;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};
