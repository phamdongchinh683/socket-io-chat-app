import { Navigate, Outlet } from "react-router-dom";
import useToken from "../jwt";

const PrivateRoutes = () => {
  const { getToken } = useToken();
  let token = getToken;
  return token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
