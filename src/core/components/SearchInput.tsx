import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onSearch?: (value: string) => void;
  debounceMs?: number;
  className?: string;
  size?: 'small' | 'middle' | 'large';
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Tìm kiếm...',
  value: controlledValue,
  defaultValue = '',
  onSearch,
  debounceMs = 300,
  className = '',
  size = 'middle',
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue);
  const debouncedValue = useDebounce(internalValue, debounceMs);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  const handleClear = () => {
    setInternalValue('');
    if (onSearch) onSearch('');
  };

  return (
    <Input
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      placeholder={placeholder}
      size={size}
      prefix={<Search className="w-4 h-4 text-neutral-400 mr-1.5" />}
      suffix={
        internalValue ? (
          <button
            onClick={handleClear}
            className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null
      }
      className={`rounded-xl border-[#d5c7b8] hover:border-[#835423] focus:border-[#835423] ${className}`}
    />
  );
};
