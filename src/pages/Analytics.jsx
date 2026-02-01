import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useRecords from '../hooks/useRecords.js';

function monthKey(iso) {
  if (!iso) return 'unknown';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'unknown';
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${d.getFullYear()}-${month}`; // 2026-02
}

function Analytics() {
  const records = useRecords();

  const monthly = useMemo(() => {
    const map = {};
    for (const r of records) {
      const key = monthKey(r.dateTimeISO);
      if (!map[key]) map[key] = { units: 0, cost: 0 };
      map[key].units += r.units || 0;
      map[key].cost += r.amount || 0;
    }
    return Object.entries(map)
      .map(([month, v]) => ({
        month,
        units: Number(v.units.toFixed(2)),
        cost: Number(v.cost.toFixed(2)),
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [records]);

  const stats = useMemo(() => {
    if (!records.length) return null;
    const totalUnits = records.reduce((s, r) => s + (r.units || 0), 0);
    const totalSpent = records.reduce((s, r) => s + (r.amount || 0), 0);
    const avgCostPerKwh = totalUnits > 0 ? totalSpent / totalUnits : 0;
    return { totalUnits, totalSpent, avgCostPerKwh };
  }, [records]);

  if (!records.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-gray-600">
        No analytics yet. Add messages in SMS Input.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Analytics</h2>
        <p className="text-gray-600">Trends based on your usage</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Monthly Units</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Bar dataKey="units" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Monthly Cost</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Total Units
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.totalUnits.toFixed(1)} kWh
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Total Spent
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              KES {stats.totalSpent.toLocaleString()}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Avg Cost / kWh
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              KES {stats.avgCostPerKwh.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
