import { Navigate, Route, Routes } from "react-router-dom";

import Chat from "../pages/Chat";
import Conversation from "../pages/Conversation";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UpdatePassword from "../pages/UpdatePassword";
import PrivateRoutes from "./routerPrivate";
import PublicRouter from "./routerPublic";
const RouterApp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route element={<PrivateRoutes />}>
          <Route index element={<Conversation />} />
          <Route path="my-chats" element={<Conversation />} exact />
          <Route path="chat/:id" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update-password" element={<UpdatePassword />} />
        </Route>
        <Route element={<PublicRouter />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default RouterApp;
