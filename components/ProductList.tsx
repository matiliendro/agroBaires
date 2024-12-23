"use client"

import { useState } from 'react';
import { Product } from '@/types/product';
import ProductDetailModal from './ProductDetailModal';
import Image from 'next/image';
import ProductFormModal from './ProductFormModal';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductListProps {
  products: Product[];
  onViewDetails: (productId: string) => void;
}

export default function ProductList({ products, onViewDetails }: ProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleUpdate = async (productData: any) => {
    // Implementar la lógica de actualización
    console.log('Actualizando producto:', productData);
  };

  const handleDelete = async (productId: string) => {
    // Implementar la lógica de eliminación
    console.log('Eliminando producto:', productId);
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onViewDetails(product.id)}
          >
            <CardContent className="p-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500 mt-2">{product.producer}</p>
              <Button 
                className="w-full mt-4"
                variant="secondary"
              >
                Ver detalles
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}