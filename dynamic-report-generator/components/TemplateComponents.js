import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

// Template data for different report types
const reportTemplates = [
  {
    id: 'google-ads',
    name: 'Google Ads Performance',
    description: 'Comprehensive Google Ads campaign performance report with conversion tracking and ROI analysis',
    thumbnail: '/preview-placeholder.png',
    sections: ['Overview', 'Campaign Performance', 'Ad Groups', 'Keywords', 'Conversions'],
    metrics: ['Impressions', 'Clicks', 'CTR', 'CPC', 'Cost', 'Conversions', 'CPA', 'ROAS']
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads Dashboard',
    description: 'Facebook and Instagram ads performance with audience insights and engagement metrics',
    thumbnail: '/preview-placeholder.png',
    sections: ['Overview', 'Campaign Performance', 'Audience Insights', 'Engagement', 'Conversions'],
    metrics: ['Impressions', 'Reach', 'Frequency', 'Clicks', 'CTR', 'CPC', 'Cost', 'Conversions']
  },
  {
    id: 'pmax-performance',
    name: 'Google PMax Performance',
    description: 'Performance Max campaign analysis with asset group performance and audience signals',
    thumbnail: '/preview-placeholder.png',
    sections: ['Overview', 'Asset Performance', 'Audience Signals', 'Conversions', 'Recommendations'],
    metrics: ['Impressions', 'Clicks', 'CTR', 'CPC', 'Cost', 'Conversions', 'CPA', 'ROAS']
  },
  {
    id: 'seo-performance',
    name: 'SEO Performance',
    description: 'Organic search performance with keyword rankings, traffic analysis, and content performance',
    thumbnail: '/preview-placeholder.png',
    sections: ['Overview', 'Keyword Rankings', 'Organic Traffic', 'Content Performance', 'Technical SEO'],
    metrics: ['Organic Sessions', 'Bounce Rate', 'Avg. Session Duration', 'Pages/Session', 'Conversions', 'Keyword Positions']
  },
  {
    id: 'social-media',
    name: 'Social Media Dashboard',
    description: 'Cross-platform social media performance with engagement metrics and audience growth',
    thumbnail: '/preview-placeholder.png',
    sections: ['Overview', 'Audience Growth', 'Engagement', 'Content Performance', 'Conversions'],
    metrics: ['Followers', 'Reach', 'Impressions', 'Engagement Rate', 'Clicks', 'Conversions']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Performance',
    description: 'Complete e-commerce analytics with sales, revenue, product performance, and customer metrics',
    thumbnail: '/preview-placeholder.png',
    sections: ['Overview', 'Sales & Revenue', 'Product Performance', 'Customer Metrics', 'Marketing Channels'],
    metrics: ['Revenue', 'Transactions', 'AOV', 'Conversion Rate', 'ROAS', 'Customer LTV', 'Cart Abandonment']
  }
];

// Component for template selection
const ReportTemplateSelector = ({ onSelect, selectedTemplate }) => {
  return (
    <div className="report-template-selector">
      <h4 className="mb-4">Choose a Report Template</h4>
      <Row>
        {reportTemplates.map((template) => (
          <Col lg={4} md={6} className="mb-4" key={template.id}>
            <Card 
              className={`template-card h-100 ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => onSelect(template.id)}
            >
              <Card.Body>
                <h5 className="template-card-title">{template.name}</h5>
                <p className="template-card-description">{template.description}</p>
                <div className="mt-3">
                  <small className="text-muted">
                    <strong>Sections:</strong> {template.sections.join(', ')}
                  </small>
                </div>
                <div className="mt-2">
                  <small className="text-muted">
                    <strong>Key Metrics:</strong> {template.metrics.join(', ')}
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-end mt-3">
        <Button 
          variant="outline-secondary" 
          className="me-2"
        >
          Cancel
        </Button>
        <Button 
          variant="primary"
          disabled={!selectedTemplate}
        >
          Use Template
        </Button>
      </div>
    </div>
  );
};

// Component for layout selection
const ReportLayoutSelector = ({ onSelect, selectedLayout }) => {
  const layouts = [
    { id: 'standard', name: 'Standard', description: 'Balanced layout with equal emphasis on all metrics' },
    { id: 'compact', name: 'Compact', description: 'Condensed layout with more metrics per row' },
    { id: 'expanded', name: 'Expanded', description: 'Spacious layout with focus on visualization' },
    { id: 'grid', name: 'Grid', description: 'Grid-based layout with uniform card sizes' },
    { id: 'dashboard', name: 'Dashboard', description: 'Interactive dashboard with tabbed sections' },
    { id: 'presentation', name: 'Presentation', description: 'Slide-like layout optimized for presentations' }
  ];

  return (
    <div className="report-layout-selector">
      <h4 className="mb-4">Choose a Report Layout</h4>
      <Row>
        {layouts.map((layout) => (
          <Col md={4} className="mb-4" key={layout.id}>
            <Card 
              className={`layout-card ${selectedLayout === layout.id ? 'selected' : ''}`}
              onClick={() => onSelect(layout.id)}
            >
              <Card.Body>
                <h5 className="layout-card-title">{layout.name}</h5>
                <p className="layout-card-description">{layout.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export { ReportTemplateSelector, ReportLayoutSelector, reportTemplates };
