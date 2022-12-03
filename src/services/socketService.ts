import io from "socket.io-client";

let socket: any;

export const initiateSocketConnection = () => {
  socket = io("https://api.jointimbo.com/conversation");
  console.log(`Connecting socket...`);
};
