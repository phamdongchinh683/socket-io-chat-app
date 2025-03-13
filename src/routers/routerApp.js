import { Route, Routes } from "react-router-dom";

import Chat from "../pages/Chat";
import Conversation from "../pages/Conversation";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
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
        </Route>
        <Route element={<PublicRouter />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouterApp;
