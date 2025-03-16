import { default as propTypes, default as PropTypes } from 'prop-types';
import React from "react";
import "./index.css";

const AuthInput = ({ field, type, value, onChange, hint, handleKeyDown, length }) => {

 return (
  <div className="form-group">
   <label className='label-auth-field'>{field}</label>
   <input
    type={type}
    placeholder={hint}
    className="auth-input"
    value={value}
    onChange={onChange}
    onKeyDown={handleKeyDown}
    maxLength={length}
    required
   />
  </div>
 );
};

AuthInput.propTypes = {
 field: PropTypes.string,
 type: PropTypes.string,
 hint: PropTypes.string,
 value: PropTypes.string | propTypes.number,
 onChange: PropTypes.func,
 handleKeyDown: PropTypes.func,
 length: PropTypes.number
};
export default AuthInput;
