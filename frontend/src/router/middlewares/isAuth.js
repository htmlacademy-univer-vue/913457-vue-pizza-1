import { getToken } from "@/services/auth/auth.js";

export const isAuth = (params, loginPage = false) => {
  const token = getToken();

  return (loginPage && token) || (!loginPage && !token) ? { path: "/" } : true;
};
