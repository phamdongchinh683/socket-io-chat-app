
import axios from 'axios';
import { configAxios } from '../commons/configAxios';

export function AuthService() {

  const register = async (data) => {
    return await axios.post(process.env.REACT_APP_API_SIGN_UP, data);
  };

  const login = async (data) => {
    return await axios.post(process.env.REACT_APP_API_SIGN_IN, data)
  }


  const conversationList = async () => {
    return await axios.get(process.env.REACT_APP_API_CONVERSATION_LIST, configAxios);
  }


  const logOutAccount = async () => {
    return await axios.post(process.env.REACT_APP_API_LOGOUT, {}, configAxios);
  }

  const conversationHistoryMessages = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API_GET_MESSAGES_HISTORY}/${id}`, configAxios);
  }

  return {
    conversationList,
    conversationHistoryMessages,
    register,
    login,
    logOutAccount
  };
}
