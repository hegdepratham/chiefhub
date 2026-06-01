"use client";

export default function AttendanceTestPage() {
  async function addRecord() {
    const response = await fetch(
      "/api/attendance/record",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerTag: "#R9LC02QJ8",
          warId: "war_001",
          attacksUsed: 2,
          attacksAvailable: 2,
          isCwl: false,
        }),
      }
    );

    const data = await response.json();

    alert(JSON.stringify(data));
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={addRecord}>
        Add Attendance Record
      </button>
    </div>
  );
}