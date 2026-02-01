import { useMemo, useState } from 'react';
import { Calendar } from 'lucide-react';
import useRecords from '../hooks/useRecords.js';

function withinDays(iso, days) {
  if (!iso) return false;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  const now = new Date();
  const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= days;
}

function UsageHistory() {
  const [filter, setFilter] = useState('all');
  const records = useRecords();

  const filtered = useMemo(() => {
    if (filter === 'all') return records;
    if (filter === 'week')
      return records.filter((r) => withinDays(r.dateTimeISO, 7));
    if (filter === 'month')
      return records.filter((r) => withinDays(r.dateTimeISO, 30));
    return records;
  }, [records, filter]);

  const totalUnits = useMemo(
    () => filtered.reduce((s, r) => s + (r.units || 0), 0),
    [filtered]
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Usage History
          </h2>
          <p className="text-gray-600">All processed messages</p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Meter
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Units
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Amt
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                Token
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No records yet. Add messages in SMS Input.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {r.dateRaw}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{r.meter}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {r.units.toFixed(1)} kWh
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    KES {r.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">
                    {r.token}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Showing {filtered.length} transactions</span>
        <span>Total units: {totalUnits.toFixed(1)} kWh</span>
      </div>
    </div>
  );
}

export default UsageHistory;
