interface Activity {
    id: number;
    user: string;
    action: string;
    timestamp: string;
  }
  
  interface RecentActivityTableProps {
    activities: Activity[];
  }
  
  export function RecentActivityTable({ activities }: RecentActivityTableProps) {
    return (
      <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Action</th>
              <th className="px-6 py-3 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-gray-800">{activity.user}</td>
                <td className="px-6 py-3 text-gray-600">{activity.action}</td>
                <td className="px-6 py-3 text-right text-gray-500">
                  {activity.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  