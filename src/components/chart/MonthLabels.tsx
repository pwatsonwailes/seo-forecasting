import React from 'react';

interface MonthLabelsProps {
  months: number[];
  chartHeight: number;
  getX: (month: number) => number;
}

export function MonthLabels({ months, chartHeight, getX }: MonthLabelsProps) {
  return (
    <>
      {months.map((month) => {
        const xPos = getX(month);
        
        // Skip if position is invalid
        if (isNaN(xPos)) return null;
        
        return (
          <text
            key={month}
            x={xPos}
            y={chartHeight + 20}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            M{month}
          </text>
        );
      })}
    </>
  );
}