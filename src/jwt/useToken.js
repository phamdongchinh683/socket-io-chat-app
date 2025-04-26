import { getWithExpiry, setWithExpiry } from "../util";

function useToken() {
  const getToken = getWithExpiry("token");

  const setToken = (newToken) => {
    setWithExpiry("token", newToken, 3600000);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  return { getToken, setToken, deleteToken };
}

export default useToken;
