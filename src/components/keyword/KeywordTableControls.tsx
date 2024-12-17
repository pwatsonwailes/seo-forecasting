import React from 'react';
import { Search } from 'lucide-react';

interface KeywordTableControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  portfolioFilter: string;
  onPortfolioFilterChange: (value: string) => void;
  availablePortfolios: string[];
}

export function KeywordTableControls({
  searchTerm,
  onSearchChange,
  portfolioFilter,
  onPortfolioFilterChange,
  availablePortfolios
}: KeywordTableControlsProps) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search keywords..."
            className="w-full pl-10 pr-4 py-2 border rounded"
          />
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      <div className="w-64">
        <select
          value={portfolioFilter}
          onChange={(e) => onPortfolioFilterChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Keywords</option>
          <option value="unmatched">Unmatched Keywords</option>
          <option value="any">Any Portfolio</option>
          {availablePortfolios.map(portfolio => (
            <option key={portfolio} value={portfolio}>
              {portfolio}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}