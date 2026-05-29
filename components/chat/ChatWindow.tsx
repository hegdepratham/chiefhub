"use client";

import { useEffect, useRef } from "react";

export interface ChatMessage {
  id?: number;
  channel: string;
  playerName?: string;
  player_name?: string;
  username?: string;
  message: string;
  created_at?: string;
}

interface ChatWindowProps {
  messages: ChatMessage[];
}

export default function ChatWindow({
  messages,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-3">
        {messages.map((msg, index) => (
          <div
            key={`${msg.playerName}-${msg.message}-${index}`}
            className="rounded bg-gray-800 p-3"
          >
            <div className="font-semibold">
                 {msg.playerName ||
                  msg.player_name ||
                  msg.username}
                                </div>

            <div>
                 {msg.message}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}