import React, { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { Keyword } from '../../types';

interface EditableKeywordRowProps {
  keyword: Keyword;
  index: number;
  onUpdate: (index: number, updatedKeyword: Keyword) => void;
  onRemove: (index: number) => void;
}

export function EditableKeywordRow({
  keyword,
  index,
  onUpdate,
  onRemove
}: EditableKeywordRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTerm, setEditedTerm] = useState(keyword.term);
  const [editedVolume, setEditedVolume] = useState(keyword.searchVolume.toString());

  const handleSave = () => {
    const volume = parseInt(editedVolume);
    if (isNaN(volume)) return;

    onUpdate(index, {
      ...keyword,
      term: editedTerm.trim(),
      searchVolume: volume
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTerm(keyword.term);
    setEditedVolume(keyword.searchVolume.toString());
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <tr className="border-t">
        <td className="px-4 py-2">
          <input
            type="text"
            value={editedTerm}
            onChange={(e) => setEditedTerm(e.target.value)}
            className="w-full p-1 border rounded"
          />
        </td>
        <td className="px-4 py-2">
          <input
            type="number"
            value={editedVolume}
            onChange={(e) => setEditedVolume(e.target.value)}
            className="w-32 p-1 border rounded"
          />
        </td>
        <td className="px-4 py-2">{keyword.portfolioTags.join(', ')}</td>
        <td className="px-4 py-2 text-right">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-600"
              title="Save changes"
            >
              <Check size={20} />
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-600"
              title="Cancel editing"
            >
              <X size={20} />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t">
      <td className="px-4 py-2">{keyword.term}</td>
      <td className="px-4 py-2">{keyword.searchVolume.toLocaleString()}</td>
      <td className="px-4 py-2">{keyword.portfolioTags.join(', ')}</td>
      <td className="px-4 py-2 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-600"
            title="Edit keyword"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-600"
            title="Remove keyword"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
}