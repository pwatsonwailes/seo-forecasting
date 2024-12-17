import React, { useState } from 'react';
import { Portfolio, Keyword } from '../../types';
import { Edit2, Trash2, Copy, Check } from 'lucide-react';
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

type ViewMode = 'matches' | 'suggestions' | null;

export function PortfolioCard({
  portfolio,
  keywords,
  onRemove,
  onUpdate
}: PortfolioCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(null);
  const [copied, setCopied] = useState(false);

  const handlePositionChange = (type: 'start' | 'end', value: string) => {
    const position = Math.max(1, Math.min(100, parseFloat(value) || 30));
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

  const toggleView = (mode: ViewMode) => {
    setViewMode(viewMode === mode ? null : mode);
  };

  const handleCopyTerms = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.terms.join('|'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy terms:', err);
    }
  };

  return (
    <div className="p-4 border rounded">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{portfolio.heading}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyTerms}
            className={`p-1 transition-colors ${
              copied ? 'text-green-500' : 'text-gray-500 hover:text-gray-600'
            }`}
            title="Copy terms to clipboard"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
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

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-24">Start Position:</label>
          <input
            type="number"
            min="1"
            max="100"
            step="0.1"
            value={portfolio.startPosition}
            onChange={(e) => handlePositionChange('start', e.target.value)}
            className="p-1 border rounded w-20"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-24">End Position:</label>
          <input
            type="number"
            min="1"
            max="100"
            step="0.1"
            value={portfolio.endPosition}
            onChange={(e) => handlePositionChange('end', e.target.value)}
            className="p-1 border rounded w-20"
          />
        </div>
      </div>

      <PortfolioStats portfolio={portfolio} keywords={keywords} />

      <div className="flex justify-between mt-4 mb-2">
        <button
          onClick={() => toggleView('matches')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'matches'
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          View Matched Keywords
        </button>
        <button
          onClick={() => toggleView('suggestions')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'suggestions'
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          View Common Terms
        </button>
      </div>

      {viewMode === 'matches' && (
        <div className="mt-4">
          <PortfolioKeywordMatches 
            portfolio={portfolio} 
            keywords={keywords} 
          />
        </div>
      )}

      {viewMode === 'suggestions' && (
        <div className="mt-4">
          <PortfolioSuggestions
            portfolio={portfolio}
            keywords={keywords}
            onAddTerm={(term) => handleTermsChange([...portfolio.terms, term])}
          />
        </div>
      )}

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