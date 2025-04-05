import { getWithExpiry } from "../util";

export const configAxios = {
  headers: { Authorization: `Bearer ${getWithExpiry("token")}` },
};
