import createClient from "openapi-fetch";
import { paths } from "./api";

const baseUrl = "http://localhost:3000";

export const { GET, PUT, POST, DELETE } = createClient<paths>({ baseUrl });
