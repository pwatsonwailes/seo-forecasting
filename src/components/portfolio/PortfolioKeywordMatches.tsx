import React from 'react';
import { Portfolio, Keyword } from '../../types';

interface PortfolioKeywordMatchesProps {
  portfolio: Portfolio;
  keywords: Keyword[];
}

export function PortfolioKeywordMatches({ portfolio, keywords }: PortfolioKeywordMatchesProps) {
  const matchingKeywords = keywords.filter(keyword =>
    portfolio.terms.some(term =>
      keyword.term.toLowerCase().includes(term.toLowerCase())
    )
  ).map(keyword => ({
    ...keyword,
    matchedTerms: portfolio.terms.filter(term =>
      keyword.term.toLowerCase().includes(term.toLowerCase())
    )
  }));

  if (matchingKeywords.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No keywords match this portfolio's terms.
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left font-medium text-gray-500">Keyword</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">Volume</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">Matched Terms</th>
          </tr>
        </thead>
        <tbody>
          {matchingKeywords.map((keyword, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{keyword.term}</td>
              <td className="px-4 py-2">{keyword.searchVolume.toLocaleString()}</td>
              <td className="px-4 py-2">
                <div className="flex flex-wrap gap-1">
                  {keyword.matchedTerms.map((term, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}