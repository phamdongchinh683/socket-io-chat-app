import { Navigate, Outlet } from "react-router-dom";
import useToken from "../jwt/useToken";

const PublicRouter = () => {
  const { getToken } = useToken();
  let token = getToken;

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRouter;
