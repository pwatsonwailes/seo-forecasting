import React, { useState } from 'react';
import { Portfolio, Keyword } from '../types';
import { Plus } from 'lucide-react';
import { PortfolioCard } from './portfolio/PortfolioCard';

interface PortfolioInputProps {
  portfolios: Portfolio[];
  onPortfoliosChange: (portfolios: Portfolio[]) => void;
  keywords: Keyword[];
}

export default function PortfolioInput({
  portfolios,
  onPortfoliosChange,
  keywords
}: PortfolioInputProps) {
  const [newHeading, setNewHeading] = useState('');
  const [newTerms, setNewTerms] = useState('');

  const handleAddPortfolio = () => {
    if (!newHeading || !newTerms) return;

    onPortfoliosChange([
      ...portfolios,
      {
        heading: newHeading,
        terms: newTerms.split(',').map(term => term.trim()),
        startPosition: 30,
        endPosition: 30
      }
    ]);

    setNewHeading('');
    setNewTerms('');
  };

  const handleRemovePortfolio = (index: number) => {
    onPortfoliosChange(portfolios.filter((_, i) => i !== index));
  };

  const handleUpdatePortfolio = (index: number, updatedPortfolio: Portfolio) => {
    const newPortfolios = [...portfolios];
    newPortfolios[index] = updatedPortfolio;
    onPortfoliosChange(newPortfolios);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Portfolio Management</h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Portfolio Heading"
          className="flex-1 p-2 border rounded"
          value={newHeading}
          onChange={(e) => setNewHeading(e.target.value)}
        />
        <input
          type="text"
          placeholder="Terms (comma-separated)"
          className="flex-1 p-2 border rounded"
          value={newTerms}
          onChange={(e) => setNewTerms(e.target.value)}
        />
        <button
          onClick={handleAddPortfolio}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          <Plus size={20} />
          Add Portfolio
        </button>
      </div>

      <div className="space-y-4">
        {portfolios.map((portfolio, index) => (
          <PortfolioCard
            key={index}
            portfolio={portfolio}
            keywords={keywords}
            onRemove={() => handleRemovePortfolio(index)}
            onUpdate={(updated) => handleUpdatePortfolio(index, updated)}
          />
        ))}
      </div>
    </div>
  );
}