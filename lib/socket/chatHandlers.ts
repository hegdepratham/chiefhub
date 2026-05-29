import { Server, Socket } from "socket.io";

import {
  insertMessage,
} from "@/lib/db/queries/chat";

export function registerChatHandlers(
  io: Server,
  socket: Socket
) {
  console.log(
    `Chat handlers registered for ${socket.id}`
  );

  socket.on(
    "join-channel",
    (channel: string) => {
      console.log(
        "JOIN EVENT FIRED:",
        channel
      );

      socket.join(channel);

      console.log(
        `${socket.id} joined channel ${channel}`
      );
    }
  );

  socket.on(
    "send-message",
    (data: {
      playerTag: string;
      playerName: string;
      channel: string;
      message: string;
    }) => {
      console.log(
        "SEND MESSAGE EVENT FIRED"
      );

      console.log(
        "Received message:",
        data
      );

      try {
        insertMessage(
          data.playerTag,
          data.playerName,
          data.channel,
          data.message
        );

        console.log(
          "Message saved to database"
        );

        io.to(data.channel).emit(
          "new-message",
          data
        );

        console.log(
          "Message broadcasted"
        );
      } catch (error) {
        console.error(
          "Failed to save message:",
          error
        );
      }
    }
  );

  socket.on("disconnect", () => {
    console.log(
      `Socket disconnected: ${socket.id}`
    );
  });
}