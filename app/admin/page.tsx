"use client"

import { useEffect, useState } from 'react';
import ProductList from '@/components/ProductList';
import { Product } from '@/types/product';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Aquí deberías hacer la llamada a tu API para obtener todos los productos
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administrador</h1>
      <ProductList products={products} onViewDetails={() => {}} />
    </div>
  );
} 