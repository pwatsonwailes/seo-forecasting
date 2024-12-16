import React from 'react';
import { formatTraffic } from '../../utils/formatters';

interface ChartAxisProps {
  chartHeight: number;
  chartWidth: number;
  maxTraffic: number;
  getY: (value: number) => number;
}

export function ChartAxis({ chartHeight, chartWidth, maxTraffic, getY }: ChartAxisProps) {
  // Add more tick marks for better granularity
  const tickRatios = [0, 0.2, 0.4, 0.6, 0.8, 1];

  return (
    <>
      {/* Y-axis line */}
      <line x1="0" y1="0" x2="0" y2={chartHeight} stroke="#E5E7EB" />
      
      {/* X-axis line */}
      <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#E5E7EB" />
      
      {/* Y-axis label */}
      <text
        x="-40"
        y={chartHeight / 2}
        transform={`rotate(-90, -40, ${chartHeight / 2})`}
        textAnchor="middle"
        className="text-sm fill-gray-600 font-medium"
      >
        Monthly Traffic
      </text>
      
      {/* Grid lines and value labels */}
      {tickRatios.map((ratio) => {
        const value = maxTraffic * ratio;
        const yPos = getY(value);
        
        if (isNaN(yPos)) return null;
        
        return (
          <g key={ratio}>
            {/* Grid line */}
            <line
              x1="0"
              y1={yPos}
              x2={chartWidth}
              y2={yPos}
              stroke="#E5E7EB"
              strokeDasharray="4 4"
            />
            
            {/* Value label */}
            <text
              x="-8"
              y={yPos}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-xs fill-gray-500"
            >
              {formatTraffic(value)}
            </text>
          </g>
        );
      })}
    </>
  );
}