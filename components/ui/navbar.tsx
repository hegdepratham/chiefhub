import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4">
      <div className="flex flex-wrap gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/clan">Clan</Link>
        <Link href="/chat">Chat</Link>
        <Link href="/verify">Verify</Link>
        <Link href="/attendance">Attendance</Link>
      </div>
    </nav>
  );
}