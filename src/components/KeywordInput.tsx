import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Keyword } from '../types';
import { SingleKeywordInput } from './keyword/SingleKeywordInput';
import { BulkKeywordInput } from './keyword/BulkKeywordInput';
import { KeywordTable } from './keyword/KeywordTable';

interface KeywordInputProps {
  keywords: Keyword[];
  onKeywordsChange: (keywords: Keyword[]) => void;
}

export default function KeywordInput({ keywords, onKeywordsChange }: KeywordInputProps) {
  const [keywordInput, setKeywordInput] = useState('');
  const [volumeInput, setVolumeInput] = useState('');
  const [bulkInput, setBulkInput] = useState('');

  const handleAddKeyword = () => {
    if (!keywordInput || !volumeInput) return;
    
    const volume = parseInt(volumeInput);
    if (isNaN(volume)) return;

    onKeywordsChange([
      ...keywords,
      {
        term: keywordInput.trim(),
        searchVolume: volume,
        portfolioTags: []
      }
    ]);

    setKeywordInput('');
    setVolumeInput('');
  };

  const handleBulkImport = () => {
    if (!bulkInput.trim()) return;

    const lines = bulkInput.split('\n');
    const newKeywords: Keyword[] = lines
      .filter(line => line.trim())
      .map(line => {
        const [term, volume] = line.split(',');
        return {
          term: term.trim(),
          searchVolume: parseInt(volume?.trim() || '0', 10),
          portfolioTags: []
        };
      })
      .filter(k => !isNaN(k.searchVolume));
    
    onKeywordsChange([...keywords, ...newKeywords]);
    setBulkInput('');
  };

  const handleClearKeywords = () => {
    if (keywords.length > 0 && confirm('Are you sure you want to clear all keywords?')) {
      onKeywordsChange([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Keywords</h2>
        {keywords.length > 0 && (
          <button
            onClick={handleClearKeywords}
            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600 transition-colors"
          >
            <Trash2 size={20} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SingleKeywordInput
          keywordInput={keywordInput}
          volumeInput={volumeInput}
          onKeywordChange={setKeywordInput}
          onVolumeChange={setVolumeInput}
          onAdd={handleAddKeyword}
        />

        <BulkKeywordInput
          bulkInput={bulkInput}
          onBulkInputChange={setBulkInput}
          onImport={handleBulkImport}
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <KeywordTable
          keywords={keywords}
          onRemove={(index) => onKeywordsChange(keywords.filter((_, i) => i !== index))}
        />
      </div>
    </div>
  );
}