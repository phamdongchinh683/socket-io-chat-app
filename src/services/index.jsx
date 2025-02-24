
import axios from 'axios';

export function AuthService() {
  const register = async (data) => {
    return await axios.post(process.env.REACT_APP_API_SIGN_UP, data);
  };

  const login = async (data) => {
    return await axios.post(process.env.REACT_APP_API_SIGN_IN, data)
  }

  return {
    register,
    login
  };
}
