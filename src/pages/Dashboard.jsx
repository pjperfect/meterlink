import { useMemo } from 'react';
import { Zap, DollarSign, Calendar } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { loadRecords } from '../lib/storage.js';

function formatShortDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function Dashboard() {
  const records = useMemo(() => {
    const r = loadRecords();
    return [...r].sort((a, b) =>
      (b.dateTimeISO || '').localeCompare(a.dateTimeISO || '')
    );
  }, []);

  const summary = useMemo(() => {
    if (!records.length) {
      return {
        totalUnits: null,
        totalSpent: null,
        lastDate: null,
        lastUnits: null,
      };
    }
    const totalUnits = records.reduce((s, r) => s + (r.units || 0), 0);
    const totalSpent = records.reduce((s, r) => s + (r.amount || 0), 0);
    const latest = records[0];
    return {
      totalUnits,
      totalSpent,
      lastDate: latest?.dateTimeISO || null,
      lastUnits: latest?.units ?? null,
    };
  }, [records]);

  const chartData = useMemo(() => {
    if (!records.length) return [];
    const last = [...records].slice(0, 7).reverse();
    return last.map((r) => ({
      date: formatShortDate(r.dateTimeISO),
      units: r.units || 0,
    }));
  }, [records]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Overview of your electricity usage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Zap className="size-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">
              Total Units
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-semibold text-gray-900">
            {summary.totalUnits == null ? '—' : summary.totalUnits.toFixed(1)}
          </div>
          <p className="text-sm text-gray-500 mt-2">kWh purchased (all time)</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="size-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">
              Total Spent
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-semibold text-gray-900">
            {summary.totalSpent == null
              ? '—'
              : `KES ${summary.totalSpent.toLocaleString()}`}
          </div>
          <p className="text-sm text-gray-500 mt-2">Based on Amt</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="size-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">
              Last Purchase
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-semibold text-gray-900">
            {summary.lastDate ? formatShortDate(summary.lastDate) : '—'}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {summary.lastUnits == null
              ? 'No data yet'
              : `${summary.lastUnits.toFixed(1)} kWh added`}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Usage Trend
        </h3>

        {!chartData.length ? (
          <div className="h-56 flex items-center justify-center text-gray-500 border border-dashed rounded-lg">
            No chart data yet. Add messages in SMS Input.
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: '320px',
              minHeight: '320px',
              minWidth: '0',
            }}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={300}
              minHeight={320}
            >
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="units"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
