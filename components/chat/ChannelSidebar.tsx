interface ChannelSidebarProps {
  currentChannel: string;
  onSelectChannel: (channel: string) => void;
}

const channels = [
  "general",
  "warroom",
  "announcements",
];

export default function ChannelSidebar({
  currentChannel,
  onSelectChannel,
}: ChannelSidebarProps) {
  return (
    <div className="w-56 border-r border-gray-700 p-4">
      <h2 className="mb-4 text-lg font-bold">
        Channels
      </h2>

      <div className="space-y-2">
        {channels.map((channel) => (
          <button
            key={channel}
            onClick={() => onSelectChannel(channel)}
            className={`w-full rounded p-2 text-left ${
              currentChannel === channel
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            #{channel}
          </button>
        ))}
      </div>
    </div>
  );
}