import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Button, Card, Nav } from 'react-bootstrap';
import { 
  ReportHeader, 
  ReportSection, 
  MetricGrid, 
  TrafficOverview, 
  ChannelDistribution, 
  CampaignPerformance, 
  KpiTracking,
  ReportFooter
} from '../components/ReportComponents';

export default function Report() {
  const [reportData, setReportData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Load report data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('reportData');
    if (savedData) {
      setReportData(JSON.parse(savedData));
    }
  }, []);

  // If no data is loaded, show a message
  if (!reportData) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <h3>No report data found</h3>
          <p>Please go back and enter your report data first.</p>
          <Button href="/" variant="primary">Go Back</Button>
        </div>
      </div>
    );
  }

  // Format date range for display
  const dateRange = reportData.startDate && reportData.endDate 
    ? `${reportData.startDate} - ${reportData.endDate}` 
    : 'Date range not specified';

  // Filter analytics by category
  const getAnalyticsByCategory = (category) => {
    return reportData.analytics.filter(item => item.category === category && item.value);
  };

  // Get all analytics with values
  const getAnalyticsWithValues = () => {
    return reportData.analytics.filter(item => item.value);
  };

  // Add random change data for visualization purposes
  const addChangeData = (analytics) => {
    return analytics.map(item => {
      const randomChange = (Math.random() * 20 - 10).toFixed(1);
      return {
        ...item,
        change: `${Math.abs(randomChange)}%`,
        changeType: randomChange >= 0 ? 'positive' : 'negative'
      };
    });
  };

  // Sample KPIs for KPI tracking section
  const sampleKpis = [
    { label: 'Conversion Goal', value: 45, target: 50 },
    { label: 'Revenue Goal', value: 8500, target: 10000 },
    { label: 'Lead Generation', value: 120, target: 100 },
    { label: 'Email Signups', value: 250, target: 300 },
    { label: 'Social Engagement', value: 1800, target: 2000 },
    { label: 'Customer Retention', value: 85, target: 90 }
  ];

  return (
    <div>
      <Head>
        <title>{reportData.title || 'Marketing Report'} | Dynamic Report Generator</title>
        <meta name="description" content="Generated marketing report" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <div className="report-page-header" style={{ backgroundColor: reportData.brandColor }}>
          <Container>
            <div className="d-flex justify-content-between align-items-center py-3">
              <h1 className="text-white mb-0">Report Dashboard</h1>
              <div>
                <Button variant="outline-light" className="me-2" onClick={() => window.print()}>
                  Export PDF
                </Button>
                <Button variant="light" href="/">
                  Back to Editor
                </Button>
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-5">
          <Card className="mb-4">
            <Card.Body>
              <ReportHeader 
                title={reportData.title || 'Marketing Report'} 
                dateRange={dateRange}
                logo={reportData.logo}
                brandColor={reportData.brandColor}
              />

              <Nav 
                variant="tabs" 
                className="mb-4" 
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
              >
                <Nav.Item>
                  <Nav.Link eventKey="overview">Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="traffic">Traffic</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="ppc">PPC Performance</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="social">Social Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="goals">Goals & KPIs</Nav.Link>
                </Nav.Item>
              </Nav>

              {activeTab === 'overview' && (
                <>
                  <ReportSection 
                    title="Performance Overview" 
                    subtitle="Key metrics at a glance"
                  >
                    <MetricGrid 
                      metrics={addChangeData(getAnalyticsWithValues().slice(0, 8))} 
                      primaryColor={reportData.brandColor}
                    />
                  </ReportSection>

                  <ReportSection 
                    title="Traffic & Conversion Trends" 
                    subtitle="Visualizing your performance over time"
                  >
                    <TrafficOverview 
                      primaryColor={reportData.brandColor}
                      secondaryColor={reportData.secondaryColor}
                    />
                  </ReportSection>

                  <ReportSection 
                    title="Channel Distribution" 
                    subtitle="Understanding your traffic sources"
                  >
                    <ChannelDistribution primaryColor={reportData.brandColor} />
                  </ReportSection>
                </>
              )}

              {activeTab === 'traffic' && (
                <>
                  <ReportSection 
                    title="Traffic Metrics" 
                    subtitle="Detailed traffic performance analysis"
                  >
                    <MetricGrid 
                      metrics={addChangeData(getAnalyticsByCategory('Traffic'))} 
                      primaryColor={reportData.brandColor}
                    />
                    <TrafficOverview 
                      primaryColor={reportData.brandColor}
                      secondaryColor={reportData.secondaryColor}
                    />
                  </ReportSection>

                  <ReportSection 
                    title="Traffic Sources" 
                    subtitle="Breakdown of traffic by source"
                  >
                    <ChannelDistribution primaryColor={reportData.brandColor} />
                  </ReportSection>
                </>
              )}

              {activeTab === 'ppc' && (
                <>
                  <ReportSection 
                    title="PPC Performance" 
                    subtitle="Paid advertising metrics and campaign performance"
                  >
                    <MetricGrid 
                      metrics={addChangeData(getAnalyticsByCategory('PPC'))} 
                      primaryColor={reportData.brandColor}
                    />
                  </ReportSection>

                  <ReportSection 
                    title="Campaign Performance" 
                    subtitle="Detailed breakdown by campaign"
                  >
                    <CampaignPerformance />
                  </ReportSection>
                </>
              )}

              {activeTab === 'social' && (
                <>
                  <ReportSection 
                    title="Social Media Performance" 
                    subtitle="Engagement and conversion metrics from social channels"
                  >
                    <MetricGrid 
                      metrics={addChangeData(getAnalyticsByCategory('Social'))} 
                      primaryColor={reportData.brandColor}
                    />
                  </ReportSection>
                </>
              )}

              {activeTab === 'goals' && (
                <>
                  <ReportSection 
                    title="Goals & KPIs" 
                    subtitle="Tracking progress against targets"
                  >
                    <KpiTracking 
                      kpis={sampleKpis} 
                      primaryColor={reportData.brandColor}
                    />
                  </ReportSection>
                </>
              )}

              <ReportFooter 
                companyName="Your Company" 
                generatedDate={new Date().toLocaleDateString()}
                brandColor={reportData.brandColor}
              />
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  );
}
