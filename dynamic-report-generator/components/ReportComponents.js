import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DataTable from './DataTable';
import MetricCard from './MetricCard';

// Component for report sections
export const ReportSection = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`report-section mb-5 ${className}`}>
      <div className="section-header mb-4">
        <h3 className="section-title gradient-text">{title}</h3>
        {subtitle && <p className="section-subtitle text-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

// Component for metric grid
export const MetricGrid = ({ metrics, primaryColor }) => {
  return (
    <Row className="mb-4">
      {metrics.map((metric, index) => (
        <Col lg={3} md={6} sm={6} key={index} className="mb-3">
          <MetricCard
            title={metric.label}
            value={metric.value}
            unit={metric.unit || ''}
            change={metric.change || null}
            changeType={metric.changeType || 'neutral'}
            color={primaryColor}
          />
        </Col>
      ))}
    </Row>
  );
};

// Component for traffic overview with bar and line charts
export const TrafficOverview = ({ data, primaryColor, secondaryColor }) => {
  // Sample data for bar chart
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sessions',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: primaryColor,
      },
      {
        label: 'Conversions',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: secondaryColor,
      },
    ],
  };

  // Sample data for line chart
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bounce Rate',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: primaryColor,
        backgroundColor: `${primaryColor}20`,
        fill: true,
      },
    ],
  };

  return (
    <Row>
      <Col lg={6} className="mb-4">
        <Card className="h-100">
          <Card.Header>
            <h5 className="mb-0">Sessions & Conversions</h5>
          </Card.Header>
          <Card.Body>
            <BarChart data={barData} height={300} />
          </Card.Body>
        </Card>
      </Col>
      <Col lg={6} className="mb-4">
        <Card className="h-100">
          <Card.Header>
            <h5 className="mb-0">Bounce Rate Trend</h5>
          </Card.Header>
          <Card.Body>
            <LineChart data={lineData} height={300} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

// Component for channel distribution with pie chart
export const ChannelDistribution = ({ data, primaryColor }) => {
  // Sample data for pie chart
  const pieData = {
    labels: ['Organic', 'Paid', 'Social', 'Direct', 'Referral'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          '#0a4b78',
          '#6c8eaf',
          '#13f1fc',
          '#28a745',
          '#ffc107',
        ],
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  // Sample data for table
  const tableHeaders = ['Channel', 'Sessions', 'Conversions', 'Conv. Rate'];
  const tableData = [
    ['Organic', '1,234', '56', '4.5%'],
    ['Paid', '987', '43', '4.4%'],
    ['Social', '765', '32', '4.2%'],
    ['Direct', '543', '21', '3.9%'],
    ['Referral', '321', '10', '3.1%'],
  ];

  return (
    <Row>
      <Col lg={5} className="mb-4">
        <Card className="h-100">
          <Card.Header>
            <h5 className="mb-0">Traffic Sources</h5>
          </Card.Header>
          <Card.Body>
            <PieChart data={pieData} height={300} />
          </Card.Body>
        </Card>
      </Col>
      <Col lg={7} className="mb-4">
        <Card className="h-100">
          <Card.Header>
            <h5 className="mb-0">Channel Performance</h5>
          </Card.Header>
          <Card.Body>
            <DataTable headers={tableHeaders} data={tableData} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

// Component for campaign performance table
export const CampaignPerformance = ({ data }) => {
  // Sample data for table
  const tableHeaders = ['Campaign', 'Impressions', 'Clicks', 'CTR', 'Cost', 'Conv.', 'CPA'];
  const tableData = [
    ['Brand Awareness', '125,432', '3,456', '2.75%', '$1,234.56', '43', '$28.71'],
    ['Retargeting', '98,765', '4,321', '4.38%', '$876.54', '65', '$13.49'],
    ['Product Launch', '87,654', '2,345', '2.68%', '$765.43', '32', '$23.92'],
    ['Seasonal Promotion', '76,543', '1,987', '2.60%', '$654.32', '28', '$23.37'],
    ['Competitor Keywords', '65,432', '1,234', '1.89%', '$543.21', '15', '$36.21'],
  ];

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">Campaign Performance</h5>
      </Card.Header>
      <Card.Body>
        <DataTable headers={tableHeaders} data={tableData} />
      </Card.Body>
    </Card>
  );
};

// Component for KPI tracking with progress indicators
export const KpiTracking = ({ kpis, primaryColor }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">KPI Tracking</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          {kpis.map((kpi, index) => (
            <Col lg={4} md={6} key={index} className="mb-3">
              <div className="kpi-progress-card">
                <div className="kpi-title">{kpi.label}</div>
                <div className="kpi-values">
                  <span className="kpi-current">{kpi.value}</span>
                  <span className="kpi-target">/ {kpi.target}</span>
                </div>
                <div className="progress">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ 
                      width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%`,
                      backgroundColor: primaryColor
                    }} 
                    aria-valuenow={kpi.value} 
                    aria-valuemin="0" 
                    aria-valuemax={kpi.target}
                  ></div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

// Component for report header
export const ReportHeader = ({ title, dateRange, logo, brandColor }) => {
  return (
    <div className="report-header mb-5">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1 className="report-title" style={{ color: brandColor }}>{title}</h1>
          {dateRange && <p className="report-date-range">{dateRange}</p>}
        </div>
        {logo && (
          <div className="report-logo">
            <img src={logo} alt="Company Logo" style={{ maxHeight: '60px', maxWidth: '180px' }} />
          </div>
        )}
      </div>
      <hr className="mt-4" />
    </div>
  );
};

// Component for report footer
export const ReportFooter = ({ companyName, generatedDate, brandColor }) => {
  return (
    <div className="report-footer mt-5 pt-4 border-top">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="mb-0 text-muted">
            {companyName ? `Generated for ${companyName}` : 'Generated report'}
          </p>
        </div>
        <div>
          <p className="mb-0 text-muted">
            {generatedDate ? `Generated on ${generatedDate}` : `Generated on ${new Date().toLocaleDateString()}`}
          </p>
        </div>
      </div>
    </div>
  );
};
