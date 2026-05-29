import { Server, Socket } from "socket.io";

import {
  insertMessage,
} from "@/lib/db/queries/chat";

export function registerChatHandlers(
  io: Server,
  socket: Socket
) {
  socket.on("join-channel", (channel: string) => {
    socket.join(channel);

    console.log(
      `${socket.id} joined channel ${channel}`
    );
  });

  socket.on(
    "send-message",
    (data: {
      playerTag: string;
      playerName: string;
      channel: string;
      message: string;
    }) => {
      insertMessage(
        data.playerTag,
        data.playerName,
        data.channel,
        data.message
      );

      io.to(data.channel).emit(
        "new-message",
        data
      );
    }
  );
}