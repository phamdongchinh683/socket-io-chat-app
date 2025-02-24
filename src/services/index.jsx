
import axios from 'axios';
import useToken from '../jwt';

export function AuthService() {

  const { getToken } = useToken();
  const register = async (data) => {
    return await axios.post(process.env.REACT_APP_API_SIGN_UP, data);
  };

  const login = async (data) => {
    return await axios.post(process.env.REACT_APP_API_SIGN_IN, data)
  }


  const conversationList = async () => {
    return await axios.get(process.env.REACT_APP_API_CONVERSATION_LIST, {
      headers: {
        Authorization: `Bearer ${getToken}`
      }
    }
    )
  }

  return {
    conversationList,
    register,
    login
  };
}
