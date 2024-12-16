import { useState } from 'react';
import { Portfolio, Keyword } from '../types';
import { Plus, Trash2 } from 'lucide-react';
import { PortfolioStats } from './portfolio/PortfolioStats';

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

  const handlePositionChange = (index: number, type: 'start' | 'end', value: string) => {
    const position = Math.max(1, Math.min(100, parseInt(value) || 30));
    const updatedPortfolios = portfolios.map((portfolio, i) => {
      if (i === index) {
        return {
          ...portfolio,
          [type === 'start' ? 'startPosition' : 'endPosition']: position
        };
      }
      return portfolio;
    });
    onPortfoliosChange(updatedPortfolios);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Portfolio Management</h2>
      
      <div className="flex gap-4 mb-6">
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
          Add
        </button>
      </div>

      <div className="space-y-6">
        {portfolios.map((portfolio, index) => (
          <div key={index} className="p-4 border rounded">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{portfolio.heading}</h3>
              <button
                onClick={() => handleRemovePortfolio(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              Terms: {portfolio.terms.join(', ')}
            </div>
            <div className="flex gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600">Start Position</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={portfolio.startPosition}
                  onChange={(e) => handlePositionChange(index, 'start', e.target.value)}
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
                  onChange={(e) => handlePositionChange(index, 'end', e.target.value)}
                  className="p-1 border rounded w-20"
                />
              </div>
            </div>
            <PortfolioStats portfolio={portfolio} keywords={keywords} />
          </div>
        ))}
      </div>
    </div>
  );
}