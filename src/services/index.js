import axios from "axios";
import useToken from "../jwt/useToken";

export function AuthService() {
  const { getToken } = useToken();

  const configAxios = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };

  const register = (data) =>
    axios.post(process.env.REACT_APP_API_SIGN_UP, data);

  const login = (data) => axios.post(process.env.REACT_APP_API_SIGN_IN, data);

  const conversationList = () =>
    axios.get(process.env.REACT_APP_API_CONVERSATION_LIST, configAxios);

  const logOutAccount = () =>
    axios.post(process.env.REACT_APP_API_LOGOUT, {}, configAxios);

  const conversationHistoryMessages = (id) =>
    axios.get(
      `${process.env.REACT_APP_API_GET_MESSAGES_HISTORY}/${id}`,
      configAxios
    );

  const getUsers = () =>
    axios.get(`${process.env.REACT_APP_API_GET_ALL_USERS}`, configAxios);

  const myProfile = () =>
    axios.get(`${process.env.REACT_APP_API_USER_PROFILE}`, configAxios);

  const updateProfile = (data) =>
    axios.put(`${process.env.REACT_APP_API_UPDATE_PROFILE}`, data, configAxios);

  const updatePassword = (password) =>
    axios.patch(
      `${process.env.REACT_APP_API_UPDATE_PASSWORD}`,
      password,
      configAxios
    );

  const newPass = (email) =>
    axios.post(
      `${process.env.REACT_APP_API_FORGOT_PASSWORD}`,
      email,
      configAxios
    );

  const uploadImage = async (file) => {
    const uploadImageApi = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;
    if (!uploadImageApi) {
      return;
    }

    if (!file) {
      return;
    }
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_NAME
    );
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

    try {
      const res = await axios.post(uploadImageApi, data);
      return res.data.public_id;
    } catch (error) {
      console.error("Error uploading image:", error.message);
      return error.message;
    }
  };

  return {
    register,
    uploadImage,
    updatePassword,
    updateProfile,
    newPass,
    myProfile,
    login,
    getUsers,
    conversationList,
    conversationHistoryMessages,
    logOutAccount,
  };
}
