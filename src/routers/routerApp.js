import { Route, Routes } from "react-router-dom";

import Chat from "../pages/Chat";
import Conversation from "../pages/Conversation";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
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
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" exact />
          <Route path="my-chats" element={<Conversation />} />
          <Route path="chat/:id" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update-password" element={<UpdatePassword />} />
        </Route>
        <Route element={<PublicRouter />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouterApp;
