import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout.jsx';

import Dashboard from './pages/Dashboard.jsx';
import SmsInput from './pages/SmsInput.jsx';
import UsageHistory from './pages/UsageHistory.jsx';
import Analytics from './pages/Analytics.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/input" element={<SmsInput />} />
        <Route path="/history" element={<UsageHistory />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}
