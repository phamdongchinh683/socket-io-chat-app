import { Navigate } from "react-router-dom";
import useToken from "../jwt/useToken";
import Layout from "../layout";

const PrivateRoutes = () => {
  const { getToken } = useToken();
  let token = getToken;

  return token ? <Layout /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
