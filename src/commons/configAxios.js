export const configAxios = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
