import createClient from "openapi-fetch";
import { paths } from "./api/openapi";
import { AUTH_KEY } from "./auth/auth.js";

const baseUrl = "http://localhost:3000";

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
