import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import Notification from "../../components/Notification";
import { AuthService } from "../../services";

const ForgotPassword = () => {
 const [email, setEmail] = useState("");
 const [loading, setLoading] = useState(false);
 const { newPass } = AuthService();
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 const getNewPassword = async () => {
  if (!email || !emailRegex.test(email)) {
   toast.warning("Invalid email format. Example: chinh@gmail.com");
   return;
  }

  setLoading(true);
  try {
   const response = await newPass({ email });
   console.log(response);
   if (response?.data?.data === "New password has been sent to your email") {
    toast.success(response.data.data);
   } else {
    toast.error(response?.data?.data);
   }
  } catch (error) {
   toast.error(error.response?.data?.message);
  } finally {
   setLoading(false);
  }
 };

 return (
  <>
   <div className="container-page-auth">
    <div className="container">
     <h2 className="title-auth">Forgot Password</h2>
     <form id="forgotPasswordForm">
      <AuthInput
       field="Email"
       type="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       hint={"Enter your email"}
      />
      <AuthButton
       name={loading ? "Sending..." : "Send"}
       func={getNewPassword}
       disabled={loading}
      />
     </form>
     <Link to='/sign-in' className='auth-link-page'>Sign in to your account here</Link>
    </div>
   </div>
   <Notification />
  </>
 );
};

export default ForgotPassword;
