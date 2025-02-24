import PropTypes from "prop-types";

const AuthButton = ({ name, func }) => {
 return (
  <button type="button" onClick={func} className="auth-button">
   {name}
  </button>
 );
};

AuthButton.propTypes = {
 name: PropTypes.string.isRequired,
 func: PropTypes.func.isRequired,
};

export default AuthButton;
