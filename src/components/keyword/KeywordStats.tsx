import React from 'react';
import { Keyword } from '../../types';
import { formatTraffic } from '../../utils/formatters';

interface KeywordStatsProps {
  keywords: Keyword[];
}

export function KeywordStats({ keywords }: KeywordStatsProps) {
  const totalKeywords = keywords.length;
  const totalVolume = keywords.reduce((sum, k) => sum + k.searchVolume, 0);
  const matchedKeywords = keywords.filter(k => k.portfolioTags.length > 0).length;
  const unmatchedKeywords = totalKeywords - matchedKeywords;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <div>
        <div className="text-sm font-medium text-gray-500">Total Keywords</div>
        <div className="text-lg font-semibold text-gray-900">
          {totalKeywords.toLocaleString()}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">Total Search Volume</div>
        <div className="text-lg font-semibold text-gray-900">
          {formatTraffic(totalVolume)}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">Matched Keywords</div>
        <div className="text-lg font-semibold text-gray-900">
          {matchedKeywords.toLocaleString()}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">Unmatched Keywords</div>
        <div className="text-lg font-semibold text-gray-900">
          {unmatchedKeywords.toLocaleString()}
        </div>
      </div>
    </div>
  );
}