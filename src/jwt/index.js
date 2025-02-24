import { useEffect, useState } from "react";

function useToken() {
  const getToken = () => localStorage.getItem("token");

  const [token, setTokenState] = useState(getToken());

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenState(newToken);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    setTokenState(null);
  };

  const isAuthenticated = () => !!token;

  useEffect(() => {
    setTokenState(getToken());
  }, []);

  return { token, setToken, deleteToken, isAuthenticated };
}

export default useToken;
