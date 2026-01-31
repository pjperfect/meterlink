import { useState } from 'react';
import './UsageHistory.css';

export default function UsageHistory() {
  const [activeTimeframe, setActiveTimeframe] = useState('month');

  // Sample data for stats
  const stats = [
    {
      label: 'Current Balance',
      value: '234.5 kWh',
      icon: '⚡',
      change: '↑ 12%',
      changeType: 'positive',
      changeNote: 'vs last month',
      backgroundColor: '#e6fffa',
      iconColor: '#319795'
    },
    {
      label: 'Monthly Usage',
      value: '156.8 kWh',
      icon: '📊',
      change: '↓ 8%',
      changeType: 'negative',
      changeNote: 'from average',
      backgroundColor: '#fef5e7',
      iconColor: '#d69e2e'
    },
    {
      label: 'Estimated Cost',
      value: 'KES 3,140',
      icon: '💰',
      change: '↓ 5%',
      changeType: 'positive',
      changeNote: 'savings',
      backgroundColor: '#fce7f3',
      iconColor: '#d53f8c'
    },
    {
      label: 'Days Remaining',
      value: '~14 days',
      icon: '📅',
      change: 'Based on avg usage',
      changeType: 'neutral',
      backgroundColor: '#e0e7ff',
      iconColor: '#5a67d8'
    }
  ];

  // Sample activity data
  const activities = [
    {
      type: 'purchase',
      title: 'Token Purchase',
      date: 'Jan 20, 2026 • 10:34 AM',
      amount: '+89.5 kWh',
      icon: '⚡',
      backgroundColor: '#e6fffa',
      iconColor: '#319795'
    },
    {
      type: 'alert',
      title: 'High Usage Alert',
      date: 'Jan 18, 2026 • Daily usage exceeded 15 kWh',
      amount: '17.2 kWh',
      amountColor: '#c53030',
      icon: '⚠️',
      backgroundColor: '#fed7d7',
      iconColor: '#c53030',
      showBadge: true
    },
    {
      type: 'purchase',
      title: 'Token Purchase',
      date: 'Jan 15, 2026 • 3:22 PM',
      amount: '+120.0 kWh',
      icon: '⚡',
      backgroundColor: '#e6fffa',
      iconColor: '#319795'
    },
    {
      type: 'purchase',
      title: 'Token Purchase',
      date: 'Jan 8, 2026 • 8:15 AM',
      amount: '+95.0 kWh',
      icon: '⚡',
      backgroundColor: '#e6fffa',
      iconColor: '#319795'
    }
  ];

  return (
    <div className="usage-history-page">
      <div className="page-header">
        <h1 className="page-title">Usage History 📊</h1>
        <p className="page-subtitle">Track your electricity consumption and token purchases</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <span className="stat-label">{stat.label}</span>
              <div 
                className="stat-icon" 
                style={{ 
                  backgroundColor: stat.backgroundColor, 
                  color: stat.iconColor 
                }}
              >
                {stat.icon}
              </div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.changeType}`}>
              <span>{stat.change}</span>
              {stat.changeNote && (
                <span style={{ color: '#718096' }}>{stat.changeNote}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section - Placeholder */}
      <div className="chart-section">
        <div className="chart-header">
          <h2 className="chart-title">Usage Trends</h2>
          <div className="chart-controls">
            <button 
              className={`chart-btn ${activeTimeframe === 'week' ? 'active' : ''}`}
              onClick={() => setActiveTimeframe('week')}
            >
              Week
            </button>
            <button 
              className={`chart-btn ${activeTimeframe === 'month' ? 'active' : ''}`}
              onClick={() => setActiveTimeframe('month')}
            >
              Month
            </button>
            <button 
              className={`chart-btn ${activeTimeframe === 'year' ? 'active' : ''}`}
              onClick={() => setActiveTimeframe('year')}
            >
              Year
            </button>
          </div>
        </div>
        <div className="chart-placeholder">
          <p>Chart visualization (To be implemented)</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="activity-section">
        <h2 className="chart-title" style={{ marginBottom: '1.5rem' }}>
          Recent Token Purchases
        </h2>
        
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-info">
              <div 
                className="activity-icon" 
                style={{ 
                  backgroundColor: activity.backgroundColor, 
                  color: activity.iconColor 
                }}
              >
                {activity.icon}
              </div>
              <div className="activity-details">
                <h4>
                  {activity.title}
                  {activity.showBadge && <span className="alert-badge">Alert</span>}
                </h4>
                <p>{activity.date}</p>
              </div>
            </div>
            <div 
              className="activity-amount" 
              style={{ color: activity.amountColor || '#1a202c' }}
            >
              {activity.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
