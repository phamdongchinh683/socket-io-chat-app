import { React, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [password, setPassword] = useState("");

  return (
    <div class="container">
      <h2 class="title-auth">Sign Up</h2>
      <form id="signupForm">
        <AuthInput field="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} hint={'Example: chinhchinh123@gmail.com'} />
        <AuthInput field="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} hint={'Your password'} />
        <label className='label-auth-field'>Mobile Number</label>
        <PhoneInput
          value={mobileNumber}
          country={"vn"}
          className="number"
          style={{ marginBottom: "16px" }}
          onChange={setMobileNumber} />
        <AuthButton name={'Sign Up'} />
      </form>
    </div>
  );
};

export default SignUp;
