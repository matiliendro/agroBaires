"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import dynamic from 'next/dynamic';

const LocationMap = dynamic(
  () => import('./LocationMap'),
  { ssr: false }
);

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
    image?: string;
    producer?: string;
    phone?: string;
    email?: string;
    description?: string;
  };
  onSubmit: (data: any) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  type: "vendedor" | "comprador" | "admin";
  active: boolean;
  password: string;  // Asegúrate de que esto se guarde al registrar
}

export default function ProductFormModal({ isEdit = false, product, onSubmit }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || '',
    location: product?.location || '',
    coordinates: product?.coordinates || { lat: -12.046374, lng: -77.042793 },
    image: product?.image || '',
    imageFile: null as File | null,
    producer: product?.producer || '',
    phone: product?.phone || '',
    email: product?.email || '',
    description: product?.description || '',
  });

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      coordinates: { lat, lng },
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        image: base64 as string
      }));
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar Producto" : "Publicar Nuevo Producto"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pb-4">
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
                onLocationSelect={(location: [number, number]) => {
                  const [lat, lng] = location;
                  handleLocationSelect(lat, lng);
                }}
                location={formData.coordinates ? [formData.coordinates.lat, formData.coordinates.lng] : undefined}
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
          <div className="space-y-2">
            <Label htmlFor="image">Imagen del Producto</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.image && (
              <div className="mt-2">
                <img 
                  src={formData.image} 
                  alt="Vista previa" 
                  className="max-w-[200px] rounded-md"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="producer">Nombre del Productor</Label>
            <Input
              id="producer"
              placeholder="Nombre del productor"
              value={formData.producer}
              onChange={(e) => setFormData({ ...formData, producer: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono de Contacto</Label>
            <Input
              id="phone"
              placeholder="Ej: +54 11 2345-6789"
              value={formData.phone}
              maxLength={15}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <textarea
              id="description"
              className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input"
              placeholder="Describe tu producto (máximo 500 caracteres)"
              maxLength={500}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <div className="text-sm text-gray-500">
              {formData.description.length}/500 caracteres
            </div>
          </div>
          <Button type="submit" className="w-full">
            {isEdit ? "Guardar Cambios" : "Publicar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}