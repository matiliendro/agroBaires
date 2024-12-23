"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductList from '@/components/ProductList';
import SearchSection from '@/components/SearchSection';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('');

  return (
    <div className="container mx-auto p-4">
      <SearchSection 
        location={location}
        searchTerm={searchTerm}
        category={category}
        onLocationChange={(e) => setLocation(e.target.value)}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onCategoryChange={setCategory}
      />
      <ProductList products={[]} onViewDetails={() => {}} />
    </div>
  );
} 