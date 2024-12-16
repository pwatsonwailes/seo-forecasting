import React from 'react';
import { Plus } from 'lucide-react';

interface SingleKeywordInputProps {
  keywordInput: string;
  volumeInput: string;
  onKeywordChange: (value: string) => void;
  onVolumeChange: (value: string) => void;
  onAdd: () => void;
}

export function SingleKeywordInput({
  keywordInput,
  volumeInput,
  onKeywordChange,
  onVolumeChange,
  onAdd
}: SingleKeywordInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Single Keyword Entry
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Keyword"
          className="flex-1 p-2 border rounded"
          value={keywordInput}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        <input
          type="number"
          placeholder="Volume"
          className="w-32 p-2 border rounded"
          value={volumeInput}
          onChange={(e) => onVolumeChange(e.target.value)}
        />
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Add
        </button>
      </div>
    </div>
  );
}