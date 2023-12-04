import createClient from "openapi-fetch";
import { paths } from "./api/openapi";
import { AUTH_KEY } from "./auth/auth.js";
import { BACKEND_URL } from "@/common/data/constants";

const baseUrl = BACKEND_URL;

export const { GET, PUT, POST, DELETE } = createClient<paths>({
  baseUrl,
  headers: {
    get Authorization() {
      return localStorage.getItem(AUTH_KEY)
        ? `Bearer ${localStorage.getItem(AUTH_KEY)}`
        : undefined;
    },
  },
});

export * from "./auth/auth.js";
