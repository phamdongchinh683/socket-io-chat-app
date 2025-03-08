import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default Notification;
