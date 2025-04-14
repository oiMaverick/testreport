import React, { useState } from 'react';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import { ReportTemplateSelector, ReportLayoutSelector } from './TemplateComponents';

const TemplateModal = ({ show, onHide, onApplyTemplate, selectedTemplate, setSelectedTemplate }) => {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedLayout, setSelectedLayout] = useState('standard');

  const handleApply = () => {
    onApplyTemplate(selectedTemplate, selectedLayout);
    onHide();
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      size="xl"
      centered
      dialogClassName="template-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Report Templates</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="templates" title="Templates">
            <ReportTemplateSelector 
              onSelect={setSelectedTemplate} 
              selectedTemplate={selectedTemplate} 
            />
          </Tab>
          <Tab eventKey="layouts" title="Layouts">
            <ReportLayoutSelector 
              onSelect={setSelectedLayout} 
              selectedLayout={selectedLayout} 
            />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleApply}
          disabled={!selectedTemplate}
        >
          Apply Template
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TemplateModal;
