import React from 'react';
import { Portfolio } from '../types';
import { interpolatePosition } from '../utils/trafficCalculator';

interface PositionChartProps {
  portfolios: Portfolio[];
}

export default function PositionChart({ portfolios }: PositionChartProps) {
  const chartHeight = 300;
  const chartWidth = 800;
  const margin = { left: 60, right: 20, top: 20, bottom: 40 }; // Increased bottom margin

  const getY = (position: number): number => {
    return margin.top + ((position - 1) / 30) * (chartHeight - margin.top - margin.bottom);
  };

  const getX = (month: number): number => {
    return margin.left + ((month / 12) * (chartWidth - margin.left - margin.right));
  };

  const months = Array.from({ length: 13 }, (_, i) => i);
  const positions = Array.from({ length: 7 }, (_, i) => i * 5 + 1);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Position Tracking</h2>
      
      <svg width={chartWidth} height={chartHeight + margin.bottom}>
        {/* Grid lines and position labels */}
        {positions.map(position => (
          <g key={position}>
            <line
              x1={margin.left}
              y1={getY(position)}
              x2={chartWidth - margin.right}
              y2={getY(position)}
              stroke="#E5E7EB"
              strokeDasharray="4 4"
            />
            <text
              x={margin.left - 8}
              y={getY(position)}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-xs fill-gray-500"
            >
              #{position}
            </text>
          </g>
        ))}

        {/* Month labels */}
        {months.map(month => (
          <text
            key={month}
            x={getX(month)}
            y={chartHeight + 20} // Added 20px gap between line and labels
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            M{month}
          </text>
        ))}

        {/* Portfolio position lines */}
        {portfolios.map((portfolio, index) => {
          const startPos = portfolio.startPosition ?? 30;
          const endPos = portfolio.endPosition ?? 30;
          
          const path = months
            .map(month => {
              const x = getX(month);
              const y = getY(interpolatePosition(startPos, endPos, month));
              return `${month === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');

          const color = [
            '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
            '#6366F1', '#EC4899', '#8B5CF6'
          ][index % 7];

          return (
            <g key={portfolio.heading}>
              <path
                d={path}
                stroke={color}
                strokeWidth="2"
                fill="none"
              />
              <text
                x={chartWidth - margin.right + 8}
                y={getY(endPos)}
                alignmentBaseline="middle"
                className="text-xs font-medium"
                fill={color}
              >
                {portfolio.heading}
              </text>
            </g>
          );
        })}

        {/* Axis lines */}
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={chartHeight}
          stroke="#E5E7EB"
        />
        <line
          x1={margin.left}
          y1={chartHeight}
          x2={chartWidth - margin.right}
          y2={chartHeight}
          stroke="#E5E7EB"
        />

        {/* Y-axis label */}
        <text
          x={-chartHeight / 2}
          y="20"
          transform="rotate(-90)"
          textAnchor="middle"
          className="text-sm fill-gray-600"
        >
          Position
        </text>
      </svg>

      <div className="mt-4 text-sm text-gray-600">
        This chart shows the projected ranking positions for each portfolio over time.
        Lower positions are better, with #1 being the top ranking.
      </div>
    </div>
  );
}