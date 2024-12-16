import React from 'react';
import { Portfolio, Keyword } from '../../types';
import { WordFrequency, analyzeKeywords } from '../../utils/keywordAnalysis';
import { Plus } from 'lucide-react';
import { formatTraffic } from '../../utils/formatters';

interface PortfolioSuggestionsProps {
  portfolio: Portfolio;
  keywords: Keyword[];
  onAddTerm: (term: string) => void;
}

export function PortfolioSuggestions({ 
  portfolio, 
  keywords,
  onAddTerm
}: PortfolioSuggestionsProps) {
  const matchedKeywords = keywords.filter(keyword =>
    portfolio.terms.some(term =>
      keyword.term.toLowerCase().includes(term.toLowerCase())
    )
  );

  const suggestions = analyzeKeywords(matchedKeywords, portfolio.terms);

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No common terms found in matched keywords.
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left font-medium text-gray-500">Term</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">Occurrences</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">Volume</th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">Example Keywords</th>
            <th className="px-4 py-2 text-right font-medium text-gray-500">Action</th>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((suggestion: WordFrequency) => (
            <tr key={suggestion.word} className="border-t">
              <td className="px-4 py-2 font-medium">{suggestion.word}</td>
              <td className="px-4 py-2">{suggestion.count}</td>
              <td className="px-4 py-2">{formatTraffic(suggestion.volume)}</td>
              <td className="px-4 py-2">
                <div className="flex flex-wrap gap-1">
                  {suggestion.examples.map((example, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => onAddTerm(suggestion.word)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-sm text-green-600 hover:text-green-700 transition-colors"
                >
                  <Plus size={16} />
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}