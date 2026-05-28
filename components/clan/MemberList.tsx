type MemberListProps = {
  members: any[];
};

export default function MemberList({
  members,
}: MemberListProps) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">
      <h2 className="mb-4 text-2xl font-bold text-white">
        Clan Members
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="pb-3">Name</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Town Hall</th>
              <th className="pb-3">Trophies</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr
                key={member.tag}
                className="border-b border-gray-800"
              >
                <td className="py-3 text-white">
                  {member.name}
                </td>

                <td className="py-3 text-gray-300">
                  {member.role}
                </td>

                <td className="py-3 text-gray-300">
                  TH {member.townHallLevel}
                </td>

                <td className="py-3 text-gray-300">
                  {member.trophies}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}