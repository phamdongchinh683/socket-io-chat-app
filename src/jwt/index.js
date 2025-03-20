import { useNavigate } from "react-router-dom";
import { AuthService } from "../services";

function useToken() {
  const { logOutAccount } = AuthService();
  const navigate = useNavigate();

  const getToken = localStorage.getItem("token");

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  const handleLogOut = async () => {
    try {
      const result = await logOutAccount();
      if (result.data.data === "logged out") {
        deleteToken();
        navigate("/sign-in");
      }
    } catch (e) {
      const statusCode = e.response?.data?.statusCode;
      if (statusCode === 401) {
        deleteToken();
        navigate("/sign-in");
      }
    }
  };

  return { getToken, setToken, handleLogOut };
}

export default useToken;
