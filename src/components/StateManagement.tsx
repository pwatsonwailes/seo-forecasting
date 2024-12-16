import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { exportState, parseImportedState } from '../utils/stateManagement';
import { Keyword, Portfolio, SeasonalityFactors } from '../types';

interface StateManagementProps {
  keywords: Keyword[];
  portfolios: Portfolio[];
  seasonality: SeasonalityFactors;
  startMonth: number;
  onStateImport: (
    keywords: Keyword[], 
    portfolios: Portfolio[],
    seasonality: SeasonalityFactors,
    startMonth: number
  ) => void;
}

export default function StateManagement({ 
  keywords, 
  portfolios,
  seasonality,
  startMonth,
  onStateImport 
}: StateManagementProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const state = parseImportedState(content);
      
      if (state) {
        onStateImport(
          state.keywords, 
          state.portfolios,
          state.seasonality,
          state.startMonth
        );
      } else {
        alert('Failed to import state. Please check the file format.');
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => exportState(keywords, portfolios, seasonality, startMonth)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        <Download size={20} />
        Export
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        <Upload size={20} />
        Import
      </button>
    </div>
  );
}