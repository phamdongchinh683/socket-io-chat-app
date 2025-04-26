import PropTypes from "prop-types";

const AuthButton = ({ name, func }) => {
 return (
  <input
   type="button"
   value={name}
   onClick={func}
   className="auth-button"
  />
 );
};

AuthButton.propTypes = {
 name: PropTypes.string.isRequired,
 func: PropTypes.func.isRequired,
};

export default AuthButton;
