"use client";

import { useEffect, useState } from "react";

import { useSocket } from "@/hooks/useSocket";

import ChannelSidebar from "@/components/chat/ChannelSidebar";
import ChatWindow, {
  ChatMessage,
} from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatPage() {
  const socket = useSocket();

  const [channel, setChannel] =
    useState("general");

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadHistory(
    selectedChannel: string
  ) {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/chat/history?channel=${selectedChannel}`
      );

      const data = await response.json();

      setMessages(data);
    } catch (error) {
      console.error(
        "Failed to load history",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory(channel);
  }, [channel]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join-channel", channel);

    const handleMessage = (
      message: ChatMessage
    ) => {
      setMessages((prev) => [
        ...prev,
        message,
      ]);
    };

    socket.on(
      "new-message",
      handleMessage
    );

    return () => {
      socket.off(
        "new-message",
        handleMessage
      );
    };
  }, [socket, channel]);

  function sendMessage(text: string) {
    if (!socket) return;

    

  socket.emit("send-message", {
  playerTag: "#TEST123",
  playerName:prompt("Enter your name") || "Unknown",
  channel,
  message: text,
});
  }

  return (
    <div className="flex h-screen">
      <ChannelSidebar
        currentChannel={channel}
        onSelectChannel={setChannel}
      />

      <div className="flex flex-1 flex-col">
        <div className="border-b border-gray-700 p-4">
          <h1 className="text-xl font-bold">
            #{channel}
          </h1>
        </div>

        {loading ? (
          <div className="p-4">
            Loading messages...
          </div>
        ) : (
          <ChatWindow messages={messages} />
        )}

        <ChatInput
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}