import { React, useState } from "react";
import "react-phone-input-2/lib/style.css";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div class="container">
      <h2 class="title-auth">Sign In</h2>
      <form id="signupForm">
        <AuthInput field="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} hint={'Example: chinhchinh123@gmail.com'} />
        <AuthInput field="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} hint={'Your password'} />
        <AuthButton name={'Sign In'} />
      </form>
    </div>
  );
};

export default SignIn;
