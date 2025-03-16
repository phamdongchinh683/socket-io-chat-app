import { React, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import Notification from "../../components/Notification";
import useToken from "../../jwt";
import { AuthService } from "../../services";

const SignIn = () => {

  const { login } = AuthService();
  const { setToken } = useToken();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAccount = async () => {
    try {

      if (!email || !password) {
        toast.warn('Please not empty fields')
        return;
      }

      const data = {
        email: email,
        password: password
      }

      const response = await login(data);
      if (response.data.data.token) {
        let token = response.data.data.token;
        setToken(token)
        toast.success('Welcome!');
        navigate('/my-chats')
      } else {
        toast.warn(response.data.data)
      }

    } catch (e) {
      let errors = e.response?.data?.message;
      errors.map((error) => toast.error(error));
    }
  }

  return (
    <>
      <div className='container-page-auth'>
        <div className="container">
          <h2 className="title-auth">Sign In</h2>
          <form id="signupForm">
            <AuthInput field="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} hint={'Email'} />
            <AuthInput field="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} hint={'Your Password'} />
            <AuthButton name={'Sign In'} func={loginAccount} />
            <Link to='/sign-up' className='auth-link-page'>Sign up now</Link>
            <Link to='/forgot-password' className='auth-link-page'>Forgot your password?</Link>
          </form>
        </div>
      </div>
      <Notification />
    </>
  );
};

export default SignIn;
