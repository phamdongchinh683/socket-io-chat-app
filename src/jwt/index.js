function useToken() {
  const getToken = sessionStorage.getItem("token");

  const setToken = (newToken) => {
    sessionStorage.setItem("token", newToken);
  };

  const deleteToken = () => {
    sessionStorage.removeItem("token");
  };

  return { getToken, setToken, deleteToken };
}

export default useToken;
