import React from 'react';
import { Table } from 'react-bootstrap';

const DataTable = ({ headers, data, striped = true, hover = true, responsive = true }) => {
  return (
    <div className="chart-container">
      <div className="table-responsive">
        <Table striped={striped} hover={hover} responsive={responsive} className="data-table">
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
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
