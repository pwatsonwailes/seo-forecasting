import React, { useState } from 'react';
import { Portfolio } from '../types';
import { interpolatePosition } from '../utils/trafficCalculator';
import { Check, CheckSquare, Square } from 'lucide-react';

interface PositionChartProps {
  portfolios: Portfolio[];
}

export default function PositionChart({ portfolios }: PositionChartProps) {
  const [selectedPortfolios, setSelectedPortfolios] = useState<string[]>([]);
  const chartHeight = 300;
  const chartWidth = 800;
  
  // Calculate required bottom margin based on number of portfolios
  const labelWidth = 120;
  const labelHeight = 20;
  const labelSpacing = 20;
  const labelsPerRow = Math.floor((chartWidth - 80) / (labelWidth + labelSpacing));
  const labelRows = Math.ceil(portfolios.length / labelsPerRow);
  const bottomMargin = 40 + (labelRows * (labelHeight + 10));

  const margin = { 
    left: 60, 
    right: 20, 
    top: 20, 
    bottom: bottomMargin
  };

  const getY = (position: number): number => {
    // Scale position from 1-30 to available chart height, accounting for margins
    const availableHeight = chartHeight - margin.top;
    const scaledY = margin.top + (((position - 1) / 29) * availableHeight);
    // Ensure the value doesn't exceed the chart height
    return Math.min(scaledY, chartHeight);
  };

  const getX = (month: number): number => {
    return margin.left + ((month / 11) * (chartWidth - margin.left - margin.right)); // Changed from 12 to 11
  };

  const months = Array.from({ length: 12 }, (_, i) => i); // Changed from 13 to 12
  const positions = Array.from({ length: 7 }, (_, i) => i * 5 + 1);

  const handlePortfolioToggle = (heading: string) => {
    const newSelection = selectedPortfolios.includes(heading)
      ? selectedPortfolios.filter(h => h !== heading)
      : [...selectedPortfolios, heading];
    setSelectedPortfolios(newSelection);
  };

  const handleToggleAll = () => {
    const newSelection = selectedPortfolios.length === portfolios.length
      ? []
      : portfolios.map(p => p.heading);
    setSelectedPortfolios(newSelection);
  };

  const allSelected = portfolios.length > 0 && selectedPortfolios.length === portfolios.length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Position Tracking</h2>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <button
          onClick={handleToggleAll}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
          Select All
        </button>
        {portfolios.map((portfolio) => (
          <button
            key={portfolio.heading}
            onClick={() => handlePortfolioToggle(portfolio.heading)}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${selectedPortfolios.includes(portfolio.heading)
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center
              ${selectedPortfolios.includes(portfolio.heading)
                ? 'bg-blue-500 text-white'
                : 'bg-transparent'
              }`}
            >
              {selectedPortfolios.includes(portfolio.heading) && (
                <Check size={12} />
              )}
            </span>
            {portfolio.heading}
          </button>
        ))}
      </div>
      
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
            y={chartHeight + 20}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            M{month}
          </text>
        ))}

        {/* Portfolio position lines */}
        {portfolios.map((portfolio, index) => {
          // Skip if not selected and there are selections
          if (selectedPortfolios.length > 0 && !selectedPortfolios.includes(portfolio.heading)) {
            return null;
          }

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

          // Calculate label position in the legend grid
          const row = Math.floor(index / labelsPerRow);
          const col = index % labelsPerRow;
          const labelX = margin.left + col * (labelWidth + labelSpacing);
          const labelY = chartHeight + 40 + (row * (labelHeight + 10));

          return (
            <g key={portfolio.heading}>
              <path
                d={path}
                stroke={color}
                strokeWidth="2"
                fill="none"
              />
              {/* Legend item */}
              <line
                x1={labelX}
                y1={labelY}
                x2={labelX + 20}
                y2={labelY}
                stroke={color}
                strokeWidth="2"
              />
              <text
                x={labelX + 25}
                y={labelY}
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