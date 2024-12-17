import React from 'react';
import { Keyword, Portfolio, TrafficData } from '../../types';
import { formatTraffic } from '../../utils/formatters';

interface TrafficStatsProps {
  data: TrafficData[];
  keywords: Keyword[];
  portfolios: Portfolio[];
  selectedPortfolios: string[];
}

export function TrafficStats({ data, keywords, portfolios, selectedPortfolios }: TrafficStatsProps) {
  // Get filtered keywords based on selected portfolios
  const filteredKeywords = selectedPortfolios.length > 0
    ? keywords.filter(k => k.portfolioTags.some(tag => selectedPortfolios.includes(tag)))
    : keywords;

  // Calculate total search volume
  const totalVolume = filteredKeywords.reduce((sum, k) => sum + k.searchVolume, 0);

  // Get start and end traffic from the data
  const startTraffic = data[0]?.expectedTraffic || 0;
  const endTraffic = data[data.length - 1]?.expectedTraffic || 0;
  const trafficIncrease = endTraffic - startTraffic;
  const percentageIncrease = startTraffic > 0 
    ? ((endTraffic - startTraffic) / startTraffic * 100).toFixed(1)
    : '0';

  return (
    <div className="grid grid-cols-4 gap-4 my-6 p-4 bg-gray-50 rounded-lg">
      <div>
        <div className="text-sm font-medium text-gray-500">Market Search Volume</div>
        <div className="text-lg font-semibold text-gray-900">
          {formatTraffic(totalVolume)}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">Starting Traffic</div>
        <div className="text-lg font-semibold text-gray-900">
          {formatTraffic(startTraffic)}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">Ending Traffic</div>
        <div className="text-lg font-semibold text-gray-900">
          {formatTraffic(endTraffic)}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">Traffic Increase</div>
        <div className="text-lg font-semibold text-gray-900">
          {formatTraffic(trafficIncrease)} ({percentageIncrease}%)
        </div>
      </div>
    </div>
  );
}