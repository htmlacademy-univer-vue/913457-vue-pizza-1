import { BACKEND_URL } from "@/common/data/constants";

export const getPublicImage = (path) => {
  return `${BACKEND_URL}/${path}`;
};
