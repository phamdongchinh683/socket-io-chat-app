import axios from 'axios';
import { configAxios } from '../commons/configAxios';

export function AuthService() {
  const register = (data) => axios.post(process.env.REACT_APP_API_SIGN_UP, data);

  const login = (data) => axios.post(process.env.REACT_APP_API_SIGN_IN, data);

  const conversationList = () => axios.get(process.env.REACT_APP_API_CONVERSATION_LIST, configAxios);

  const logOutAccount = () => axios.post(process.env.REACT_APP_API_LOGOUT, {}, configAxios);

  const conversationHistoryMessages = (id) =>
    axios.get(`${process.env.REACT_APP_API_GET_MESSAGES_HISTORY}/${id}`, configAxios);

  return {
    register,
    login,
    conversationList,
    conversationHistoryMessages,
    logOutAccount,
  };
}
