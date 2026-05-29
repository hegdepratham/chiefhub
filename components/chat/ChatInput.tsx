"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({
  onSend,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  }

  return (
    <div className="flex gap-2 border-t border-gray-700 p-4">
      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Type a message..."
        className="flex-1 rounded bg-gray-800 p-2"
      />

      <button
        onClick={handleSend}
        className="rounded bg-blue-600 px-4 py-2"
      >
        Send
      </button>
    </div>
  );
}