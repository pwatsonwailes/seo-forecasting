import React, { useState } from 'react';
import { Modal } from '../modal/Modal';
import { TermPreview } from './TermPreview';
import { Portfolio, Keyword } from '../../types';
import { Plus, X } from 'lucide-react';

interface EditPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: Portfolio;
  onSave: (terms: string[]) => void;
  keywords: Keyword[];
}

export function EditPortfolioModal({
  isOpen,
  onClose,
  portfolio,
  onSave,
  keywords
}: EditPortfolioModalProps) {
  const [terms, setTerms] = useState<string[]>(portfolio.terms);
  const [newTerm, setNewTerm] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleAddTerm = (skipPreview = false) => {
    if (!newTerm.trim()) return;

    if (!skipPreview && !showPreview) {
      setShowPreview(true);
      return;
    }

    setTerms([...terms, newTerm.trim()]);
    setNewTerm('');
    setShowPreview(false);
  };

  const handleRemoveTerm = (index: number) => {
    setTerms(terms.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(terms);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Terms - ${portfolio.heading}`}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Terms
          </label>
          <div className="flex flex-wrap gap-2">
            {terms.map((term, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full"
              >
                <span className="text-sm">{term}</span>
                <button
                  onClick={() => handleRemoveTerm(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add New Term
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTerm}
              onChange={(e) => {
                setNewTerm(e.target.value);
                setShowPreview(false);
              }}
              className="flex-1 p-2 border rounded"
              placeholder="Enter a term"
            />
            <button
              onClick={() => handleAddTerm(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Add Without Preview
            </button>
            <button
              onClick={() => handleAddTerm(false)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Plus size={20} />
              {showPreview ? 'Confirm Add' : 'Preview & Add'}
            </button>
          </div>
        </div>

        {showPreview && (
          <TermPreview term={newTerm} keywords={keywords} />
        )}

        <div className="flex justify-end gap-3 pt-4 mt-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}