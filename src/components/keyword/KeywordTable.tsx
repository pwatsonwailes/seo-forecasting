import React from 'react';
import { Trash2 } from 'lucide-react';
import { Keyword } from '../../types';

interface KeywordTableProps {
  keywords: Keyword[];
  onRemove: (index: number) => void;
}

export function KeywordTable({ keywords, onRemove }: KeywordTableProps) {
  if (keywords.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No keywords added yet. Add some keywords above to get started.
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-2 text-left">Keyword</th>
          <th className="px-4 py-2 text-left">Search Volume</th>
          <th className="px-4 py-2 text-left">Portfolio Tags</th>
          <th className="px-4 py-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {keywords.map((keyword, index) => (
          <tr key={index} className="border-t">
            <td className="px-4 py-2">{keyword.term}</td>
            <td className="px-4 py-2">{keyword.searchVolume.toLocaleString()}</td>
            <td className="px-4 py-2">
              {keyword.portfolioTags.join(', ')}
            </td>
            <td className="px-4 py-2 text-right">
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}