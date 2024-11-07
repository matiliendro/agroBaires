"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LocationMap from './LocationMap';

interface ProductFormModalProps {
  isEdit?: boolean;
  product?: {
    id: string;
    name: string;
    category: string;
    price: number;
    location?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  onSubmit: (data: any) => void;
}

export default function ProductFormModal({ isEdit = false, product, onSubmit }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || '',
    location: product?.location || '',
    coordinates: product?.coordinates || null,
  });

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      coordinates: { lat, lng },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={isEdit ? "outline" : "default"} size={isEdit ? "sm" : "default"}>
          {isEdit ? "Editar" : "Publicar Nuevo Producto"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Producto" : "Publicar Nuevo Producto"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Ubicación de Recogida</Label>
            <Input
              id="location"
              placeholder="Ingresa la dirección"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <div className="mt-2">
              <Label>Selecciona la ubicación en el mapa</Label>
              <LocationMap 
                onLocationSelect={handleLocationSelect}
                initialLocation={formData.coordinates ? [formData.coordinates.lat, formData.coordinates.lng] : undefined}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">¿Qué estás vendiendo?</Label>
            <Input
              id="name"
              placeholder="Nombre del producto"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Frutas">Frutas</SelectItem>
                <SelectItem value="Verduras">Verduras</SelectItem>
                <SelectItem value="Otros">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Precio por unidad</Label>
            <Input
              id="price"
              type="number"
              placeholder="Precio"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">
            {isEdit ? "Guardar Cambios" : "Publicar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}