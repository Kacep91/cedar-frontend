import { createResponse } from "../utils/createResponse";
import { apiProvider } from "./config";
import { ApiResponse } from "../models/apiResponse";
import { CurrentUserDto } from "../models/users/currentUserDto";

export const authApi = {
  publicAuth: (token: string | null) => {
    return apiProvider
      .post("/public/auth", { code: token })
      .then(createResponse)
      .catch((e) => createResponse({ error: e }));
  },
  getCurrentUser: (): Promise<ApiResponse<CurrentUserDto>> => {
    return apiProvider
      .get("/users/current")
      .then(createResponse)
      .catch((e) => createResponse({ error: e }));
  },
  logout: () => {
    return apiProvider
      .post("/logout")
      .then(createResponse)
      .catch((e) => createResponse({ error: e }));
  },
};
