import io from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.REACT_APP_SOCKET_URL_APPLICATION, {
      transports: ["websocket"],
      auth: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  return socket;
};
