import { string, number } from "yup";

const socket = new WebSocket('ws://localhost:8080/ws')

export interface IWebsocketMessage {
    type: number,
    body: string
}
const connect = (callback: (message: string) => void) => {
    console.log("Attempting Connection...");

    socket.onopen = () => {
      console.log("Successfully Connected");
    };
  
    socket.onmessage = msg => {
      console.log(msg);
      callback(msg.data);
    };
  
    socket.onclose = event => {
      console.log("Socket Closed Connection: ", event);
    };
  
    socket.onerror = error  => {
      console.log("Socket Error: ", error);
    };
  };
  
  let sendMsg = (msg: string) => {
    console.log("sending msg: ", msg);
    socket.send(msg);
  };

  export { connect, sendMsg}