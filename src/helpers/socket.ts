import { io } from "socket.io-client";

// export const socket = io("https://simple-social.onrender.com/ws/socket.io");
export const socket = io("wss://flickz-server.csproject.org", {
  transports: ["websocket"],
  path: "/ws/socket.io/",
});
