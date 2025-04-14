import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Form, Button, Card, Tabs, Tab, Modal } from 'react-bootstrap';
import { FormSection, InputField, DateRangeField, ColorField, FileField, ToggleSwitch, SelectField } from '../components/FormComponents';
import Link from 'next/link';
import TemplateModal from '../components/TemplateModal';
import { reportTemplates } from '../components/TemplateComponents';

export default function Home() {
  // Basic report information
  const [reportInfo, setReportInfo] = useState({
    title: 'Digital Marketing Report',
    startDate: '',
    endDate: '',
    brandColor: '#0a4b78',
    secondaryColor: '#6c8eaf',
    accentColor: '#13f1fc',
    logo: null,
    showLogo: true,
    theme: 'standard',
    layout: 'standard',
    template: 'custom',
    clientName: '',
    clientWebsite: '',
    reportFrequency: 'monthly',
    includeComparisons: true,
    includeTrends: true,
    includeGoals: true
  });
  
  // Custom analytics entries (dynamic fields)
  const [analytics, setAnalytics] = useState([
    { id: 1, label: 'Total Sessions', value: '', category: 'Traffic' },
    { id: 2, label: 'Bounce Rate', value: '', unit: '%', category: 'Traffic' },
    { id: 3, label: 'Conversions', value: '', category: 'Traffic' },
    { id: 4, label: 'Conversion Rate', value: '', unit: '%', category: 'Traffic' },
    { id: 5, label: 'Ad Spend', value: '', unit: '$', category: 'PPC' },
    { id: 6, label: 'Clicks', value: '', category: 'PPC' },
    { id: 7, label: 'Cost Per Click', value: '', unit: '$', category: 'PPC' },
    { id: 8, label: 'Impressions', value: '', category: 'PPC' }
  ]);
  
  // New analytic entry being added
  const [newAnalytic, setNewAnalytic] = useState({
    label: '',
    value: '',
    unit: '',
    category: 'Custom'
  });
  
  const [logoPreview, setLogoPreview] = useState(null);
  const [nextId, setNextId] = useState(9); // For generating unique IDs
  const [activeTab, setActiveTab] = useState('data');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showDataSourcesModal, setShowDataSourcesModal] = useState(false);
  const [connectedDataSources, setConnectedDataSources] = useState([]);

  // Available themes
  const themes = [
    { id: 'standard', name: 'Standard', primary: '#0a4b78', secondary: '#6c8eaf', accent: '#13f1fc' },
    { id: 'dark', name: 'Dark Mode', primary: '#141e30', secondary: '#243b55', accent: '#fd7e14' },
    { id: 'light', name: 'Light Mode', primary: '#f5f7fa', secondary: '#c3cfe2', accent: '#0dcaf0' },
    { id: 'corporate', name: 'Corporate', primary: '#0a4b78', secondary: '#6c8eaf', accent: '#d4af37' },
    { id: 'creative', name: 'Creative', primary: '#6f42c1', secondary: '#e83e8c', accent: '#20c997' }
  ];

  // Available layouts
  const layouts = [
    { id: 'standard', name: 'Standard' },
    { id: 'compact', name: 'Compact' },
    { id: 'expanded', name: 'Expanded' },
    { id: 'grid', name: 'Grid' },
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'presentation', name: 'Presentation' }
  ];

  // Available report frequencies
  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'custom', label: 'Custom' }
  ];

  // Available data sources
  const dataSources = [
    { id: 'google-ads', name: 'Google Ads', icon: '🔍', connected: false },
    { id: 'meta-ads', name: 'Meta Ads', icon: '📱', connected: false },
    { id: 'google-analytics', name: 'Google Analytics', icon: '📊', connected: false },
    { id: 'search-console', name: 'Search Console', icon: '🔎', connected: false },
    { id: 'linkedin-ads', name: 'LinkedIn Ads', icon: '💼', connected: false },
    { id: 'twitter-ads', name: 'Twitter Ads', icon: '🐦', connected: false },
    { id: 'tiktok-ads', name: 'TikTok Ads', icon: '🎵', connected: false },
    { id: 'shopify', name: 'Shopify', icon: '🛒', connected: false },
    { id: 'mailchimp', name: 'Mailchimp', icon: '📧', connected: false }
  ];

  // Handle basic report info changes
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setReportInfo({
      ...reportInfo,
      [name]: value
    });
  };

  // Handle toggle changes
  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setReportInfo({
      ...reportInfo,
      [name]: checked
    });
  };

  // Handle theme selection
  const handleThemeChange = (e) => {
    const themeId = e.target.value;
    const selectedTheme = themes.find(theme => theme.id === themeId);
    
    if (selectedTheme) {
      setReportInfo({
        ...reportInfo,
        theme: themeId,
        brandColor: selectedTheme.primary,
        secondaryColor: selectedTheme.secondary,
        accentColor: selectedTheme.accent
      });
    }
  };

  // Handle file upload for logo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReportInfo({
        ...reportInfo,
        logo: file
      });
      
      // Create a preview URL for the logo
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle changes to existing analytics
  const handleAnalyticChange = (id, field, value) => {
    setAnalytics(analytics.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Handle changes to new analytic being added
  const handleNewAnalyticChange = (field, value) => {
    setNewAnalytic({
      ...newAnalytic,
      [field]: value
    });
  };

  // Add a new analytic to the list
  const addAnalytic = () => {
    if (newAnalytic.label.trim() && newAnalytic.value.trim()) {
      setAnalytics([
        ...analytics,
        { 
          id: nextId, 
          label: newAnalytic.label, 
          value: newAnalytic.value,
          unit: newAnalytic.unit,
          category: newAnalytic.category
        }
      ]);
      
      // Reset the new analytic form and increment the ID counter
      setNewAnalytic({
        label: '',
        value: '',
        unit: '',
        category: 'Custom'
      });
      setNextId(nextId + 1);
    }
  };

  // Remove an analytic from the list
  const removeAnalytic = (id) => {
    setAnalytics(analytics.filter(item => item.id !== id));
  };

  // Toggle data source connection
  const toggleDataSource = (id) => {
    if (connectedDataSources.includes(id)) {
      setConnectedDataSources(connectedDataSources.filter(sourceId => sourceId !== id));
    } else {
      setConnectedDataSources([...connectedDataSources, id]);
    }
  };

  // Apply a template
  const applyTemplate = (templateId, layoutId) => {
    const template = reportTemplates.find(t => t.id === templateId);
    if (template) {
      // Create analytics based on template metrics
      const newAnalytics = template.metrics.map((metric, index) => {
        const category = metric.includes('Conversion') ? 'Conversions' :
                        metric.includes('Cost') || metric.includes('CPC') || metric.includes('CPA') || metric.includes('ROAS') ? 'PPC' :
                        metric.includes('Session') || metric.includes('Bounce') ? 'Traffic' :
                        metric.includes('Engagement') || metric.includes('Followers') || metric.includes('Reach') ? 'Social' :
                        metric.includes('Revenue') || metric.includes('Transaction') || metric.includes('AOV') ? 'E-commerce' :
                        'Custom';
        
        const unit = metric.includes('Rate') || metric.includes('CTR') || metric.includes('ROAS') ? '%' :
                    metric.includes('Cost') || metric.includes('CPC') || metric.includes('CPA') || metric.includes('Revenue') ? '$' :
                    '';
        
        return {
          id: index + 1,
          label: metric,
          value: '',
          unit: unit,
          category: category
        };
      });
      
      setAnalytics(newAnalytics);
      setNextId(newAnalytics.length + 1);
      setReportInfo({
        ...reportInfo,
        template: templateId,
        layout: layoutId || reportInfo.layout,
        title: template.name
      });
    }
  };

  // Get all unique categories
  const categories = [...new Set(analytics.map(item => item.category))];

  // Prepare report data for preview and export
  const reportData = {
    ...reportInfo,
    analytics: analytics,
    logo: logoPreview,
    connectedDataSources: connectedDataSources
  };

  // Store report data in localStorage for the report page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('reportData', JSON.stringify(reportData));
    }
  }, [reportInfo, analytics, logoPreview, connectedDataSources]);

  return (
    <div>
      <Head>
        <title>Dynamic Report Generator - Google PMax & Meta Ads</title>
        <meta name="description" content="Generate dynamic reports for Google PMax and Meta ads" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <div className="app-header">
          <Container>
            <h1 className="gradient-text">Dynamic Report Generator</h1>
            <p className="lead">Create professional reports for Google PMax and Meta ads campaigns</p>
          </Container>
        </div>

        <Container className="mb-5">
          <Row>
            <Col lg={5} className="mb-4">
              <Card>
                <Card.Header as="h5">
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-0"
                  >
                    <Tab eventKey="data" title="Data Input">
                    </Tab>
                    <Tab eventKey="appearance" title="Appearance">
                    </Tab>
                    <Tab eventKey="settings" title="Settings">
                    </Tab>
                  </Tabs>
                </Card.Header>
                <Card.Body>
                  {activeTab === 'data' && (
                    <Form>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Report Data</h5>
                        <div>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            className="me-2"
                            onClick={() => setShowDataSourcesModal(true)}
                          >
                            Connect Data Sources
                          </Button>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => setShowTemplateModal(true)}
                          >
                            Choose Template
                          </Button>
                        </div>
                      </div>
                      
                      <FormSection title="Report Information">
                        <InputField 
                          label="Report Title"
                          name="title"
                          value={reportInfo.title}
                          onChange={handleInfoChange}
                          placeholder="Digital Marketing Report"
                          required
                        />
                        
                        <DateRangeField 
                          label="Date Range"
                          startDate={reportInfo.startDate}
                          endDate={reportInfo.endDate}
                          onStartDateChange={handleInfoChange}
                          onEndDateChange={handleInfoChange}
                          startName="startDate"
                          endName="endDate"
                          required
                        />

                        <Row>
                          <Col md={6}>
                            <InputField 
                              label="Client Name"
                              name="clientName"
                              value={reportInfo.clientName}
                              onChange={handleInfoChange}
                              placeholder="Client Name"
                            />
                          </Col>
                          <Col md={6}>
                            <InputField 
                              label="Client Website"
                              name="clientWebsite"
                              value={reportInfo.clientWebsite}
                              onChange={handleInfoChange}
                              placeholder="www.example.com"
                            />
                          </Col>
                        </Row>

                        <SelectField
                          label="Report Frequency"
                          name="reportFrequency"
                          value={reportInfo.reportFrequency}
                          onChange={handleInfoChange}
                          options={frequencies}
                        />
                      </FormSection>
                      
                      {/* Connected Data Sources */}
                      {connectedDataSources.length > 0 && (
                        <FormSection title="Connected Data Sources">
                          <div className="connected-sources-list">
                            {connectedDataSources.map(sourceId => {
                              const source = dataSources.find(s => s.id === sourceId);
                              return (
                                <div key={sourceId} className="connected-source-badge">
                                  <span className="source-icon">{source.icon}</span>
                                  <span className="source-name">{source.name}</span>
                                  <Button 
                                    variant="link" 
                                    size="sm" 
                                    className="source-disconnect"
                                    onClick={() => toggleDataSource(sourceId)}
                                  >
                                    ✕
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        </FormSection>
                      )}
                      
                      {/* Existing Analytics */}
                      {categories.map(category => (
                        <FormSection key={category} title={`${category} Metrics`}>
                          {analytics
                            .filter(item => item.category === category)
                            .map(analytic => (
                              <div key={analytic.id} className="mb-3">
                                <Form.Group>
                                  <Form.Label>{analytic.label}{analytic.unit ? ` (${analytic.unit})` : ''}</Form.Label>
                                  <div className="d-flex">
                                    <Form.Control
                                      type="text"
                                      value={analytic.value}
                                      onChange={(e) => handleAnalyticChange(analytic.id, 'value', e.target.value)}
                                      placeholder="Enter value"
                                    />
                                    <Button 
                                      variant="outline-danger" 
                                      onClick={() => removeAnalytic(analytic.id)}
                                      className="ms-2"
                                    >
                                      ✕
                                    </Button>
                                  </div>
                                </Form.Group>
                              </div>
                            ))}
                        </FormSection>
                      ))}
                      
                      {/* Add New Analytic */}
                      <FormSection title="Add New Metric">
                        <Row className="mb-3">
                          <Col>
                            <Form.Group>
                              <Form.Label>Category</Form.Label>
                              <Form.Select
                                value={newAnalytic.category}
                                onChange={(e) => handleNewAnalyticChange('category', e.target.value)}
                              >
                                <option value="Traffic">Traffic</option>
                                <option value="PPC">PPC</option>
                                <option value="SEO">SEO</option>
                                <option value="Social">Social</option>
                                <option value="Conversions">Conversions</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Custom">Custom</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Row className="mb-3">
                          <Col md={5}>
                            <Form.Group>
                              <Form.Label>Metric Name</Form.Label>
                              <Form.Control
                                type="text"
                                value={newAnalytic.label}
                                onChange={(e) => handleNewAnalyticChange('label', e.target.value)}
                                placeholder="e.g., CTR"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={5}>
                            <Form.Group>
                              <Form.Label>Value</Form.Label>
                              <Form.Control
                                type="text"
                                value={newAnalytic.value}
                                onChange={(e) => handleNewAnalyticChange('value', e.target.value)}
                                placeholder="e.g., 2.5"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={2}>
                            <Form.Group>
                              <Form.Label>Unit</Form.Label>
                              <Form.Control
                                type="text"
                                value={newAnalytic.unit}
                                onChange={(e) => handleNewAnalyticChange('unit', e.target.value)}
                                placeholder="e.g., %"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Button 
                          variant="primary" 
                          onClick={addAnalytic}
                          disabled={!newAnalytic.label.trim() || !newAnalytic.value.trim()}
                          className="w-100"
                        >
                          Add Metric
                        </Button>
                      </FormSection>
                    </Form>
                  )}
                  
                  {activeTab === 'appearance' && (
                    <Form>
                      <FormSection title="Branding">
                        <Form.Group className="mb-3">
                          <Form.Label>Logo</Form.Label>
                          <FileField 
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                          {logoPreview && (
                            <div className="mt-2">
                              <img 
                                src={logoPreview} 
                                alt="Logo Preview" 
                                style={{ maxHeight: '60px', maxWidth: '100%' }} 
                              />
                            </div>
                          )}
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox"
                            id="showLogo"
                            label="Show Logo in Report"
                            checked={reportInfo.showLogo}
                            onChange={(e) => setReportInfo({
                              ...reportInfo,
                              showLogo: e.target.checked
                            })}
                          />
                        </Form.Group>
                      </FormSection>
                      
                      <FormSection title="Theme">
                        <Form.Group className="mb-3">
                          <Form.Label>Select Theme</Form.Label>
                          <Form.Select
                            name="theme"
                            value={reportInfo.theme}
                            onChange={handleThemeChange}
                          >
                            {themes.map(theme => (
                              <option key={theme.id} value={theme.id}>
                                {theme.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        
                        <Row className="mb-3">
                          <Col md={4}>
                            <ColorField 
                              label="Primary Color"
                              name="brandColor"
                              value={reportInfo.brandColor}
                              onChange={handleInfoChange}
                            />
                          </Col>
                          <Col md={4}>
                            <ColorField 
                              label="Secondary Color"
                              name="secondaryColor"
                              value={reportInfo.secondaryColor}
                              onChange={handleInfoChange}
                            />
                          </Col>
                          <Col md={4}>
                            <ColorField 
                              label="Accent Color"
                              name="accentColor"
                              value={reportInfo.accentColor}
                              onChange={handleInfoChange}
                            />
                          </Col>
                        </Row>
                      </FormSection>
                      
                      <FormSection title="Layout">
                        <Form.Group className="mb-3">
                          <Form.Label>Report Layout</Form.Label>
                          <Form.Select
                            name="layout"
                            value={reportInfo.layout}
                            onChange={handleInfoChange}
                          >
                            {layouts.map(layout => (
                              <option key={layout.id} value={layout.id}>
                                {layout.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </FormSection>
                    </Form>
                  )}

                  {activeTab === 'settings' && (
                    <Form>
                      <FormSection title="Report Settings">
                        <ToggleSwitch
                          label="Include Period Comparisons"
                          checked={reportInfo.includeComparisons}
                          onChange={handleToggleChange}
                          name="includeComparisons"
                        />
                        
                        <ToggleSwitch
                          label="Include Trend Analysis"
                          checked={reportInfo.includeTrends}
                          onChange={handleToggleChange}
                          name="includeTrends"
                        />
                        
                        <ToggleSwitch
                          label="Include Goals & KPIs"
                          checked={reportInfo.includeGoals}
                          onChange={handleToggleChange}
                          name="includeGoals"
                        />
                      </FormSection>

                      <FormSection title="Delivery Options">
                        <Form.Group className="mb-3">
                          <Form.Label>Report Format</Form.Label>
                          <div>
                            <Form.Check
                              inline
                              type="radio"
                              id="format-online"
                              name="reportFormat"
                              label="Online Dashboard"
                              defaultChecked
                            />
                            <Form.Check
                              inline
                              type="radio"
                              id="format-pdf"
                              name="reportFormat"
                              label="PDF Document"
                            />
                            <Form.Check
                              inline
                              type="radio"
                              id="format-both"
                              name="reportFormat"
                              label="Both"
                            />
                          </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Scheduled Delivery</Form.Label>
                          <div>
                            <Form.Check
                              type="checkbox"
                              id="schedule-delivery"
                              label="Schedule automatic delivery"
                            />
                          </div>
                        </Form.Group>
                      </FormSection>
                    </Form>
                  )}
                </Card.Body>
              </Card>
              
              <div className="d-grid gap-2">
                <Link href="/report" passHref>
                  <Button variant="primary" size="lg">
                    Generate Full Report
                  </Button>
                </Link>
              </div>
            </Col>
            
            <Col lg={7}>
              <Card className="h-100">
                <Card.Header as="h5">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Live Preview</span>
                    <small className="text-muted">Updates in real-time as you input data</small>
                  </div>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="report-preview">
                    <div className="preview-header">
                      <div>
                        <h2 className="preview-title" style={{ color: reportInfo.brandColor }}>
                          {reportInfo.title || 'Digital Marketing Report'}
                        </h2>
                        <div className="preview-date">
                          {reportInfo.startDate && reportInfo.endDate 
                            ? `${reportInfo.startDate} - ${reportInfo.endDate}`
                            : 'Date Range: Not specified'}
                        </div>
                        {reportInfo.clientName && (
                          <div className="preview-client">
                            Client: {reportInfo.clientName}
                            {reportInfo.clientWebsite && ` (${reportInfo.clientWebsite})`}
                          </div>
                        )}
                      </div>
                      {reportInfo.showLogo && logoPreview && (
                        <img 
                          src={logoPreview} 
                          alt="Company Logo" 
                          className="preview-logo" 
                        />
                      )}
                    </div>
                    
                    <Row className="mb-4">
                      {analytics
                        .filter(item => item.value)
                        .slice(0, 4)
                        .map(analytic => (
                          <Col md={3} sm={6} key={analytic.id} className="mb-3">
                            <div className="metric-card">
                              <div className="metric-title">{analytic.label}</div>
                              <div className="metric-value" style={{ color: reportInfo.brandColor }}>
                                {analytic.value}{analytic.unit}
                              </div>
                              <div className="metric-change positive">
                                <span>↑ 12.5%</span>
                              </div>
                            </div>
                          </Col>
                        ))}
                    </Row>
                    
                    <div className="text-center mt-5 mb-3">
                      <p className="text-muted">
                        {analytics.filter(item => item.value).length === 0 
                          ? 'Add metrics to see them in the preview'
                          : 'Generate full report to see all visualizations'}
                      </p>
                      <Link href="/report" passHref>
                        <Button variant="outline-primary">
                          View Complete Report
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      {/* Template Selection Modal */}
      <TemplateModal
        show={showTemplateModal}
        onHide={() => setShowTemplateModal(false)}
        onApplyTemplate={applyTemplate}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />

      {/* Data Sources Modal */}
      <Modal 
        show={showDataSourcesModal} 
        onHide={() => setShowDataSourcesModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Connect Data Sources</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">
            Connect your data sources to automatically import metrics into your reports.
          </p>
          <Row>
            {dataSources.map(source => (
              <Col md={4} key={source.id} className="mb-3">
                <Card 
                  className={`data-source-card ${connectedDataSources.includes(source.id) ? 'connected' : ''}`}
                  onClick={() => toggleDataSource(source.id)}
                >
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="data-source-icon me-3">
                        {source.icon}
                      </div>
                      <div>
                        <h5 className="data-source-name mb-0">{source.name}</h5>
                        <small className="text-muted">
                          {connectedDataSources.includes(source.id) ? 'Connected' : 'Not connected'}
                        </small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDataSourcesModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
