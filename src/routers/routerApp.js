import { Route, Routes } from "react-router-dom";

import Chat from "../pages/Chat";
import Conversation from "../pages/Conversation";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoutes from "./routerPrivate";
const RouterApp = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" exact />
          <Route path="my-chats" element={<Conversation />} />
          <Route path="chat/:id" element={<Chat />} />
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default RouterApp;
