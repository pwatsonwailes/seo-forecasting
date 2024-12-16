import React, { useState } from 'react';
import { Portfolio, Keyword } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';
import { EditPortfolioModal } from './EditPortfolioModal';
import { PortfolioStats } from './PortfolioStats';
import { PortfolioKeywordMatches } from './PortfolioKeywordMatches';
import { PortfolioSuggestions } from './PortfolioSuggestions';

interface PortfolioCardProps {
  portfolio: Portfolio;
  keywords: Keyword[];
  onRemove: () => void;
  onUpdate: (portfolio: Portfolio) => void;
}

export function PortfolioCard({
  portfolio,
  keywords,
  onRemove,
  onUpdate
}: PortfolioCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handlePositionChange = (type: 'start' | 'end', value: string) => {
    const position = Math.max(1, Math.min(100, parseInt(value) || 30));
    onUpdate({
      ...portfolio,
      [type === 'start' ? 'startPosition' : 'endPosition']: position
    });
  };

  const handleTermsChange = (newTerms: string[]) => {
    onUpdate({
      ...portfolio,
      terms: newTerms
    });
  };

  return (
    <div className="p-4 border rounded">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{portfolio.heading}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-500 hover:text-gray-600"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={onRemove}
            className="p-1 text-red-500 hover:text-red-600"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {portfolio.terms.map((term, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
          >
            {term}
          </span>
        ))}
      </div>

      <PortfolioStats portfolio={portfolio} keywords={keywords} />

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-600">Start Position</label>
          <input
            type="number"
            min="1"
            max="100"
            value={portfolio.startPosition}
            onChange={(e) => handlePositionChange('start', e.target.value)}
            className="p-1 border rounded w-20"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">End Position</label>
          <input
            type="number"
            min="1"
            max="100"
            value={portfolio.endPosition}
            onChange={(e) => handlePositionChange('end', e.target.value)}
            className="p-1 border rounded w-20"
          />
        </div>
      </div>

      <PortfolioKeywordMatches portfolio={portfolio} keywords={keywords} />
      <PortfolioSuggestions
        portfolio={portfolio}
        keywords={keywords}
        onAddTerm={(term) => handleTermsChange([...portfolio.terms, term])}
      />

      <EditPortfolioModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        portfolio={portfolio}
        onSave={handleTermsChange}
        keywords={keywords}
      />
    </div>
  );
}