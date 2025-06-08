
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ModelDropdown = ({ selectedModel, onModelChange, availableModels, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-colors min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{selectedModel || 'Select Model'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && !isLoading && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[200px] z-50">
          {availableModels.map((model) => (
            <button
              key={model}
              onClick={() => {
                onModelChange(model);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                model === selectedModel ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelDropdown;