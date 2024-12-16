import React from 'react';
import { Upload } from 'lucide-react';

interface BulkKeywordInputProps {
  bulkInput: string;
  onBulkInputChange: (value: string) => void;
  onImport: () => void;
}

export function BulkKeywordInput({
  bulkInput,
  onBulkInputChange,
  onImport
}: BulkKeywordInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Bulk Import (CSV format)
      </label>
      <div className="space-y-2">
        <textarea
          placeholder="keyword,volume&#10;another keyword,volume"
          className="w-full p-2 border rounded h-24"
          value={bulkInput}
          onChange={(e) => onBulkInputChange(e.target.value)}
        />
        <button
          onClick={onImport}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          <Upload size={20} />
          Import Keywords
        </button>
      </div>
    </div>
  );
}