import React, { useMemo } from 'react';
import { TrafficData } from '../types';
import { ChartAxis } from './chart/ChartAxis';
import { MonthLabels } from './chart/MonthLabels';
import { TrafficPath } from './chart/TrafficPath';

interface TrafficChartProps {
  data: TrafficData[];
  errorMargin: number;
  onErrorMarginChange: (value: number) => void;
}

export default function TrafficChart({ 
  data, 
  errorMargin, 
  onErrorMarginChange 
}: TrafficChartProps) {
  const chartHeight = 300;
  const chartWidth = 800;

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
    return (month / 12) * chartWidth;
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

      <svg width={chartWidth} height={chartHeight + 30} className="mt-4">
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
          chartWidth={chartWidth}
          maxTraffic={maxTraffic}
          getY={getY}
        />
        <MonthLabels 
          months={data.map((_, i) => i)}
          chartHeight={chartHeight}
          getX={getX}
        />
      </svg>
    </div>
  );
}