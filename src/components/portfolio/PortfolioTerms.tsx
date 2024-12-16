import React, { useState } from 'react';
import { Plus, X, Edit2, Check } from 'lucide-react';

interface PortfolioTermsProps {
  terms: string[];
  onTermsChange: (terms: string[]) => void;
}

export function PortfolioTerms({ terms, onTermsChange }: PortfolioTermsProps) {
  const [newTerm, setNewTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTerm, setEditingTerm] = useState('');

  const handleAddTerm = () => {
    if (!newTerm.trim()) return;
    onTermsChange([...terms, newTerm.trim()]);
    setNewTerm('');
  };

  const handleRemoveTerm = (index: number) => {
    onTermsChange(terms.filter((_, i) => i !== index));
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingTerm(terms[index]);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    
    const updatedTerms = [...terms];
    updatedTerms[editingIndex] = editingTerm.trim();
    onTermsChange(updatedTerms);
    setEditingIndex(null);
    setEditingTerm('');
  };

  return (
    <div className="mt-2">
      <label className="block text-sm text-gray-600 mb-1">Portfolio Terms</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {terms.map((term, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
          >
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingTerm}
                  onChange={(e) => setEditingTerm(e.target.value)}
                  className="w-24 px-1 bg-white border rounded"
                  autoFocus
                />
                <button
                  onClick={saveEdit}
                  className="p-1 text-green-600 hover:text-green-700"
                >
                  <Check size={14} />
                </button>
              </>
            ) : (
              <>
                <span>{term}</span>
                <button
                  onClick={() => startEditing(index)}
                  className="p-1 text-gray-500 hover:text-gray-600"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleRemoveTerm(index)}
                  className="p-1 text-red-500 hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add new term"
          value={newTerm}
          onChange={(e) => setNewTerm(e.target.value)}
          className="flex-1 p-2 border rounded"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTerm()}
        />
        <button
          onClick={handleAddTerm}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Add Term
        </button>
      </div>
    </div>
  );
}