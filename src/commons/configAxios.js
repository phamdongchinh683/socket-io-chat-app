let token = sessionStorage.getItem("token");

export const configAxios = {
  headers: { Authorization: `Bearer ${token}` },
};
