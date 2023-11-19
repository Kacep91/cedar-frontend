import { ApiResponse } from "../models/apiResponse";
import { isNotNil } from "./typeguards";

export function createResponse<T>({
  data,
  error,
}: {
  data?: T;
  error?: any;
}): ApiResponse<T> {
  if (isNotNil(data)) {
    return {
      data,
      error: null,
    };
  }

  if (isNotNil(error)) {
    return {
      data: null,
      error,
    };
  }

  return {
    data: null,
    error: { message: "Нет ответа", name: "" },
  };
}
