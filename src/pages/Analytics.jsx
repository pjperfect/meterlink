import { useMemo } from "react";
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
} from "recharts";
import { loadRecords } from "../lib/storage.js";

function monthKey(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth() + 1}`;
}

export default function Analytics() {
  const records = useMemo(() => loadRecords(), []);

  const monthly = useMemo(() => {
    const map = {};
    for (const r of records) {
      const key = monthKey(r.dateTimeISO);
      if (!map[key]) map[key] = { units: 0, cost: 0 };
      map[key].units += r.units;
      map[key].cost += r.amount;
    }
    return Object.entries(map).map(([k, v]) => ({
      month: k,
      units: v.units,
      cost: v.cost,
    }));
  }, [records]);

  if (!records.length) {
    return (
      <div className="bg-white border rounded-lg p-6 text-gray-600">
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

      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Monthly Units</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="units" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Monthly Cost</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cost" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}