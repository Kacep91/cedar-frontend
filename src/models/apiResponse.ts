import { AxiosError } from "axios";

export type ApiResponse<T> = {
  data: T | null;
  error: AxiosError | null | { message: string; name: string };
};
