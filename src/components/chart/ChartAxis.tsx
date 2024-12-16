import React from 'react';
import { formatTraffic } from '../../utils/formatters';

interface ChartAxisProps {
  chartHeight: number;
  chartWidth: number;
  maxTraffic: number;
  getY: (value: number) => number;
}

export function ChartAxis({ chartHeight, chartWidth, maxTraffic, getY }: ChartAxisProps) {
  return (
    <>
      <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#E5E7EB" />
      <line x1="0" y1="0" x2="0" y2={chartHeight} stroke="#E5E7EB" />
      
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
        const value = maxTraffic * ratio;
        const yPos = getY(value);
        
        // Skip if position is invalid
        if (isNaN(yPos)) return null;
        
        return (
          <text
            key={ratio}
            x="-5"
            y={yPos}
            textAnchor="end"
            alignmentBaseline="middle"
            className="text-xs fill-gray-500"
          >
            {formatTraffic(value)}
          </text>
        );
      })}
    </>
  );
}