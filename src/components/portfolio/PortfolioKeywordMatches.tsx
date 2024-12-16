import { useState } from 'react';
import { Portfolio, Keyword } from '../../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PortfolioKeywordMatchesProps {
  portfolio: Portfolio;
  keywords: Keyword[];
}

export function PortfolioKeywordMatches({ portfolio, keywords }: PortfolioKeywordMatchesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
    return null;
  }

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
      >
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        View {matchingKeywords.length} Matched Keywords
      </button>

      {isExpanded && (
        <div className="mt-2 border rounded-md overflow-hidden">
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
      )}
    </div>
  );
}