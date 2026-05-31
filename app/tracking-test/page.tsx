"use client";

export default function TrackingTestPage() {
  async function startTracking() {
    const response = await fetch("/api/tracking/optin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerTag: "#R9LCO2QJ8",
      }),
    });

    const data = await response.json();

    console.log(data);
    alert(JSON.stringify(data));
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={startTracking}>
        Start Tracking
      </button>
    </div>
  );
}