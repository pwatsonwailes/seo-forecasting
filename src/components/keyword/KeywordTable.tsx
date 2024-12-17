import React, { useState, useMemo } from 'react';
import { Keyword } from '../../types';
import { EditableKeywordRow } from './EditableKeywordRow';
import { KeywordTableControls } from './KeywordTableControls';

interface KeywordTableProps {
  keywords: Keyword[];
  onRemove: (index: number) => void;
  onUpdate: (index: number, updatedKeyword: Keyword) => void;
}

export function KeywordTable({ keywords, onRemove, onUpdate }: KeywordTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [portfolioFilter, setPortfolioFilter] = useState('');

  // Get unique portfolio names
  const availablePortfolios = useMemo(() => {
    const portfolios = new Set<string>();
    keywords.forEach(keyword => {
      keyword.portfolioTags.forEach(tag => portfolios.add(tag));
    });
    return Array.from(portfolios).sort();
  }, [keywords]);

  // Filter keywords based on search term and portfolio filter
  const filteredKeywords = useMemo(() => {
    return keywords.map((keyword, index) => ({ keyword, originalIndex: index }))
      .filter(({ keyword }) => {
        // Apply search filter
        const matchesSearch = keyword.term.toLowerCase()
          .includes(searchTerm.toLowerCase());

        // Apply portfolio filter
        let matchesPortfolio = true;
        if (portfolioFilter === 'unmatched') {
          matchesPortfolio = keyword.portfolioTags.length === 0;
        } else if (portfolioFilter === 'any') {
          matchesPortfolio = keyword.portfolioTags.length > 0;
        } else if (portfolioFilter) {
          matchesPortfolio = keyword.portfolioTags.includes(portfolioFilter);
        }

        return matchesSearch && matchesPortfolio;
      });
  }, [keywords, searchTerm, portfolioFilter]);

  if (keywords.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No keywords added yet. Add some keywords above to get started.
      </div>
    );
  }

  return (
    <div>
      <KeywordTableControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        portfolioFilter={portfolioFilter}
        onPortfolioFilterChange={setPortfolioFilter}
        availablePortfolios={availablePortfolios}
      />

      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left">Keyword</th>
            <th className="px-4 py-2 text-left">Search Volume</th>
            <th className="px-4 py-2 text-left">Portfolio Tags</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredKeywords.map(({ keyword, originalIndex }) => (
            <EditableKeywordRow
              key={originalIndex}
              keyword={keyword}
              index={originalIndex}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>

      {filteredKeywords.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No keywords match your search criteria.
        </div>
      )}
    </div>
  );
}