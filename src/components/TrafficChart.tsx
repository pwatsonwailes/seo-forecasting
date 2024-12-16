import React, { useMemo, useState } from 'react';
import { TrafficData, Portfolio } from '../types';
import { ChartAxis } from './chart/ChartAxis';
import { MonthLabels } from './chart/MonthLabels';
import { TrafficPath } from './chart/TrafficPath';
import { Tooltip } from './chart/Tooltip';
import { Check } from 'lucide-react';

interface TrafficChartProps {
  data: TrafficData[];
  errorMargin: number;
  onErrorMarginChange: (value: number) => void;
  portfolios: Portfolio[];
  onPortfolioFilterChange: (selectedPortfolios: string[]) => void;
}

export default function TrafficChart({ 
  data, 
  errorMargin, 
  onErrorMarginChange,
  portfolios,
  onPortfolioFilterChange
}: TrafficChartProps) {
  const chartHeight = 300;
  const chartWidth = 800;
  const margin = { left: 60, right: 20, top: 20, bottom: 30 };
  
  const [selectedPortfolios, setSelectedPortfolios] = useState<string[]>([]);
  
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    month: number;
    traffic: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
    month: 0,
    traffic: 0
  });

  const maxTraffic = useMemo(() => {
    if (data.length === 0) return 0;
    const max = Math.max(...data.map(d => d.upperBound));
    return isFinite(max) ? max : 0;
  }, [data]);

  const getY = (value: number): number => {
    if (!isFinite(value) || !isFinite(maxTraffic) || maxTraffic === 0) return chartHeight;
    return chartHeight - ((value / maxTraffic) * chartHeight);
  };

  const getX = (month: number): number => {
    return margin.left + ((month / 12) * (chartWidth - margin.left - margin.right));
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left - margin.left;
    
    const monthWidth = (chartWidth - margin.left - margin.right) / 12;
    const month = Math.min(Math.max(Math.floor(mouseX / monthWidth), 0), 12);
    
    if (month >= 0 && month < data.length) {
      const x = getX(month);
      const y = getY(data[month].expectedTraffic);
      
      setTooltip({
        visible: true,
        x,
        y,
        month,
        traffic: data[month].expectedTraffic
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const handlePortfolioToggle = (heading: string) => {
    const newSelection = selectedPortfolios.includes(heading)
      ? selectedPortfolios.filter(h => h !== heading)
      : [...selectedPortfolios, heading];
    
    setSelectedPortfolios(newSelection);
    onPortfolioFilterChange(newSelection);
  };

  if (data.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center text-gray-500">
        No data available. Please add keywords and portfolios to see the forecast.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Traffic Forecast</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Error Margin:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={errorMargin}
              onChange={(e) => onErrorMarginChange(parseFloat(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-gray-600">
              {(errorMargin * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
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

      <svg 
        width={chartWidth} 
        height={chartHeight + margin.top + margin.bottom} 
        className="mt-4"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <TrafficPath 
            data={data} 
            getX={getX} 
            getY={getY} 
            type="fan" 
          />
          <TrafficPath 
            data={data} 
            getX={getX} 
            getY={getY} 
            type="line" 
          />
          <ChartAxis 
            chartHeight={chartHeight}
            chartWidth={chartWidth - margin.left - margin.right}
            maxTraffic={maxTraffic}
            getY={getY}
          />
          <MonthLabels 
            months={data.map((_, i) => i)}
            chartHeight={chartHeight}
            getX={getX}
          />
          <Tooltip {...tooltip} />
        </g>
      </svg>
    </div>
  );
}