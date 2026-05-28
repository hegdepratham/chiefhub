type ClanCardProps = {
  clan: any;
};

export default function ClanCard({
  clan,
}: ClanCardProps) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">
      <div className="flex items-center gap-4">
        <img
          src={clan.badgeUrls.large}
          alt={clan.name}
          className="h-20 w-20"
        />

        <div>
          <h2 className="text-2xl font-bold text-white">
            {clan.name}
          </h2>

          <p className="text-gray-400">
            {clan.tag}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-sm text-gray-400">
            Clan Level
          </p>

          <p className="text-xl font-bold text-white">
            {clan.clanLevel}
          </p>
        </div>

        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-sm text-gray-400">
            Members
          </p>

          <p className="text-xl font-bold text-white">
            {clan.members}
          </p>
        </div>

        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-sm text-gray-400">
            War Wins
          </p>

          <p className="text-xl font-bold text-white">
            {clan.warWins}
          </p>
        </div>

        <div className="rounded-lg bg-gray-800 p-4">
          <p className="text-sm text-gray-400">
            Required Trophies
          </p>

          <p className="text-xl font-bold text-white">
            {clan.requiredTrophies}
          </p>
        </div>
      </div>

      {clan.description && (
        <div className="mt-6">
          <p className="text-gray-300">
            {clan.description}
          </p>
        </div>
      )}
    </div>
  );
}