import React from 'react';
import { Card } from 'react-bootstrap';

const MetricCard = ({ title, value, unit = '', change = null, changeType = 'neutral', color = '#0a4b78', icon = null }) => {
  // Determine change indicator and class
  let changeIndicator = '';
  let changeClass = 'neutral';
  
  if (change !== null) {
    if (changeType === 'positive' || (typeof changeType === 'string' && changeType.toLowerCase() === 'positive')) {
      changeIndicator = '↑';
      changeClass = 'positive';
    } else if (changeType === 'negative' || (typeof changeType === 'string' && changeType.toLowerCase() === 'negative')) {
      changeIndicator = '↓';
      changeClass = 'negative';
    }
  }

  return (
    <div className="metric-card">
      <div className="metric-title">
        {icon && <span className="metric-icon">{icon}</span>}
        {title}
      </div>
      <div className="metric-value" style={{ color }}>
        {value}{unit}
      </div>
      {change !== null && (
        <div className={`metric-change ${changeClass}`}>
          <span>{changeIndicator} {change}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
