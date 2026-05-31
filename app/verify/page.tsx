"use client";

import { useState } from "react";

export default function VerifyPage() {
  const [playerTag, setPlayerTag] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");

  async function verifyAccount() {
    const response = await fetch(
      "/api/verification/check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerTag,
          apiToken,
        }),
      }
    );

    const data = await response.json();

    setVerified(data.verified);

    if (data.verified) {
      setMessage("✅ Account Verified");
    } else {
      setMessage("❌ Verification Failed");
    }
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
        placeholder="API Token"
        value={apiToken}
        onChange={(e) =>
          setApiToken(e.target.value)
        }
      />

      <button
        onClick={verifyAccount}
        className="bg-green-500 text-white px-4 py-2"
      >
        Verify
      </button>

      {message && (
        <div className="mt-4">
          {message}
        </div>
      )}

      {verified && (
        <div className="mt-2 text-green-600 font-bold">
          Verified Successfully
        </div>
      )}
    </div>
  );
}