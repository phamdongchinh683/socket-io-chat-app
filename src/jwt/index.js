function useToken() {
  const getToken = localStorage.getItem("token");

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  return { getToken, setToken, deleteToken };
}

export default useToken;
