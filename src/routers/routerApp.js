import { Route, Routes } from "react-router-dom";

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
          <Route element={<Home />} path="/dashboard" exact />
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="list-conversation" element={<Conversation />} />
        <Route path="chat" element={<Conversation />} />
      </Routes>
    </>
  );
};

export default RouterApp;
