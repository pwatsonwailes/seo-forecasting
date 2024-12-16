import React from 'react';
import { Portfolio, Keyword } from '../../types';
import { calculateTrafficShare } from '../../utils/trafficCalculator';
import { formatTraffic } from '../../utils/formatters';

interface PortfolioStatsProps {
  portfolio: Portfolio;
  keywords: Keyword[];
}

export function PortfolioStats({ portfolio, keywords }: PortfolioStatsProps) {
  const matchingKeywords = keywords.filter(keyword => 
    keyword.portfolioTags.includes(portfolio.heading)
  );

  const totalVolume = matchingKeywords.reduce((sum, keyword) => 
    sum + keyword.searchVolume, 0
  );

  const startTraffic = matchingKeywords.reduce((sum, keyword) => 
    sum + (keyword.searchVolume * calculateTrafficShare(portfolio.startPosition ?? 30)), 0
  );

  const endTraffic = matchingKeywords.reduce((sum, keyword) => 
    sum + (keyword.searchVolume * calculateTrafficShare(portfolio.endPosition ?? 30)), 0
  );

  // Calculate potential traffic at position 1
  const potentialTraffic = matchingKeywords.reduce((sum, keyword) => 
    sum + (keyword.searchVolume * calculateTrafficShare(1)), 0
  );

  return (
    <div className="grid grid-cols-5 gap-4 mt-2 p-3 bg-gray-50 rounded-md">
      <div>
        <div className="text-sm font-medium text-gray-500">Matched Keywords</div>
        <div className="text-lg font-semibold text-gray-900">
          {matchingKeywords.length}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">Total Search Volume</div>
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
        <div className="text-sm font-medium text-gray-500">Projected Traffic</div>
        <div className="text-lg font-semibold text-gray-900">
          {formatTraffic(endTraffic)}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">Potential Traffic (#1)</div>
        <div className="text-lg font-semibold text-blue-600">
          {formatTraffic(potentialTraffic)}
        </div>
      </div>
    </div>
  );
}