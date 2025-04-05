import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import { AuthService } from "../../services";
import * as validation from '../../util';

const UpdatePassword = () => {
 const [password, setPassword] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const { updatePassword } = AuthService();

 const updateNewPassword = async () => {

  if (!password && !newPassword) {
   toast.warning('Not empty')
   return
  }

  if (!validation.validatePassword(password)) {
   toast.warn('Password must be between 9 and 20 characters')
   return
  }

  if (!validation.validatePassword(newPassword)) {
   toast.warn('New Password must be between 9 and 20 characters')
   return
  }


  let data = {
   password: password,
   newPassword: newPassword
  }

  try {
   const response = await updatePassword(data);
   if (response.data.data === 'Your password has changed') {
    toast.success('Updated password')
    setPassword('');
    setNewPassword('');
   } else {
    toast.error(response.data.data)
   }
  } catch (error) {
   toast.error('Please try again!');
  }
 }

 return (
  <div className='container-page-auth'>
   <div className="container">
    <h2 className="title-auth">Update Password</h2>
    <form id="signupForm">
     <AuthInput field="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} hint={'Current Password'} />
     <AuthInput field="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} hint={'New Password'} />
     <AuthButton name={'Update'} func={updateNewPassword} />
    </form>
   </div>
  </div>
 );
};

export default UpdatePassword;
