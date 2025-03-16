import { Navigate, Outlet } from "react-router-dom";
import useToken from "../jwt";

const PublicRouter = () => {
  const { getToken } = useToken();
  let token = getToken;

  return token ? <Navigate to="/my-chats" /> : <Outlet />;
};

export default PublicRouter;
