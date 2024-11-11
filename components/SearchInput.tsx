"use client"

import { Input } from '@/components/ui/input';
import { useRef } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete = "on",
  className = ""
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Input
      ref={inputRef}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={className}
    />
  );
}