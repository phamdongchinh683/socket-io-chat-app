import { useNavigate } from "react-router-dom";
import useToken from "../jwt";
import { AuthService } from "../services";

export const Handle = () => {
  const { deleteToken } = useToken();
  const { logOutAccount } = AuthService();
  const navigate = useNavigate();

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

  return { handleLogOut };
};
