import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";

import { registerChatHandlers } from "./chatHandlers";

export function initializeSocket(
  httpServer: HTTPServer
) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(
      `Socket connected: ${socket.id}`
    );

    // Register all chat events
    registerChatHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(
        `Socket disconnected: ${socket.id}`
      );
    });
  });

  return io;
}