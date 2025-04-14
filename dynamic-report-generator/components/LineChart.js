import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = ({ data, options, height = 300 }) => {
  // Default chart options
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 15,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            family: 'Inter',
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#0a4b78',
        bodyColor: '#343a40',
        borderColor: '#dee2e6',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: 'Inter',
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          family: 'Inter',
          size: 13
        },
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: '#f0f0f0'
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4, // Smoother curves
        borderWidth: 2
      },
      point: {
        radius: 3,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: 'white'
      }
    }
  };

  // Merge default options with custom options
  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className="chart-container" style={{ height: `${height}px` }}>
      <Line data={data} options={mergedOptions} />
    </div>
  );
};

export default LineChart;
