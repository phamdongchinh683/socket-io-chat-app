import { React, useCallback, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import Notification from "../../components/Notification";
import { User } from "../../models/User";
import { AuthService } from "../../services";

const SignUp = () => {

  const { register } = AuthService();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const handlePhoneChange = (value, country) => {
    const maxLength = country?.countryCode === "vn" ? 11 : 15;
    if (value.length <= maxLength) {
      setMobileNumber(value);
    }
  };

  const registerAccount = useCallback(async () => {

    try {
      const data = new User(email, password, mobileNumber, "user");

      if (!email || !password || !mobileNumber) {
        toast.warn('Please not empty fields')
        return;
      }

      const response = await register(data);
      const result = response?.data?.data;

      if (result === "success") {
        toast.success("Welcome! You can sign in now!");
        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);

      } else {
        toast.warn(result?.includes("email")
          ? "This email is already in use"
          : "This mobile number is already in use");
      }

    } catch (e) {
      const errors = e.response?.data?.message;
      if (Array.isArray(errors)) {
        errors.forEach((error) => toast.error(error));
      } else {
        toast.error("Please try again");
      }
    }
  }, [email, password, mobileNumber, register, navigate]);

  return (
    <>
      <div className="container-page-auth">
        <div className="container">
          <h2 className="title-auth">Sign Up</h2>
          <form id="signupForm">
            <AuthInput field="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} hint={'Example: chinhchinh123@gmail.com'} />
            <AuthInput field="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} hint={'Your password'} />
            <label className='label-auth-field'>Mobile Number</label>
            <PhoneInput
              value={mobileNumber}
              country={"vn"}
              className="number"
              style={{ marginBottom: "16px" }}
              onChange={handlePhoneChange}
            />
            <AuthButton name={'Sign Up'} func={registerAccount} />
            <Link to='/sign-in' className='auth-link-page'>Sign in to your account here</Link>
          </form>
        </div>
      </div>
      <Notification />
    </>
  );
};

export default SignUp;
