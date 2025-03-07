import io from "socket.io-client";

export const socket = io(process.env.REACT_APP_SOCKET_URL_APPLICATION, {
  transports: ["websocket"],
  auth: { authorization: `Bearer ${sessionStorage.getItem("token")}` },
});
