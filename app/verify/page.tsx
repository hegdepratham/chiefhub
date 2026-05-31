"use client";

import { useState } from "react";

export default function VerifyPage() {
  const [playerTag, setPlayerTag] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [code, setCode] = useState("");

  async function generateCode() {
    const response = await fetch(
      "/api/verification/generate",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          playerTag,
          apiToken,
        }),
      }
    );

    const data =
      await response.json();

    setCode(data.code);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Verify Account
      </h1>

      <input
        className="border p-2 mr-2"
        placeholder="#PLAYERTAG"
        value={playerTag}
        onChange={(e) =>
          setPlayerTag(e.target.value)
        }
      />

      <input
        className="border p-2 mr-2"
        placeholder="Your Clash API Token"
        value={apiToken}
        onChange={(e) =>
        setApiToken(e.target.value)
  }
/>

      <button
        onClick={generateCode}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Generate Code
      </button>

      {code && (
        <div className="mt-4">
          Verification Code:
          <strong> {code}</strong>
        </div>
      )}
    </div>
  );
}