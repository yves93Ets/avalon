import React, { createContext } from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient({ transports: ["websocket"] });
export const SocketContext = createContext();
export const SocketProvider = (props) => {
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
