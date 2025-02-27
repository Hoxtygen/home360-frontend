import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const connect = (enquiryId: string, callback: (message: any) => void) => {
  socket = io("http://localhost:8080/ws", {
    extraHeaders: {},
  });
  socket.on("connect", () => {
    console.log("connected to Websocket server");
    socket?.on(`/topic/public/${enquiryId}`, (message) => {
      callback(message);
    });
  });
  socket.on("disconnect", () => {
    console.log("Disconnected from Websocket server");
  });
};

const sendMessage = (enquiryId: string, message: any) => {
  if (socket) {
    console.log("socket connected!");
    socket.emit("/app/chat/" + enquiryId + "/sendMessage", message);
  }
};

export { connect, sendMessage };
