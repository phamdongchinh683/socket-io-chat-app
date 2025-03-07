export const configAxios = {
  headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
};
