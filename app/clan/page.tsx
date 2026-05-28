"use client";

import { useState } from "react";

import ClanCard from "@/components/clan/ClanCard";
import MemberList from "@/components/clan/MemberList";

export default function ClanPage() {
  const [tag, setTag] = useState("");

  const [clan, setClan] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSearch() {
    if (!tag.trim()) {
      return;
    }

    try {
      setLoading(true);

      setError("");

      setClan(null);

      const formattedTag = tag.startsWith("#")
        ? tag
        : `#${tag}`;

      const encodedTag =
        encodeURIComponent(formattedTag);

      const response = await fetch(
        `/api/clan/${encodedTag}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch clan"
        );
      }

      const data = await response.json();

      setClan(data);
    } catch (error) {
      console.error(error);

      setError(
        "Could not fetch clan data"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-4xl font-bold text-white">
          Clan Lookup
        </h1>

        <div className="mb-6 flex gap-4">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
               handleSearch();
              }
           }}
            placeholder="Enter clan tag"
            value={tag}
            onChange={(e) =>
              setTag(e.target.value)
            }
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {loading && (
          <div className="rounded-lg bg-gray-900 p-4 text-white">
            Loading clan data...
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-500/20 p-4 text-red-400">
            {error}
          </div>
        )}

        {clan && (
          <div className="space-y-6">
            <ClanCard clan={clan} />

            <MemberList
              members={clan.memberList}
            />
          </div>
        )}
      </div>
    </main>
  );
}