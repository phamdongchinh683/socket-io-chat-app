import { Route, Routes } from "react-router-dom";

import Conversation from "../pages/Conversation";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const RouterApp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="list-conversation" element={<Conversation />} />
        <Route path="chat" element={<Conversation />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default RouterApp;
