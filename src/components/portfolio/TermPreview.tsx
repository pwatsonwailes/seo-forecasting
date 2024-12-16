import React from 'react';
import { Keyword } from '../../types';
import { formatTraffic } from '../../utils/formatters';

interface TermPreviewProps {
  term: string;
  keywords: Keyword[];
}

export function TermPreview({ term, keywords }: TermPreviewProps) {
  if (!term.trim()) return null;

  const matchingKeywords = keywords
    .filter(keyword => 
      keyword.term.toLowerCase().includes(term.toLowerCase())
    )
    .slice(0, 20);

  const totalVolume = matchingKeywords.reduce(
    (sum, keyword) => sum + keyword.searchVolume, 
    0
  );

  if (matchingKeywords.length === 0) return (
    <div className="text-sm text-gray-500 mt-2">
      No keywords match this term
    </div>
  );

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">Matching Keywords Preview</h4>
        <span className="text-sm text-gray-500">
          {matchingKeywords.length} matches ({formatTraffic(totalVolume)} total volume)
        </span>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Keyword</th>
              <th className="px-4 py-2 text-right">Volume</th>
            </tr>
          </thead>
          <tbody>
            {matchingKeywords.map((keyword, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{keyword.term}</td>
                <td className="px-4 py-2 text-right">
                  {formatTraffic(keyword.searchVolume)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}