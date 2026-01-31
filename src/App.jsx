import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout.jsx';

import Dashboard from './pages/Dashboard.jsx';
import SmsInput from './pages/SmsInput.jsx';
import UsageHistory from './pages/UsageHistory.jsx';
import Analytics from './pages/Analytics.jsx';

function App(){
  return (
   <div > 
    <Dashboard/>

   </div>
  );
}
export default App;
