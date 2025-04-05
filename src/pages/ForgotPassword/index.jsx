import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import Notification from "../../components/Notification";
import { AuthService } from "../../services";
import * as validation from '../../util';

const ForgotPassword = () => {
 const [email, setEmail] = useState("");
 const [loading, setLoading] = useState(false);
 const { newPass } = AuthService();

 const getNewPassword = useCallback(async () => {

  if (!email) {
   toast.warn('Please not empty')
   return;
  }

  if (!validation.validateEmail(email)) {
   toast.warn('Please provide a valid email')
   return
  }

  setLoading(true);
  try {
   const response = await newPass({ email });
   if (response?.data?.data === "New password has been sent to your email") {
    toast.success(response.data.data);
   } else {
    toast.error(response?.data?.data);
   }
  } catch (error) {
   toast.error('Please try again!');
  } finally {
   setLoading(false);
  }
 }, [email, newPass])



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
