import React from 'react';
import { TrafficData } from '../../types';
import { formatTraffic } from '../../utils/formatters';

interface TrafficTableProps {
  data: TrafficData[];
}

export function TrafficTable({ data }: TrafficTableProps) {
  return (
    <div className="mt-6 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left font-medium text-gray-600">Month</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">Period</th>
            <th className="px-4 py-2 text-right font-medium text-gray-600">Expected Traffic</th>
            <th className="px-4 py-2 text-right font-medium text-gray-600">Lower Bound</th>
            <th className="px-4 py-2 text-right font-medium text-gray-600">Upper Bound</th>
          </tr>
        </thead>
        <tbody>
          {data.map((month) => (
            <tr key={month.month} className="border-t">
              <td className="px-4 py-2">Month {month.month}</td>
              <td className="px-4 py-2">{month.actualMonth}</td>
              <td className="px-4 py-2 text-right font-medium">
                {formatTraffic(month.expectedTraffic)}
              </td>
              <td className="px-4 py-2 text-right text-gray-600">
                {formatTraffic(month.lowerBound)}
              </td>
              <td className="px-4 py-2 text-right text-gray-600">
                {formatTraffic(month.upperBound)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}