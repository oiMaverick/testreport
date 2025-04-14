import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

// Form Section Component
export const FormSection = ({ title, children }) => {
  return (
    <div className="form-section">
      <h5 className="form-section-title">{title}</h5>
      {children}
    </div>
  );
};

// Input Field Component
export const InputField = ({ label, name, value, onChange, placeholder, required = false, type = 'text' }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}{required && <span className="text-danger">*</span>}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </Form.Group>
  );
};

// Date Range Field Component
export const DateRangeField = ({ 
  label, 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange, 
  startName = 'startDate', 
  endName = 'endDate',
  required = false 
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}{required && <span className="text-danger">*</span>}</Form.Label>
      <Row>
        <Col>
          <Form.Control
            type="date"
            name={startName}
            value={startDate}
            onChange={onStartDateChange}
            placeholder="Start Date"
            required={required}
          />
        </Col>
        <Col>
          <Form.Control
            type="date"
            name={endName}
            value={endDate}
            onChange={onEndDateChange}
            placeholder="End Date"
            required={required}
          />
        </Col>
      </Row>
    </Form.Group>
  );
};

// Color Field Component
export const ColorField = ({ label, name, value, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div className="d-flex align-items-center">
        <Form.Control
          type="color"
          name={name}
          value={value}
          onChange={onChange}
          title={`Choose ${label}`}
          style={{ width: '100%', height: '38px' }}
        />
      </div>
    </Form.Group>
  );
};

// File Field Component
export const FileField = ({ onChange, accept = '*/*' }) => {
  return (
    <Form.Control
      type="file"
      onChange={onChange}
      accept={accept}
      className="form-control"
    />
  );
};

// Toggle Switch Component
export const ToggleSwitch = ({ label, checked, onChange, name }) => {
  return (
    <Form.Group className="mb-3 d-flex align-items-center">
      <Form.Check 
        type="switch"
        id={`switch-${name}`}
        label={label}
        checked={checked}
        onChange={onChange}
        name={name}
        className="me-2"
      />
    </Form.Group>
  );
};

// Select Field Component
export const SelectField = ({ label, name, value, onChange, options, required = false }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}{required && <span className="text-danger">*</span>}</Form.Label>
      <Form.Select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

// Metric Card Component
export const MetricCard = ({ title, value, unit, change, changeType, color }) => {
  return (
    <div className="metric-card">
      <div className="metric-title">{title}</div>
      <div className="metric-value" style={{ color }}>
        {value}{unit}
      </div>
      {change && (
        <div className={`metric-change ${changeType}`}>
          <span>{changeType === 'positive' ? '↑' : '↓'} {change}</span>
        </div>
      )}
    </div>
  );
};

// Template Card Component
export const TemplateCard = ({ template, selected, onClick }) => {
  return (
    <div 
      className={`template-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <h5 className="template-card-title">{template.name}</h5>
      <p className="template-card-description">{template.description}</p>
      <div className="mt-2">
        <small className="text-muted">
          {template.metrics.length} metrics • {template.categories.join(', ')}
        </small>
      </div>
    </div>
  );
};

// Section Header Component
export const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="section-header mb-4">
      <h3 className="section-title gradient-text">{title}</h3>
      {subtitle && <p className="section-subtitle text-muted">{subtitle}</p>}
    </div>
  );
};

// Data Table Component
export const DataTable = ({ headers, data }) => {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// KPI Badge Component
export const KpiBadge = ({ value, target, label, color }) => {
  const percentage = (value / target) * 100;
  const status = percentage >= 100 ? 'success' : percentage >= 75 ? 'warning' : 'danger';
  
  return (
    <div className={`kpi-badge kpi-${status}`}>
      <div className="kpi-progress">
        <div 
          className="kpi-progress-bar" 
          style={{ 
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: color
          }}
        ></div>
      </div>
      <div className="kpi-content">
        <div className="kpi-label">{label}</div>
        <div className="kpi-values">
          <span className="kpi-current">{value}</span>
          <span className="kpi-target">/ {target}</span>
        </div>
      </div>
    </div>
  );
};

// Integration Badge Component
export const IntegrationBadge = ({ name, icon, connected = true }) => {
  return (
    <div className={`integration-badge ${connected ? 'connected' : 'disconnected'}`}>
      <div className="integration-icon">{icon}</div>
      <div className="integration-name">{name}</div>
      <div className="integration-status">
        {connected ? 'Connected' : 'Disconnected'}
      </div>
    </div>
  );
};
