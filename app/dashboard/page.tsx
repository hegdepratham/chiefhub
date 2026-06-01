import Navbar from "@/components/ui/navbar";
import Card from "@/components/ui/card";

async function getStats() {
  const response = await fetch(
    "http://localhost:3000/api/dashboard/stats",
    {
      cache: "no-store"
    }
  );

  return response.json();
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <>
      <Navbar />

      <main className="p-6 space-y-4">
        <h1 className="text-3xl font-bold">
          ChiefHub Dashboard
        </h1>

        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Verified Players">
            <p>{stats.verifiedPlayers}</p>
          </Card>

          <Card title="Tracked Players">
            <p>{stats.trackedPlayers}</p>
          </Card>

          <Card title="Attendance Records">
            <p>{stats.attendanceRecords}</p>
          </Card>
        </div>
      </main>
    </>
  );
}