import React from 'react';
import { MONTHS } from '../../utils/seasonality';

interface SeasonalityControlsProps {
  seasonality: { [key: string]: number };
  onSeasonalityChange: (month: string, value: number) => void;
  startMonth: number;
  onStartMonthChange: (month: number) => void;
}

export function SeasonalityControls({
  seasonality,
  onSeasonalityChange,
  startMonth,
  onStartMonthChange
}: SeasonalityControlsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Forecast Start Month
        </label>
        <select
          value={startMonth}
          onChange={(e) => onStartMonthChange(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        >
          {MONTHS.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Seasonality Factors
        </label>
        <div className="grid grid-cols-3 gap-4">
          {MONTHS.map((month) => (
            <div key={month} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{month}</span>
                <span>{seasonality[month]}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={seasonality[month]}
                onChange={(e) => onSeasonalityChange(month, parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}