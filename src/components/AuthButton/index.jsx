import { default as PropTypes } from 'prop-types';

const AuthButton = ({ name }) => {
 return (
  <button type="submit" class='auth-button'>{name}</button>
 )
}

AuthButton.propTypes = {
 name: PropTypes.string,
};

export default AuthButton;