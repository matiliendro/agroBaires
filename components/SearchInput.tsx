"use client"

import { forwardRef } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
  };

  return (
    <input 
      {...props}
      ref={ref}
      type="text"
      onChange={handleChange}
      className={`w-full px-3 py-2 border rounded-md ${props.className}`}
    />
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;